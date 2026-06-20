'use client';

import { useState } from 'react';
import { WindowManagerProvider } from './context/WindowManagerContext';
import Desktop from './components/Desktop';
import BootScreen from './components/BootScreen';

export default function OS() {
  const [booted, setBooted] = useState(false);

  return (
    <WindowManagerProvider>
      <Desktop />
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
    </WindowManagerProvider>
  );
}
