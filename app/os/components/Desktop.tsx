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
import LeaderboardApp from '../apps/LeaderboardApp';
import DesktopBackground from './DesktopBackground';

function renderApp(appId: string) {
  switch (appId) {
    case 'about':       return <AboutApp />;
    case 'resume':      return <ResumeApp />;
    case 'projects':    return <ProjectsApp />;
    case 'terminal':    return <TerminalApp />;
    case 'browser':     return <BrowserApp />;
    case 'snake':       return <SnakeApp />;
    case '2048':        return <App2048 />;
    case 'leaderboard': return <LeaderboardApp />;
    default:            return null;
  }
}

export default function Desktop() {
  const { windows, openApp } = useWindowManager();

  return (
    <div
      className="w-screen h-screen overflow-hidden relative select-none"
      style={{ background: '#06090f' }}
    >
      {/* Interactive canvas background */}
      <DesktopBackground />

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
