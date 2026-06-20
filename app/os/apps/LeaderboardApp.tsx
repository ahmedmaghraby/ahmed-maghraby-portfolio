'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  GameType,
  GlobalScore,
  ScoreEntry,
  getGlobalTop,
  getMyScores,
  getUserName,
  getUserCountry,
  setUserName,
  fetchAndCacheCountry,
} from '../lib/leaderboard';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const GAMES: { id: GameType; label: string; icon: string; color: string }[] = [
  { id: 'snake', label: 'Snake', icon: '🐍', color: '#f5d393' },
  { id: '2048',  label: '2048',  icon: '🎮', color: '#4af3ff' },
  { id: 'racer', label: 'Racer', icon: '🏎', color: '#a78bfa' },
];

type Tab = 'global' | 'mine';

function fmt(iso: string) {
  try { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); }
  catch { return '—'; }
}

// Convert 2-letter ISO country code to flag emoji
function flag(code: string): string {
  if (!code || code.length !== 2) return '🌐';
  const base = 0x1F1E6 - 65;
  return Array.from(code.toUpperCase())
    .map(c => String.fromCodePoint(c.charCodeAt(0) + base))
    .join('');
}

function Medal({ rank }: { rank: number }) {
  const medals = ['🥇', '🥈', '🥉'];
  if (rank < 3) return <span style={{ fontSize: 14 }}>{medals[rank]}</span>;
  return (
    <span className="font-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', width: 18, display: 'inline-block', textAlign: 'center' }}>
      {rank + 1}
    </span>
  );
}

// ─── Name gate ────────────────────────────────────────────────────────────────

function NameGate({ onSave }: { onSave: (n: string) => void }) {
  const [val, setVal]         = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!val.trim()) return;
    setLoading(true);
    await onSave(val.trim());
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-5 px-8" style={{ background: '#06090f' }}>
      <div style={{ fontSize: 36 }}>🏆</div>
      <div className="font-mono font-bold" style={{ fontSize: 18, color: '#f5d393' }}>Join the Competition</div>
      <p className="font-mono text-center" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
        Enter your name to appear on the<br />global leaderboard. Play games to submit scores.
      </p>
      <input
        autoFocus
        maxLength={24}
        placeholder="Your name..."
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && submit()}
        className="font-mono px-4 py-2 rounded-lg outline-none w-full max-w-xs"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(245,211,147,0.25)',
          color: '#f5d393',
          fontSize: 14,
          caretColor: '#f5d393',
        }}
      />
      <button
        disabled={!val.trim() || loading}
        onClick={submit}
        className="font-mono px-8 py-2 rounded-lg"
        style={{
          fontSize: 13,
          color: val.trim() ? '#06090f' : 'rgba(255,255,255,0.2)',
          background: val.trim() ? '#f5d393' : 'rgba(255,255,255,0.06)',
          border: 'none',
          cursor: val.trim() ? 'pointer' : 'default',
          transition: 'all 0.15s',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Detecting location…' : 'Enter Leaderboard →'}
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function LeaderboardApp() {
  const [name, setName]           = useState<string | null>(null);
  const [country, setCountry]     = useState<string>('');
  const [tab, setTab]             = useState<Tab>('global');
  const [activeGame, setActiveGame] = useState<GameType>('snake');
  const [globalScores, setGlobalScores] = useState<GlobalScore[]>([]);
  const [myScores, setMyScores]   = useState<ScoreEntry[]>([]);
  const [loading, setLoading]     = useState(false);
  const [nameEdit, setNameEdit]   = useState(false);

  useEffect(() => {
    setName(getUserName());
    setCountry(getUserCountry());
  }, []);

  const loadGlobal = useCallback(async (game: GameType) => {
    setLoading(true);
    try {
      const scores = await getGlobalTop(game, 10);
      setGlobalScores(scores);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMine = useCallback((game: GameType) => {
    setMyScores(getMyScores(game));
  }, []);

  useEffect(() => {
    if (!name) return;
    if (tab === 'global') loadGlobal(activeGame);
    else loadMine(activeGame);
  }, [name, tab, activeGame, loadGlobal, loadMine]);

  // Called from NameGate — sets name AND fetches country
  const handleSetName = async (n: string) => {
    setUserName(n);
    setName(n);
    setNameEdit(false);
    const code = await fetchAndCacheCountry();
    setCountry(code);
  };

  if (!name || nameEdit) {
    return <NameGate onSave={handleSetName} />;
  }

  return (
    <div className="h-full flex flex-col" style={{ background: '#06090f', color: '#e2e8f0' }}>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 shrink-0" style={{ borderBottom: '1px solid rgba(245,211,147,0.1)' }}>
        <div>
          <div className="font-mono font-bold" style={{ fontSize: 15, color: '#f5d393' }}>🏆 Leaderboard</div>
          <div className="font-mono mt-0.5 flex items-center gap-1.5" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>
            Playing as{' '}
            {country && <span style={{ fontSize: 13 }}>{flag(country)}</span>}
            <span style={{ color: '#4af3ff' }}>{name}</span>
          </div>
        </div>
        <button
          onClick={() => setNameEdit(true)}
          className="font-mono px-3 py-1 rounded-lg"
          style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          Change name
        </button>
      </div>

      {/* Game selector */}
      <div className="flex gap-1 px-4 pt-3 pb-2 shrink-0">
        {GAMES.map(g => (
          <button
            key={g.id}
            onClick={() => setActiveGame(g.id)}
            className="font-mono px-3 py-1.5 rounded-lg flex-1 transition-all duration-150"
            style={{
              fontSize: 12,
              color: activeGame === g.id ? g.color : 'rgba(255,255,255,0.35)',
              background: activeGame === g.id ? `${g.color}14` : 'transparent',
              border: `1px solid ${activeGame === g.id ? `${g.color}30` : 'rgba(255,255,255,0.07)'}`,
            }}
          >
            {g.icon} {g.label}
          </button>
        ))}
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 px-4 pb-3 shrink-0">
        {(['global', 'mine'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="font-mono px-4 py-1 rounded-md text-xs transition-all duration-150"
            style={{
              color: tab === t ? '#f5d393' : 'rgba(255,255,255,0.3)',
              background: tab === t ? 'rgba(245,211,147,0.08)' : 'transparent',
              border: `1px solid ${tab === t ? 'rgba(245,211,147,0.2)' : 'transparent'}`,
            }}
          >
            {t === 'global' ? '🌐 Global Top 10' : '👤 My History'}
          </button>
        ))}
      </div>

      {/* Score list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4" style={{ scrollbarWidth: 'none' }}>
        {loading ? (
          <div className="h-full flex items-center justify-center font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
            Loading...
          </div>
        ) : tab === 'global' ? (
          <GlobalList scores={globalScores} game={activeGame} myName={name} />
        ) : (
          <MyList scores={myScores} game={activeGame} />
        )}
      </div>

      <div className="px-5 py-2 shrink-0 font-mono text-center" style={{ fontSize: 9, color: 'rgba(255,255,255,0.15)', borderTop: '1px solid rgba(245,211,147,0.06)' }}>
        Global scores powered by Firebase · Personal history stored locally
      </div>
    </div>
  );
}

// ─── Global leaderboard list ──────────────────────────────────────────────────

function GlobalList({ scores, game, myName }: { scores: GlobalScore[]; game: GameType; myName: string }) {
  const g = GAMES.find(x => x.id === game)!;
  if (!scores.length) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-2">
        <div style={{ fontSize: 32, opacity: 0.15 }}>🏆</div>
        <p className="font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
          No scores yet — be the first!
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-1.5">
      {scores.map((entry, idx) => {
        const isMe = entry.name.toLowerCase() === myName.toLowerCase();
        return (
          <div
            key={idx}
            className="flex items-center gap-2 rounded-lg px-3 py-2"
            style={{
              background: isMe ? `${g.color}0d` : idx === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${isMe ? `${g.color}25` : idx === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)'}`,
            }}
          >
            <Medal rank={idx} />

            {/* Flag */}
            {entry.country && (
              <span style={{ fontSize: 14, lineHeight: 1 }} title={entry.country}>
                {flag(entry.country)}
              </span>
            )}

            <span className="font-mono flex-1 truncate" style={{ fontSize: 12, color: isMe ? g.color : 'rgba(255,255,255,0.8)' }}>
              {entry.name}
              {isMe && <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginLeft: 5 }}>(you)</span>}
            </span>

            <span className="font-mono font-bold tabular-nums" style={{ fontSize: 13, color: idx === 0 ? g.color : 'rgba(255,255,255,0.65)' }}>
              {entry.score.toLocaleString()}
            </span>
            <span className="font-mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>
              {fmt(entry.date)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── My history list ──────────────────────────────────────────────────────────

function MyList({ scores, game }: { scores: ScoreEntry[]; game: GameType }) {
  const g = GAMES.find(x => x.id === game)!;
  if (!scores.length) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-2">
        <div style={{ fontSize: 32, opacity: 0.15 }}>{g.icon}</div>
        <p className="font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
          No games played yet.
        </p>
      </div>
    );
  }
  return (
    <div>
      <div className="font-mono mb-3" style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em' }}>
        LAST {scores.length} GAMES
      </div>
      <div className="space-y-1.5">
        {scores.map((entry, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 rounded-lg px-3 py-2"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
          >
            <span className="font-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', width: 16 }}>
              {idx + 1}
            </span>
            <span className="font-mono font-bold flex-1 tabular-nums" style={{ fontSize: 13, color: idx === 0 ? g.color : 'rgba(255,255,255,0.7)' }}>
              {entry.score.toLocaleString()}
            </span>
            <span className="font-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
              {fmt(entry.date)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
