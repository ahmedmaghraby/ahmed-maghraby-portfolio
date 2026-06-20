'use client';

import { useCallback, useRef, useState } from 'react';

interface DesktopIconProps {
  icon: string;
  label: string;
  description: string;
  initialX: number;
  initialY: number;
  onOpen: () => void;
  onPositionChange: (x: number, y: number) => void;
}

export default function DesktopIcon({
  icon, label, description,
  initialX, initialY,
  onOpen, onPositionChange,
}: DesktopIconProps) {
  const [pos, setPos]           = useState({ x: initialX, y: initialY });
  const posRef                  = useRef({ x: initialX, y: initialY });
  const [dragging, setDragging] = useState(false);
  const [active, setActive]     = useState(false);
  const didDragRef              = useRef(false);
  const clickCount              = useRef(0);
  const clickTimer              = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setActive(true);
      const startX = e.clientX, startY = e.clientY;
      const startPosX = posRef.current.x, startPosY = posRef.current.y;
      didDragRef.current = false;

      const onMove = (ev: MouseEvent) => {
        const dx = ev.clientX - startX, dy = ev.clientY - startY;
        if (!didDragRef.current && Math.hypot(dx, dy) < 5) return;
        didDragRef.current = true;
        setDragging(true);

        const next = {
          x: Math.max(4, Math.min(window.innerWidth  - 84,  startPosX + ev.clientX - startX)),
          y: Math.max(4, Math.min(window.innerHeight - 110, startPosY + ev.clientY - startY)),
        };
        posRef.current = next;
        setPos(next);
      };

      const onUp = () => {
        setDragging(false);
        if (didDragRef.current) onPositionChange(posRef.current.x, posRef.current.y);
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [onPositionChange]
  );

  const handleClick = useCallback(() => {
    if (didDragRef.current) return;
    clickCount.current += 1;
    if (clickCount.current === 1) {
      clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 320);
    } else {
      if (clickTimer.current) clearTimeout(clickTimer.current);
      clickCount.current = 0;
      onOpen();
      setActive(false);
    }
  }, [onOpen]);

  return (
    <div
      className="absolute flex flex-col items-center gap-1.5 px-2 pt-2 pb-2 rounded-xl"
      style={{
        top: pos.y,
        left: pos.x,
        width: 76,
        cursor: dragging ? 'grabbing' : 'default',
        background: active ? 'rgba(245,211,147,0.1)' : 'transparent',
        boxShadow: active ? '0 0 0 1px rgba(245,211,147,0.18)' : 'none',
        transition: dragging ? 'none' : 'background 0.12s, box-shadow 0.12s',
        zIndex: dragging ? 9000 : 10,
        userSelect: 'none',
      }}
      title={`Double-click to open — ${description}`}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <span
        className="text-3xl leading-none"
        style={{
          filter: active ? 'drop-shadow(0 0 8px rgba(245,211,147,0.5))' : undefined,
          transform: dragging ? 'scale(1.15)' : 'scale(1)',
          transition: dragging ? 'none' : 'transform 0.15s, filter 0.15s',
          display: 'block',
        }}
      >
        {icon}
      </span>
      <span
        className="text-center leading-tight font-mono block"
        style={{
          color: active ? '#f5d393' : 'rgba(255,255,255,0.58)',
          fontSize: 10,
          textShadow: '0 1px 4px rgba(0,0,0,0.9)',
          transition: 'color 0.12s',
        }}
      >
        {label}
      </span>
    </div>
  );
}
