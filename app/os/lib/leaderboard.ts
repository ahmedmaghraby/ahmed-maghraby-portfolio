export interface ScoreEntry {
  score: number;
  date: string;
}

const KEY = (game: string) => `ahmed-os-scores-${game}`;

export function saveScore(game: 'snake' | '2048', score: number): void {
  if (typeof window === 'undefined' || score <= 0) return;
  try {
    const existing = getScores(game);
    existing.push({ score, date: new Date().toISOString() });
    existing.sort((a, b) => b.score - a.score);
    localStorage.setItem(KEY(game), JSON.stringify(existing.slice(0, 10)));
  } catch {}
}

export function getScores(game: 'snake' | '2048'): ScoreEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY(game)) ?? '[]');
  } catch {
    return [];
  }
}

export function clearAllScores(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(KEY('snake'));
    localStorage.removeItem(KEY('2048'));
  } catch {}
}
