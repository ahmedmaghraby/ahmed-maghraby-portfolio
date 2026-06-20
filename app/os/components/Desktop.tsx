'use client';

import { AnimatePresence } from 'framer-motion';
import { useWindowManager } from '../context/WindowManagerContext';
import { APPS } from '../apps';
import Window from './Window';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import AboutApp from '../apps/AboutApp';
import ResumeApp from '../apps/ResumeApp';
import ProjectsApp from '../apps/ProjectsApp';
import TerminalApp from '../apps/TerminalApp';
import BrowserApp from '../apps/BrowserApp';
import SnakeApp from '../apps/SnakeApp';
import App2048 from '../apps/App2048';

function renderApp(appId: string) {
  switch (appId) {
    case 'about':    return <AboutApp />;
    case 'resume':   return <ResumeApp />;
    case 'projects': return <ProjectsApp />;
    case 'terminal': return <TerminalApp />;
    case 'browser':  return <BrowserApp />;
    case 'snake':    return <SnakeApp />;
    case '2048':     return <App2048 />;
    default:         return null;
  }
}

export default function Desktop() {
  const { windows, openApp } = useWindowManager();

  return (
    <div
      className="w-screen h-screen overflow-hidden relative select-none"
      style={{ background: '#06090f' }}
    >
      {/* Ambient grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse at 18% 18%, rgba(74,243,255,0.055) 0%, transparent 50%)',
            'radial-gradient(ellipse at 82% 76%, rgba(245,211,147,0.055) 0%, transparent 50%)',
            'linear-gradient(rgba(74,243,255,0.02) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(74,243,255,0.02) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '100% 100%, 100% 100%, 50px 50px, 50px 50px',
        }}
      />

      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
        {APPS.map(app => (
          <DesktopIcon
            key={app.id}
            icon={app.icon}
            label={app.title}
            description={app.description}
            onOpen={() => openApp(app)}
          />
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.map(win => (
          <Window key={win.id} win={win}>
            {renderApp(win.appId)}
          </Window>
        ))}
      </AnimatePresence>

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
}
