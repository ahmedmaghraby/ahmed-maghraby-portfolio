'use client';

import { useCallback, useEffect, useReducer } from 'react';

type Grid = (number | 0)[][];

function emptyGrid(): Grid {
  return Array.from({ length: 4 }, () => [0, 0, 0, 0]);
}

function addRandom(grid: Grid): Grid {
  const empty: [number, number][] = [];
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      if (!grid[r][c]) empty.push([r, c]);
  if (!empty.length) return grid;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  const next = grid.map(row => [...row]) as Grid;
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function slideRow(row: number[]): { row: number[]; gained: number } {
  const filtered = row.filter(Boolean);
  let gained = 0;
  const merged: number[] = [];
  let i = 0;
  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const val = filtered[i] * 2;
      merged.push(val);
      gained += val;
      i += 2;
    } else {
      merged.push(filtered[i]);
      i++;
    }
  }
  while (merged.length < 4) merged.push(0);
  return { row: merged, gained };
}

function moveLeft(grid: Grid): { grid: Grid; gained: number } {
  let gained = 0;
  const next = grid.map(row => {
    const r = slideRow(row);
    gained += r.gained;
    return r.row;
  }) as Grid;
  return { grid: next, gained };
}

function rotateRight(grid: Grid): Grid {
  return grid[0].map((_, c) => grid.map(row => row[c]).reverse()) as Grid;
}

function rotateLeft(grid: Grid): Grid {
  return grid[0].map((_, c) => grid.map(row => row[row.length - 1 - c])) as Grid;
}

function move(grid: Grid, dir: 'left' | 'right' | 'up' | 'down'): { grid: Grid; gained: number } {
  if (dir === 'left') return moveLeft(grid);
  if (dir === 'right') {
    const { grid: g, gained } = moveLeft(grid.map(r => [...r].reverse()) as Grid);
    return { grid: g.map(r => [...r].reverse()) as Grid, gained };
  }
  if (dir === 'up') {
    const { grid: g, gained } = moveLeft(rotateLeft(grid));
    return { grid: rotateRight(g), gained };
  }
  // down
  const { grid: g, gained } = moveLeft(rotateRight(grid));
  return { grid: rotateLeft(g), gained };
}

function gridsEqual(a: Grid, b: Grid) {
  return a.every((row, r) => row.every((v, c) => v === b[r][c]));
}

function isOver(grid: Grid) {
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) {
      if (!grid[r][c]) return false;
      if (c < 3 && grid[r][c] === grid[r][c + 1]) return false;
      if (r < 3 && grid[r][c] === grid[r + 1][c]) return false;
    }
  return true;
}

function initState() {
  return { grid: addRandom(addRandom(emptyGrid())), score: 0, best: 0, won: false, over: false };
}

type State = { grid: Grid; score: number; best: number; won: boolean; over: boolean };
type Action = { type: 'MOVE'; dir: 'left' | 'right' | 'up' | 'down' } | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  if (action.type === 'RESET') return initState();
  const { grid, gained } = move(state.grid, action.dir);
  if (gridsEqual(grid, state.grid)) return state;
  const next = addRandom(grid);
  const score = state.score + gained;
  const best = Math.max(state.best, score);
  const won = !state.won && next.some(r => r.some(v => v === 2048));
  const over = isOver(next);
  return { grid: next, score, best, won, over };
}

const TILE_COLORS: Record<number, { bg: string; text: string }> = {
  0:    { bg: 'rgba(255,255,255,0.04)', text: 'transparent' },
  2:    { bg: 'rgba(245,211,147,0.12)', text: '#f5d393' },
  4:    { bg: 'rgba(245,211,147,0.2)',  text: '#f5d393' },
  8:    { bg: 'rgba(230,142,46,0.3)',   text: '#e68e2e' },
  16:   { bg: 'rgba(230,142,46,0.4)',   text: '#e68e2e' },
  32:   { bg: 'rgba(74,243,255,0.2)',   text: '#4af3ff' },
  64:   { bg: 'rgba(74,243,255,0.3)',   text: '#4af3ff' },
  128:  { bg: 'rgba(74,243,255,0.4)',   text: '#4af3ff' },
  256:  { bg: 'rgba(100,200,255,0.4)',  text: '#fff' },
  512:  { bg: 'rgba(120,180,255,0.5)',  text: '#fff' },
  1024: { bg: 'rgba(150,150,255,0.5)',  text: '#fff' },
  2048: { bg: '#f5d393',               text: '#06090f' },
};

function tileStyle(val: number) {
  const s = TILE_COLORS[val] ?? TILE_COLORS[2048];
  return { background: s.bg, color: s.text };
}

function fontSize(val: number) {
  if (val >= 1024) return 14;
  if (val >= 128) return 16;
  return 20;
}

export default function App2048() {
  const [state, dispatch] = useReducer(reducer, undefined, initState);

  const handleKey = useCallback((e: KeyboardEvent) => {
    const map: Record<string, 'left' | 'right' | 'up' | 'down'> = {
      ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down',
      a: 'left', d: 'right', w: 'up', s: 'down',
    };
    const dir = map[e.key];
    if (dir) {
      e.preventDefault();
      dispatch({ type: 'MOVE', dir });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div
      className="h-full flex flex-col items-center justify-center gap-4 p-4"
      style={{ background: '#06090f' }}
    >
      {/* Scores */}
      <div className="flex items-center justify-between w-full max-w-[284px]">
        <div className="font-mono text-xs" style={{ color: 'rgba(245,211,147,0.4)', letterSpacing: '0.2em' }}>
          2048
        </div>
        <div className="flex gap-3">
          {[{ label: 'SCORE', val: state.score }, { label: 'BEST', val: state.best }].map(s => (
            <div
              key={s.label}
              className="text-center px-3 py-1.5 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.04)', minWidth: 60 }}
            >
              <div className="font-mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>
                {s.label}
              </div>
              <div className="font-mono font-bold" style={{ fontSize: 15, color: '#f5d393' }}>
                {s.val}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="font-mono px-3 py-1.5 rounded-lg transition-opacity hover:opacity-70"
          style={{
            fontSize: 11,
            color: 'rgba(245,211,147,0.6)',
            background: 'rgba(245,211,147,0.08)',
            border: '1px solid rgba(245,211,147,0.15)',
          }}
        >
          New
        </button>
      </div>

      {/* Grid */}
      <div
        className="relative"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,64px)',
          gridTemplateRows: 'repeat(4,64px)',
          gap: 8,
          padding: 10,
          borderRadius: 12,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(245,211,147,0.1)',
        }}
      >
        {state.grid.map((row, r) =>
          row.map((val, c) => (
            <div
              key={`${r}-${c}`}
              className="flex items-center justify-center rounded-lg font-mono font-bold transition-all duration-100"
              style={{ ...tileStyle(val), fontSize: fontSize(val) }}
            >
              {val || ''}
            </div>
          ))
        )}

        {/* Game over overlay */}
        {(state.over || state.won) && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-xl"
            style={{ background: 'rgba(6,9,15,0.85)' }}
          >
            <div
              className="font-mono mb-1"
              style={{
                fontSize: 13,
                letterSpacing: '0.3em',
                color: state.won ? '#f5d393' : 'rgba(255,95,87,0.8)',
              }}
            >
              {state.won ? 'YOU WON!' : 'GAME OVER'}
            </div>
            <div className="font-mono mb-4" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
              Score: {state.score}
            </div>
            <button
              onClick={() => dispatch({ type: 'RESET' })}
              className="font-mono px-5 py-2 rounded-lg"
              style={{
                fontSize: 12,
                color: '#f5d393',
                background: 'rgba(245,211,147,0.1)',
                border: '1px solid rgba(245,211,147,0.25)',
              }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <div className="font-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>
        Use ↑ ↓ ← → or WASD to move tiles
      </div>
    </div>
  );
}
