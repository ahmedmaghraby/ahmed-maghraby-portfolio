'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { APPS } from '../apps';
import { AppDefinition } from '../types';
import { WindowManagerProvider } from '../context/WindowManagerContext';
import { ToastProvider } from '../context/ToastContext';

import AboutApp       from '../apps/AboutApp';
import ResumeApp      from '../apps/ResumeApp';
import ProjectsApp    from '../apps/ProjectsApp';
import BrowserApp     from '../apps/BrowserApp';
import SnakeApp       from '../apps/SnakeApp';
import App2048        from '../apps/App2048';
import LeaderboardApp from '../apps/LeaderboardApp';
import CalculatorApp  from '../apps/CalculatorApp';
import NotesApp       from '../apps/NotesApp';
import EmailApp       from '../apps/EmailApp';

const DOCK_IDS    = ['email', 'browser', 'about', 'projects'];
const EXCLUDE_IDS = ['terminal'];

function renderApp(appId: string) {
  switch (appId) {
    case 'about':       return <AboutApp />;
    case 'resume':      return <ResumeApp />;
    case 'projects':    return <ProjectsApp />;
    case 'terminal':    return null;
    case 'browser':     return <BrowserApp />;
    case 'snake':       return <SnakeApp />;
    case '2048':        return <App2048 />;
    case 'leaderboard': return <LeaderboardApp />;
    case 'calculator':  return <CalculatorApp />;
    case 'notes':       return <NotesApp />;
    case 'email':       return <EmailApp />;
    default:            return null;
  }
}

// ── App Icon ─────────────────────────────────────────────────────────────────

function AppIcon({ app, onOpen, size = 'md' }: { app: AppDefinition; onOpen: () => void; size?: 'sm' | 'md' }) {
  const isSmall = size === 'sm';
  return (
    <button
      onClick={onOpen}
      className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform duration-100"
      style={{ WebkitTapHighlightColor: 'transparent' } as React.CSSProperties}
    >
      <div
        className="flex items-center justify-center rounded-2xl"
        style={{
          width: isSmall ? 52 : 62,
          height: isSmall ? 52 : 62,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          fontSize: isSmall ? 26 : 30,
          backdropFilter: 'blur(8px)',
        }}
      >
        {app.icon}
      </div>
      <span
        className="font-mono text-center leading-tight"
        style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', maxWidth: isSmall ? 52 : 62, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
      >
        {app.title}
      </span>
    </button>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

function MobileOSInner() {
  const [openApp, setOpenApp] = useState<AppDefinition | null>(null);
  const [time, setTime]       = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const visibleApps = APPS.filter(a => !EXCLUDE_IDS.includes(a.id));
  const dockApps    = visibleApps.filter(a => DOCK_IDS.includes(a.id));
  const gridApps    = visibleApps.filter(a => !DOCK_IDS.includes(a.id));

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden font-mono select-none"
      style={{ background: '#020b18', color: 'white' }}
    >
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: [
          'radial-gradient(ellipse 140% 50% at 15% 20%, rgba(74,243,255,0.07) 0%, transparent 55%)',
          'radial-gradient(ellipse 120% 60% at 85% 75%, rgba(245,211,147,0.05) 0%, transparent 55%)',
          'radial-gradient(ellipse 100% 80% at 50% 110%, rgba(74,243,255,0.04) 0%, transparent 60%)',
        ].join(','),
      }} />

      {/* Status bar */}
      <div
        className="relative z-10 flex items-center justify-between px-5 shrink-0"
        style={{ height: 44 }}
      >
        <span style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(245,211,147,0.5)' }}>
          MAGHRABY.OS
        </span>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{time}</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '-1px' }}>▊▊▊</span>
        </div>
      </div>

      {/* Scrollable home screen */}
      <div
        className="flex-1 overflow-y-auto relative z-10"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {/* Greeting */}
        <div className="px-5 pt-5 pb-5">
          <div style={{ fontSize: 22, fontWeight: 700, color: '#f5d393', letterSpacing: '-0.02em' }}>
            Ahmed Maghraby
          </div>
          <div style={{ fontSize: 12, color: 'rgba(74,243,255,0.7)', marginTop: 3 }}>
            Associate Principal Engineer
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {['7+ yrs exp', '20+ products', '📍 Riyadh'].map(s => (
              <span
                key={s}
                style={{
                  fontSize: 10, color: 'rgba(255,255,255,0.35)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20, padding: '3px 10px',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* App grid label */}
        <div className="px-5 pb-3" style={{ fontSize: 10, letterSpacing: '0.25em', color: 'rgba(245,211,147,0.35)' }}>
          APPS
        </div>

        {/* App grid — 4 columns */}
        <div className="grid grid-cols-4 gap-x-1 gap-y-6 px-3 pb-8">
          {gridApps.map(app => (
            <div key={app.id} className="flex justify-center">
              <AppIcon app={app} onOpen={() => setOpenApp(app)} />
            </div>
          ))}
        </div>
      </div>

      {/* Dock */}
      <div className="relative z-10 px-4 pb-8 shrink-0">
        <div
          className="flex items-end justify-around rounded-3xl px-2 py-3"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(24px)',
          }}
        >
          {dockApps.map(app => (
            <AppIcon key={app.id} app={app} onOpen={() => setOpenApp(app)} size="sm" />
          ))}
        </div>
      </div>

      {/* Full-screen app overlay — slides up */}
      <AnimatePresence>
        {openApp && (
          <motion.div
            key={openApp.id}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320, mass: 0.8 }}
            className="absolute inset-0 z-50 flex flex-col"
            style={{ background: '#06090f' }}
          >
            {/* App header */}
            <div
              className="flex items-center px-4 shrink-0 relative"
              style={{
                height: 56,
                borderBottom: '1px solid rgba(245,211,147,0.08)',
                background: 'rgba(4,8,20,0.85)',
                backdropFilter: 'blur(16px)',
              }}
            >
              {/* Drag pill */}
              <div
                className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full"
                style={{ width: 36, height: 4, background: 'rgba(255,255,255,0.18)' }}
              />

              <button
                onClick={() => setOpenApp(null)}
                className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono"
                style={{
                  fontSize: 11, color: 'rgba(74,243,255,0.8)',
                  background: 'rgba(74,243,255,0.08)',
                  border: '1px solid rgba(74,243,255,0.18)',
                  marginTop: 8,
                }}
              >
                ← Home
              </button>

              <div className="flex-1 flex items-center justify-center gap-2" style={{ marginTop: 8 }}>
                <span style={{ fontSize: 18 }}>{openApp.icon}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em' }}>
                  {openApp.title.toUpperCase()}
                </span>
              </div>

              <div style={{ width: 80 }} />
            </div>

            {/* App content — stop propagation so game swipes don't trigger drag-to-close */}
            <div
              className="flex-1 overflow-hidden"
              style={{ touchAction: 'auto' }}
              onPointerDown={e => e.stopPropagation()}
            >
              {renderApp(openApp.id)}
            </div>

            {/* Home indicator */}
            <div
              className="flex justify-center py-2 shrink-0"
              style={{ background: 'rgba(4,8,20,0.5)' }}
            >
              <div
                className="rounded-full"
                style={{ width: 120, height: 4, background: 'rgba(255,255,255,0.18)' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MobileView() {
  return (
    <ToastProvider>
      <WindowManagerProvider>
        <MobileOSInner />
      </WindowManagerProvider>
    </ToastProvider>
  );
}
