'use client';

import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Position, WindowState } from '../types';
import { useWindowManager } from '../context/WindowManagerContext';

interface WindowProps {
  win: WindowState;
  children: React.ReactNode;
}

export default function Window({ win, children }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, moveWindow } = useWindowManager();
  const [pos, setPos] = useState<Position>(win.position);
  const posRef = useRef<Position>(win.position);

  const handleTitleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest('[data-no-drag]')) return;
      if (win.isMaximized) return;

      focusWindow(win.id);
      const startX = e.clientX;
      const startY = e.clientY;
      const startPosX = posRef.current.x;
      const startPosY = posRef.current.y;

      const onMove = (ev: MouseEvent) => {
        const next: Position = {
          x: Math.max(0, startPosX + ev.clientX - startX),
          y: Math.max(0, startPosY + ev.clientY - startY),
        };
        posRef.current = next;
        setPos(next);
      };

      const onUp = () => {
        moveWindow(win.id, posRef.current);
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [win.id, win.isMaximized, focusWindow, moveWindow]
  );

  const posStyle = win.isMaximized
    ? { top: 0, left: 0, right: 0, bottom: 54 }
    : { top: pos.y, left: pos.x, width: win.size.width, height: win.size.height };

  return (
    <motion.div
      initial={{ scale: 0.88, opacity: 0 }}
      animate={{ scale: win.isMinimized ? 0.82 : 1, opacity: win.isMinimized ? 0 : 1 }}
      exit={{ scale: 0.88, opacity: 0 }}
      transition={{ duration: 0.17, ease: 'easeOut' }}
      className="absolute flex flex-col rounded-xl overflow-hidden"
      style={{
        ...posStyle,
        zIndex: win.zIndex,
        pointerEvents: win.isMinimized ? 'none' : 'all',
        border: '1px solid rgba(245,211,147,0.18)',
        boxShadow: '0 0 0 1px rgba(245,211,147,0.07), 0 24px 64px rgba(0,0,0,0.75)',
        background: 'rgba(6,9,20,0.97)',
        backdropFilter: 'blur(20px)',
      }}
      onMouseDown={() => focusWindow(win.id)}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-3 px-4 shrink-0 cursor-default select-none"
        style={{
          height: 40,
          background: 'linear-gradient(180deg, rgba(18,24,48,0.96) 0%, rgba(10,14,30,0.96) 100%)',
          borderBottom: '1px solid rgba(245,211,147,0.1)',
        }}
        onMouseDown={handleTitleMouseDown}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-2" data-no-drag>
          <button
            onClick={() => closeWindow(win.id)}
            className="rounded-full transition-opacity hover:opacity-75 active:opacity-50"
            style={{ width: 12, height: 12, background: '#ff5f57' }}
          />
          <button
            onClick={() => minimizeWindow(win.id)}
            className="rounded-full transition-opacity hover:opacity-75 active:opacity-50"
            style={{ width: 12, height: 12, background: '#febc2e' }}
          />
          <button
            onClick={() => maximizeWindow(win.id)}
            className="rounded-full transition-opacity hover:opacity-75 active:opacity-50"
            style={{ width: 12, height: 12, background: '#28c840' }}
          />
        </div>

        {/* Title */}
        <div className="flex-1 flex items-center justify-center gap-2 pointer-events-none">
          <span className="text-sm leading-none">{win.icon}</span>
          <span
            className="font-mono tracking-widest"
            style={{ fontSize: 11, color: 'rgba(245,211,147,0.55)' }}
          >
            {win.title.toUpperCase()}
          </span>
        </div>
      </div>

      {/* App content */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
}
