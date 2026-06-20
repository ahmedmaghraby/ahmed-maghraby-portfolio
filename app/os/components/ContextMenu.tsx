'use client';

import { useEffect, useRef } from 'react';
import { AppDefinition } from '../types';

interface Props {
  x: number;
  y: number;
  apps: AppDefinition[];
  onOpen: (app: AppDefinition) => void;
  onClose: () => void;
}

export default function ContextMenu({ x, y, apps, onOpen, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    const handler = (e: MouseEvent | KeyboardEvent) => {
      if ('key' in e) {
        if (e.key === 'Escape') onClose();
        return;
      }
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    window.addEventListener('mousedown', handler);
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('mousedown', handler);
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  // Keep menu inside viewport
  const menuW = 210;
  const menuH = 56 + apps.length * 36 + 44;
  const ax = Math.min(x, (typeof window !== 'undefined' ? window.innerWidth : 1200) - menuW - 8);
  const ay = Math.min(y, (typeof window !== 'undefined' ? window.innerHeight - 54 : 800) - menuH - 8);

  return (
    <div
      ref={ref}
      className="fixed rounded-xl overflow-hidden font-mono select-none"
      style={{
        top: ay,
        left: ax,
        width: menuW,
        zIndex: 99980,
        background: 'rgba(8,12,28,0.97)',
        border: '1px solid rgba(245,211,147,0.18)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(245,211,147,0.06)',
        backdropFilter: 'blur(28px)',
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-2 flex items-center gap-2"
        style={{ borderBottom: '1px solid rgba(245,211,147,0.08)', fontSize: 9, color: 'rgba(74,243,255,0.45)', letterSpacing: '0.25em' }}
      >
        <img src="/logo.png" width={18} alt="" style={{ objectFit: 'contain', opacity: 0.7 }} />
        MAGHRABY.OS
      </div>

      {/* Open app items */}
      <div className="py-1">
        {apps.map(app => (
          <MenuRow
            key={app.id}
            icon={app.icon}
            label={`Open ${app.title}`}
            onClick={() => { onOpen(app); onClose(); }}
          />
        ))}
      </div>

      {/* Divider + system items */}
      <div style={{ height: 1, background: 'rgba(245,211,147,0.07)', margin: '0 10px' }} />
      <div className="py-1">
        <MenuRow icon="ℹ" label="About MAGHRABY.OS" dim onClick={onClose} />
      </div>
    </div>
  );
}

function MenuRow({
  icon, label, dim, onClick,
}: {
  icon: string; label: string; dim?: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2 transition-colors duration-100 text-left"
      style={{
        fontSize: 12,
        color: dim ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.78)',
        background: 'transparent',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(245,211,147,0.07)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
    >
      <span style={{ fontSize: 14, width: 18, textAlign: 'center' }}>{icon}</span>
      {label}
    </button>
  );
}
