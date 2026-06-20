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
  uid: string;
  name: string;
  game: GameType;
  score: number;
  date: string;
  country: string;
}

// ─── Local user identity ──────────────────────────────────────────────────────

const NAME_KEY    = 'ahmed-os-player-name';
const COUNTRY_KEY = 'ahmed-os-player-country';
const UID_KEY     = 'ahmed-os-player-uid';

// Stable device-level UUID — generated once, never changes
export function getUserId(): string {
  if (typeof window === 'undefined') return '';
  let uid = localStorage.getItem(UID_KEY);
  if (!uid) {
    uid = crypto.randomUUID();
    localStorage.setItem(UID_KEY, uid);
  }
  return uid;
}

export function getUserName(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(NAME_KEY);
}

export function setUserName(name: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(NAME_KEY, name.trim().slice(0, 24));
}

export function getUserCountry(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(COUNTRY_KEY) ?? '';
}

export function setUserCountry(code: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(COUNTRY_KEY, code.slice(0, 2).toUpperCase());
}

// Fetches the 2-letter country code from the visitor's IP, caches it locally.
// Falls back silently — never blocks score submission.
export async function fetchAndCacheCountry(): Promise<string> {
  const cached = getUserCountry();
  if (cached) return cached;
  try {
    const ctrl  = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 3000);
    const res   = await fetch('https://ipapi.co/country_code/', { signal: ctrl.signal });
    clearTimeout(timer);
    const code = (await res.text()).trim();
    if (/^[A-Z]{2}$/.test(code)) {
      setUserCountry(code);
      return code;
    }
  } catch {}
  return '';
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

const db   = getFirestore(firebase_app);
const COLL = 'os_leaderboard';

export async function submitScore(game: GameType, score: number): Promise<void> {
  if (score <= 0) return;

  appendMyScore(game, score);

  const uid     = getUserId();
  const name    = getUserName() || 'Anonymous';
  const country = getUserCountry() || await fetchAndCacheCountry();

  try {
    await addDoc(collection(db, COLL), {
      uid,
      name,
      game,
      score,
      country,
      date: serverTimestamp(),
    });
    console.log(`[leaderboard] ✓ ${name} (${country || '??'}) — ${game} — ${score}`);
  } catch (err: unknown) {
    console.error('[leaderboard] Firestore write failed:', err);
    console.warn(
      '[leaderboard] If "permission-denied", add to Firestore rules:\n' +
      '  match /os_leaderboard/{doc} {\n' +
      '    allow read: if true;\n' +
      '    allow create: if request.resource.data.score is number\n' +
      '                  && request.resource.data.game in [\'snake\', \'2048\', \'racer\']\n' +
      '                  && request.resource.data.name is string;\n' +
      '  }'
    );
  }
}

export async function getGlobalTop(game: GameType, n = 10): Promise<GlobalScore[]> {
  try {
    // No composite index needed: fetch top scores globally, filter by game client-side.
    // where('game') + orderBy('score') would require a Firestore composite index.
    const q = query(
      collection(db, COLL),
      orderBy('score', 'desc'),
      limit(200),
    );
    const snap = await getDocs(q);
    const all: GlobalScore[] = [];
    snap.forEach(doc => {
      const d = doc.data();
      if (d.game !== game) return;
      all.push({
        uid:     d.uid     ?? '',
        name:    d.name    ?? 'Anonymous',
        game:    d.game,
        score:   d.score   ?? 0,
        country: d.country ?? '',
        date:    d.date instanceof Timestamp
          ? d.date.toDate().toISOString()
          : new Date().toISOString(),
      });
    });
    return all.slice(0, n);
  } catch (err) {
    console.error('[leaderboard] Firestore read failed:', err);
    return [];
  }
}

// ─── Compat shim ──────────────────────────────────────────────────────────────

export function saveScore(game: GameType, score: number): void {
  submitScore(game, score);
}
