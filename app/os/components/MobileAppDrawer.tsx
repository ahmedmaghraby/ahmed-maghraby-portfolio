'use client';

import { useEffect } from 'react';
import { APPS } from '../apps';
import { AppDefinition } from '../types';
import { useWindowManager } from '../context/WindowManagerContext';

interface Props {
  onOpen: (app: AppDefinition) => void;
  onClose: () => void;
}

export default function MobileAppDrawer({ onOpen, onClose }: Props) {
  const { windows } = useWindowManager();

  // Close on back navigation / escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9998] flex flex-col"
      style={{ background: 'rgba(2,11,24,0.96)', backdropFilter: 'blur(24px)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 shrink-0"
        style={{ borderBottom: '1px solid rgba(245,211,147,0.08)' }}
      >
        <span
          className="font-mono tracking-widest"
          style={{ fontSize: 10, color: 'rgba(245,211,147,0.4)', letterSpacing: '0.35em' }}
        >
          MAGHRABY.OS
        </span>
        <button
          onClick={onClose}
          className="font-mono flex items-center justify-center rounded-lg"
          style={{
            width: 32, height: 32, fontSize: 18,
            color: 'rgba(245,211,147,0.5)',
            background: 'rgba(245,211,147,0.06)',
            border: '1px solid rgba(245,211,147,0.12)',
          }}
        >
          ×
        </button>
      </div>

      {/* App grid — vertical scroll */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="grid grid-cols-3 gap-4">
          {APPS.map(app => {
            const win = windows.find(w => w.appId === app.id);
            const isOpen = !!win && !win.isMinimized;

            return (
              <button
                key={app.id}
                onClick={() => { onOpen(app); onClose(); }}
                className="flex flex-col items-center gap-2 rounded-2xl py-4 px-2 transition-all duration-150"
                style={{
                  background: isOpen
                    ? 'rgba(245,211,147,0.1)'
                    : 'rgba(255,255,255,0.03)',
                  border: isOpen
                    ? '1px solid rgba(245,211,147,0.22)'
                    : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span style={{ fontSize: 30 }}>{app.icon}</span>
                <span
                  className="font-mono text-center leading-tight"
                  style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em' }}
                >
                  {app.title}
                </span>
                {isOpen && (
                  <span
                    className="rounded-full"
                    style={{ width: 4, height: 4, background: '#f5d393' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom hint */}
      <div
        className="font-mono text-center py-4 shrink-0"
        style={{ fontSize: 9, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.2em' }}
      >
        TAP AN APP TO OPEN
      </div>
    </div>
  );
}
