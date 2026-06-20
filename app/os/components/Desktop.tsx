'use client';

import { AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useWindowManager } from '../context/WindowManagerContext';
import { useToast } from '../context/ToastContext';
import { APPS } from '../apps';
import { AppDefinition } from '../types';
import Window from './Window';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import ContextMenu from './ContextMenu';
import AboutApp from '../apps/AboutApp';
import ResumeApp from '../apps/ResumeApp';
import ProjectsApp from '../apps/ProjectsApp';
import TerminalApp from '../apps/TerminalApp';
import BrowserApp from '../apps/BrowserApp';
import SnakeApp from '../apps/SnakeApp';
import App2048 from '../apps/App2048';
import LeaderboardApp from '../apps/LeaderboardApp';
import RacerApp from '../apps/RacerApp';
import DesktopBackground from './DesktopBackground';

function renderApp(appId: string, openApp: (app: AppDefinition) => void) {
  switch (appId) {
    case 'about':       return <AboutApp />;
    case 'resume':      return <ResumeApp />;
    case 'projects':    return <ProjectsApp />;
    case 'terminal':    return <TerminalApp onOpenApp={id => { const a = APPS.find(x => x.id === id); if (a) openApp(a); }} />;
    case 'browser':     return <BrowserApp />;
    case 'snake':       return <SnakeApp />;
    case '2048':        return <App2048 />;
    case 'leaderboard': return <LeaderboardApp />;
    case 'racer':       return <RacerApp />;
    default:            return null;
  }
}

// Default grid layout: two columns, top-left
function defaultIconPositions(): Record<string, { x: number; y: number }> {
  const pos: Record<string, { x: number; y: number }> = {};
  APPS.forEach((app, i) => {
    const col = Math.floor(i / 6);
    const row = i % 6;
    pos[app.id] = { x: 12 + col * 90, y: 12 + row * 90 };
  });
  return pos;
}

function loadIconPositions(): Record<string, { x: number; y: number }> {
  if (typeof window === 'undefined') return defaultIconPositions();
  try {
    const saved = localStorage.getItem('ahmed-os-icon-positions');
    if (saved) return { ...defaultIconPositions(), ...JSON.parse(saved) };
  } catch {}
  return defaultIconPositions();
}

export default function Desktop() {
  const { windows, openApp } = useWindowManager();
  const { toast } = useToast();

  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>(
    loadIconPositions
  );

  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number } | null>(null);

  const handleOpenApp = useCallback(
    (app: AppDefinition) => {
      const alreadyOpen = windows.find(w => w.appId === app.id);
      openApp(app);
      if (!alreadyOpen) {
        toast({ icon: app.icon, message: `Opening ${app.title}`, sub: 'Double-click icon or use right-click menu' });
      }
    },
    [windows, openApp, toast]
  );

  const handleIconPositionChange = useCallback(
    (id: string, x: number, y: number) => {
      setIconPositions(prev => {
        const next = { ...prev, [id]: { x, y } };
        try { localStorage.setItem('ahmed-os-icon-positions', JSON.stringify(next)); } catch {}
        return next;
      });
    },
    []
  );

  const handleDesktopContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const handleDesktopClick = useCallback(() => {
    setCtxMenu(null);
  }, []);

  return (
    <div
      className="w-screen h-screen overflow-hidden relative select-none"
      style={{ background: '#06090f' }}
      onContextMenu={handleDesktopContextMenu}
      onClick={handleDesktopClick}
    >
      {/* Interactive canvas background */}
      <DesktopBackground />

      {/* Desktop Icons — absolutely positioned, draggable */}
      {APPS.map(app => {
        const p = iconPositions[app.id] ?? { x: 12, y: 12 };
        return (
          <DesktopIcon
            key={app.id}
            icon={app.icon}
            label={app.title}
            description={app.description}
            initialX={p.x}
            initialY={p.y}
            onOpen={() => handleOpenApp(app)}
            onPositionChange={(x, y) => handleIconPositionChange(app.id, x, y)}
          />
        );
      })}

      {/* Windows */}
      <AnimatePresence>
        {windows.map(win => (
          <Window key={win.id} win={win}>
            {renderApp(win.appId, openApp)}
          </Window>
        ))}
      </AnimatePresence>

      {/* Right-click context menu */}
      {ctxMenu && (
        <ContextMenu
          x={ctxMenu.x}
          y={ctxMenu.y}
          apps={APPS}
          onOpen={handleOpenApp}
          onClose={() => setCtxMenu(null)}
        />
      )}

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
}
