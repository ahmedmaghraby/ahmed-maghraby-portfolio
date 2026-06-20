'use client';

import { useEffect, useState } from 'react';
import { WindowManagerProvider } from './context/WindowManagerContext';
import { ToastProvider } from './context/ToastContext';
import Desktop from './components/Desktop';
import BootScreen from './components/BootScreen';
import MobileView from './components/MobileView';

export default function OS() {
  const [booted, setBooted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) return <MobileView />;

  return (
    <ToastProvider>
      <WindowManagerProvider>
        <Desktop />
        {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      </WindowManagerProvider>
    </ToastProvider>
  );
}
