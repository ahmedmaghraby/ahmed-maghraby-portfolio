'use client';

import { useEffect, useState } from 'react';
import { useWindowManager } from '../context/WindowManagerContext';
import { APPS } from '../apps';

export default function Taskbar() {
  const { windows, openApp, focusWindow, minimizeWindow } = useWindowManager();
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex items-center px-3 select-none z-[9999]"
      style={{
        height: 54,
        background: 'rgba(6,9,20,0.92)',
        borderTop: '1px solid rgba(245,211,147,0.1)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Logo */}
      <div className="shrink-0 mr-2" style={{ opacity: 0.75 }}>
        <img src="/logo.png" width={50} alt="AHMED.OS" style={{ objectFit: 'contain' }} />
      </div>

      {/* Separator */}
      <div
        className="shrink-0 mr-2"
        style={{ width: 1, height: 26, background: 'rgba(245,211,147,0.1)' }}
      />

      {/* App icons */}
      <div className="flex items-center gap-0.5">
        {APPS.map(app => {
          const win = windows.find(w => w.appId === app.id);
          const isOpen = !!win;
          const isActive = isOpen && !win.isMinimized;

          return (
            <button
              key={app.id}
              title={app.title}
              onClick={() => {
                if (isOpen) {
                  if (win.isMinimized) focusWindow(win.id);
                  else minimizeWindow(win.id);
                } else {
                  openApp(app);
                }
              }}
              className="relative flex items-center justify-center rounded-lg transition-colors duration-150"
              style={{
                width: 42,
                height: 42,
                background: isActive ? 'rgba(245,211,147,0.12)' : 'transparent',
              }}
              onMouseEnter={e => {
                if (!isActive)
                  (e.currentTarget as HTMLElement).style.background = 'rgba(245,211,147,0.07)';
              }}
              onMouseLeave={e => {
                if (!isActive)
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <span className="text-lg leading-none">{app.icon}</span>
              {isOpen && (
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full"
                  style={{
                    width: isActive ? 4 : 3,
                    height: isActive ? 4 : 3,
                    background: isActive ? '#f5d393' : 'rgba(245,211,147,0.4)',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Center label */}
      <div
        className="absolute left-1/2 -translate-x-1/2 font-mono tracking-[0.4em] pointer-events-none"
        style={{ fontSize: 10, color: 'rgba(245,211,147,0.18)' }}
      >
        AHMED.OS
      </div>

      {/* Clock */}
      <div className="ml-auto text-right">
        <div className="font-mono tabular-nums" style={{ fontSize: 12, color: 'rgba(245,211,147,0.7)' }}>
          {time}
        </div>
        <div className="font-mono" style={{ fontSize: 10, color: 'rgba(245,211,147,0.3)' }}>
          {date}
        </div>
      </div>
    </div>
  );
}
