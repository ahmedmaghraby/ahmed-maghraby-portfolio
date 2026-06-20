'use client';

import { useCallback, useEffect, useState } from 'react';
import { clearAllScores, getScores, ScoreEntry } from '../lib/leaderboard';

interface GameBoard {
  id: 'snake' | '2048';
  label: string;
  icon: string;
  color: string;
  unit: string;
}

const BOARDS: GameBoard[] = [
  { id: 'snake', label: 'Snake', icon: '🐍', color: '#f5d393', unit: 'pts' },
  { id: '2048',  label: '2048',  icon: '🎮', color: '#4af3ff', unit: '' },
];

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return '—';
  }
}

function Medal({ rank }: { rank: number }) {
  const medals = ['🥇', '🥈', '🥉'];
  if (rank < 3) return <span style={{ fontSize: 14 }}>{medals[rank]}</span>;
  return (
    <span
      className="font-mono tabular-nums"
      style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', width: 18, display: 'inline-block', textAlign: 'center' }}
    >
      {rank + 1}
    </span>
  );
}

export default function LeaderboardApp() {
  const [scores, setScores] = useState<Record<string, ScoreEntry[]>>({ snake: [], '2048': [] });
  const [cleared, setCleared] = useState(false);

  const load = useCallback(() => {
    setScores({
      snake: getScores('snake'),
      '2048': getScores('2048'),
    });
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleClear = () => {
    clearAllScores();
    load();
    setCleared(true);
    setTimeout(() => setCleared(false), 2000);
  };

  const totalGames = scores.snake.length + scores['2048'].length;

  return (
    <div
      className="h-full flex flex-col"
      style={{ background: '#06090f', color: '#e2e8f0' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 shrink-0"
        style={{ borderBottom: '1px solid rgba(245,211,147,0.1)' }}
      >
        <div>
          <h1 className="font-mono font-bold" style={{ fontSize: 16, color: '#f5d393' }}>
            🏆 Leaderboard
          </h1>
          <p className="font-mono mt-0.5" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>
            {totalGames} GAMES RECORDED
          </p>
        </div>
        <button
          onClick={handleClear}
          className="font-mono px-3 py-1.5 rounded-lg transition-all duration-150"
          style={{
            fontSize: 11,
            color: cleared ? 'rgba(74,243,255,0.8)' : 'rgba(255,95,87,0.6)',
            background: cleared ? 'rgba(74,243,255,0.08)' : 'rgba(255,95,87,0.06)',
            border: `1px solid ${cleared ? 'rgba(74,243,255,0.15)' : 'rgba(255,95,87,0.12)'}`,
          }}
        >
          {cleared ? '✓ Cleared' : 'Clear All'}
        </button>
      </div>

      {/* Score boards */}
      <div className="flex-1 overflow-y-auto p-4" style={{ scrollbarWidth: 'none' }}>
        {totalGames === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center gap-3">
            <div style={{ fontSize: 40, opacity: 0.2 }}>🏆</div>
            <p className="font-mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
              No scores yet.
            </p>
            <p className="font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
              Play Snake or 2048 to record your first score!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {BOARDS.map(board => {
              const list = scores[board.id];
              return (
                <div key={board.id}>
                  {/* Board header */}
                  <div
                    className="flex items-center gap-2 mb-3 pb-2"
                    style={{ borderBottom: `1px solid ${board.color}22` }}
                  >
                    <span style={{ fontSize: 16 }}>{board.icon}</span>
                    <span
                      className="font-mono font-bold"
                      style={{ fontSize: 13, color: board.color }}
                    >
                      {board.label}
                    </span>
                    <span
                      className="font-mono ml-auto"
                      style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}
                    >
                      {list.length} / 10
                    </span>
                  </div>

                  {/* Score rows */}
                  {list.length === 0 ? (
                    <div
                      className="font-mono text-center py-6"
                      style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}
                    >
                      No scores yet
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {list.map((entry, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 rounded-lg px-3 py-2"
                          style={{
                            background: idx === 0
                              ? `${board.color}0d`
                              : 'rgba(255,255,255,0.02)',
                            border: `1px solid ${idx === 0 ? `${board.color}20` : 'rgba(255,255,255,0.05)'}`,
                          }}
                        >
                          <Medal rank={idx} />
                          <span
                            className="font-mono font-bold flex-1 tabular-nums"
                            style={{
                              fontSize: 13,
                              color: idx === 0 ? board.color : 'rgba(255,255,255,0.7)',
                            }}
                          >
                            {entry.score.toLocaleString()}
                            {board.unit && (
                              <span
                                className="font-normal ml-1"
                                style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}
                              >
                                {board.unit}
                              </span>
                            )}
                          </span>
                          <span
                            className="font-mono"
                            style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}
                          >
                            {formatDate(entry.date)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div
        className="px-5 py-2 shrink-0 font-mono text-center"
        style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', borderTop: '1px solid rgba(245,211,147,0.06)' }}
      >
        Scores saved locally · Top 10 per game
      </div>
    </div>
  );
}
