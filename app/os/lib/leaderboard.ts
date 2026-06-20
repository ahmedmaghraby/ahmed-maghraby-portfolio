import firebase_app from '../../../config';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

export type GameType = 'snake' | '2048' | 'racer';

export interface ScoreEntry {
  score: number;
  date: string;
}

export interface GlobalScore {
  name: string;
  game: GameType;
  score: number;
  date: string;
}

// ─── Local user identity ──────────────────────────────────────────────────────

const NAME_KEY = 'ahmed-os-player-name';

export function getUserName(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(NAME_KEY);
}

export function setUserName(name: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(NAME_KEY, name.trim().slice(0, 24));
}

// ─── Local history (per user device) ─────────────────────────────────────────

const LOCAL_KEY = (game: string) => `ahmed-os-myscores-${game}`;

export function getMyScores(game: GameType): ScoreEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY(game)) ?? '[]');
  } catch {
    return [];
  }
}

function appendMyScore(game: GameType, score: number): void {
  if (typeof window === 'undefined' || score <= 0) return;
  try {
    const existing = getMyScores(game);
    existing.unshift({ score, date: new Date().toISOString() });
    localStorage.setItem(LOCAL_KEY(game), JSON.stringify(existing.slice(0, 10)));
  } catch {}
}

// ─── Firestore global leaderboard ────────────────────────────────────────────

const db = getFirestore(firebase_app);
const COLL = 'os_leaderboard';

export async function submitScore(game: GameType, score: number): Promise<void> {
  if (score <= 0) return;
  appendMyScore(game, score);

  const name = getUserName() || 'Anonymous';
  try {
    await addDoc(collection(db, COLL), {
      name,
      game,
      score,
      date: serverTimestamp(),
    });
  } catch {
    // Firestore unavailable — local history still saved
  }
}

export async function getGlobalTop(game: GameType, n = 10): Promise<GlobalScore[]> {
  try {
    const q = query(
      collection(db, COLL),
      orderBy('score', 'desc'),
      limit(n * 5), // over-fetch to filter by game client-side
    );
    const snap = await getDocs(q);
    const all: GlobalScore[] = [];
    snap.forEach(doc => {
      const d = doc.data();
      if (d.game === game) {
        all.push({
          name: d.name ?? 'Anonymous',
          game: d.game,
          score: d.score ?? 0,
          date: d.date instanceof Timestamp
            ? d.date.toDate().toISOString()
            : new Date().toISOString(),
        });
      }
    });
    return all.slice(0, n);
  } catch {
    return [];
  }
}

// ─── Legacy local save (still used by SnakeApp + App2048 until refactor) ─────
// Kept for backward compat — routes through submitScore

export function saveScore(game: GameType, score: number): void {
  submitScore(game, score); // fire-and-forget
}
