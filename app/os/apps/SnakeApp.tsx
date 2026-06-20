'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { saveScore } from '../lib/leaderboard';

const COLS = 18;
const ROWS = 18;
const CELL = 18;
const INTERVAL = 120;

type Dir = 'U' | 'D' | 'L' | 'R';
type Point = { x: number; y: number };

function randFood(snake: Point[]): Point {
  let p: Point;
  do {
    p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some(s => s.x === p.x && s.y === p.y));
  return p;
}

const INIT_SNAKE: Point[] = [
  { x: 9, y: 9 },
  { x: 8, y: 9 },
  { x: 7, y: 9 },
];

export default function SnakeApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    snake: INIT_SNAKE.map(p => ({ ...p })),
    dir: 'R' as Dir,
    nextDir: 'R' as Dir,
    food: { x: 13, y: 9 } as Point,
    score: 0,
    dead: false,
  });
  const [score, setScore] = useState(0);
  const [dead, setDead] = useState(false);
  const [started, setStarted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const s = stateRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid dots
    ctx.fillStyle = 'rgba(74,243,255,0.06)';
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        ctx.beginPath();
        ctx.arc(x * CELL + CELL / 2, y * CELL + CELL / 2, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Snake
    s.snake.forEach((seg, idx) => {
      const alpha = idx === 0 ? 1 : 1 - (idx / s.snake.length) * 0.5;
      ctx.fillStyle = idx === 0 ? '#f5d393' : `rgba(245,211,147,${alpha})`;
      const pad = idx === 0 ? 1 : 2;
      ctx.beginPath();
      ctx.roundRect(
        seg.x * CELL + pad,
        seg.y * CELL + pad,
        CELL - pad * 2,
        CELL - pad * 2,
        idx === 0 ? 4 : 3
      );
      ctx.fill();
    });

    // Food
    ctx.fillStyle = 'rgba(74,243,255,0.9)';
    ctx.shadowColor = 'rgba(74,243,255,0.6)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(
      s.food.x * CELL + CELL / 2,
      s.food.y * CELL + CELL / 2,
      CELL / 2 - 3,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;
  }, []);

  const step = useCallback(() => {
    const s = stateRef.current;
    if (s.dead) return;
    s.dir = s.nextDir;

    const head = { ...s.snake[0] };
    if (s.dir === 'U') head.y -= 1;
    if (s.dir === 'D') head.y += 1;
    if (s.dir === 'L') head.x -= 1;
    if (s.dir === 'R') head.x += 1;

    if (
      head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
      s.snake.some(seg => seg.x === head.x && seg.y === head.y)
    ) {
      s.dead = true;
      setDead(true);
      saveScore('snake', s.score);
      if (timerRef.current) clearInterval(timerRef.current);
      draw();
      return;
    }

    s.snake.unshift(head);
    if (head.x === s.food.x && head.y === s.food.y) {
      s.score += 1;
      setScore(s.score);
      s.food = randFood(s.snake);
    } else {
      s.snake.pop();
    }

    draw();
  }, [draw]);

  const start = useCallback(() => {
    const s = stateRef.current;
    s.snake = INIT_SNAKE.map(p => ({ ...p }));
    s.dir = 'R';
    s.nextDir = 'R';
    s.food = randFood(s.snake);
    s.score = 0;
    s.dead = false;
    setScore(0);
    setDead(false);
    setStarted(true);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(step, INTERVAL);
    draw();
  }, [step, draw]);

  useEffect(() => {
    draw();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [draw]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!started || dead) return;
      const s = stateRef.current;
      const map: Record<string, Dir> = {
        ArrowUp: 'U', ArrowDown: 'D', ArrowLeft: 'L', ArrowRight: 'R',
        w: 'U', s: 'D', a: 'L', d: 'R',
      };
      const dir = map[e.key];
      if (!dir) return;
      const opposites: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' };
      if (opposites[dir] !== s.dir) {
        e.preventDefault();
        s.nextDir = dir;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [started, dead]);

  // Touch / swipe support
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current || !started || dead) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    touchRef.current = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
    const s = stateRef.current;
    const opposites: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' };
    const dir: Dir = Math.abs(dx) > Math.abs(dy)
      ? (dx > 0 ? 'R' : 'L')
      : (dy > 0 ? 'D' : 'U');
    if (opposites[dir] !== s.dir) s.nextDir = dir;
  };

  const W = COLS * CELL;
  const H = ROWS * CELL;

  return (
    <div
      className="h-full flex flex-col items-center justify-center gap-4"
      style={{ background: '#06090f' }}
    >
      {/* Score */}
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="font-mono" style={{ fontSize: 10, color: 'rgba(245,211,147,0.4)', letterSpacing: '0.3em' }}>
            SCORE
          </div>
          <div className="font-mono font-bold" style={{ fontSize: 22, color: '#f5d393' }}>
            {score}
          </div>
        </div>
        <div className="text-center">
          <div className="font-mono" style={{ fontSize: 10, color: 'rgba(74,243,255,0.4)', letterSpacing: '0.3em' }}>
            CONTROLS
          </div>
          <div className="font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
            ↑ ↓ ← → · WASD · swipe
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div
        className="relative"
        style={{
          border: '1px solid rgba(245,211,147,0.15)',
          borderRadius: 8,
          overflow: 'hidden',
          background: '#040608',
          touchAction: 'none',
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <canvas ref={canvasRef} width={W} height={H} />

        {/* Overlays */}
        {!started && !dead && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: 'rgba(6,9,15,0.88)' }}
          >
            <div className="font-mono text-4xl mb-3">🐍</div>
            <div className="font-mono mb-4" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
              Use arrow keys or WASD
            </div>
            <button
              onClick={start}
              className="font-mono px-6 py-2 rounded-lg"
              style={{
                fontSize: 13,
                color: '#f5d393',
                background: 'rgba(245,211,147,0.1)',
                border: '1px solid rgba(245,211,147,0.25)',
              }}
            >
              Start Game
            </button>
          </div>
        )}

        {dead && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: 'rgba(6,9,15,0.88)' }}
          >
            <div className="font-mono mb-1" style={{ fontSize: 11, color: 'rgba(255,95,87,0.8)', letterSpacing: '0.3em' }}>
              GAME OVER
            </div>
            <div className="font-mono font-bold mb-4" style={{ fontSize: 28, color: '#f5d393' }}>
              {score} pts
            </div>
            <button
              onClick={start}
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
    </div>
  );
}
