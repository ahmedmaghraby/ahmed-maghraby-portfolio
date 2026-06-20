'use client';

import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Position, Size, WindowState } from '../types';
import { useWindowManager } from '../context/WindowManagerContext';

interface WindowProps {
  win: WindowState;
  children: React.ReactNode;
}

type SnapZone = 'top' | 'left' | 'right' | null;

const SNAP_EDGE = 16; // px from edge that triggers snap

export default function Window({ win, children }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, moveWindow, snapWindow } =
    useWindowManager();

  const [pos, setPos]   = useState<Position>(win.position);
  const [size, setSize] = useState<Size>(win.size);
  const [snapZone, setSnapZone] = useState<SnapZone>(null);

  const posRef  = useRef<Position>(win.position);
  const sizeRef = useRef<Size>(win.size);
  const snapRef = useRef<SnapZone>(null);

  // ── Snap preview overlay ─────────────────────────────────────────────────────
  const getSnapPreview = () => {
    const W = typeof window !== 'undefined' ? window.innerWidth  : 1440;
    const H = typeof window !== 'undefined' ? window.innerHeight : 900;
    const DH = H - 54; // desktop height (minus taskbar)
    if (snapZone === 'top')   return { top: 0,   left: 0,   width: W,   height: DH };
    if (snapZone === 'left')  return { top: 0,   left: 0,   width: W/2, height: DH };
    if (snapZone === 'right') return { top: 0,   left: W/2, width: W/2, height: DH };
    return null;
  };
  const preview = getSnapPreview();

  // ── Title bar drag ────────────────────────────────────────────────────────────
  const handleTitleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest('[data-no-drag]')) return;
      if (win.isMaximized) return;

      focusWindow(win.id);
      const startX = e.clientX, startY = e.clientY;
      const startPosX = posRef.current.x, startPosY = posRef.current.y;

      const onMove = (ev: MouseEvent) => {
        const W = window.innerWidth, H = window.innerHeight;
        let zone: SnapZone = null;
        if (ev.clientY <= SNAP_EDGE)             zone = 'top';
        else if (ev.clientX <= SNAP_EDGE)        zone = 'left';
        else if (ev.clientX >= W - SNAP_EDGE)    zone = 'right';

        snapRef.current = zone;
        setSnapZone(zone);

        const next: Position = {
          x: Math.max(0, startPosX + ev.clientX - startX),
          y: Math.max(0, startPosY + ev.clientY - startY),
        };
        posRef.current = next;
        setPos(next);
      };

      const onUp = () => {
        const zone = snapRef.current;
        if (zone === 'top') {
          maximizeWindow(win.id);
        } else if (zone === 'left' || zone === 'right') {
          const W = window.innerWidth, H = window.innerHeight - 54;
          snapWindow(
            win.id,
            { x: zone === 'left' ? 0 : W / 2, y: 0 },
            { width: W / 2, height: H },
          );
          setPos({ x: zone === 'left' ? 0 : W / 2, y: 0 });
          setSize({ width: W / 2, height: H });
          sizeRef.current = { width: W / 2, height: H };
        } else {
          moveWindow(win.id, posRef.current);
        }
        snapRef.current = null;
        setSnapZone(null);
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [win.id, win.isMaximized, focusWindow, moveWindow, maximizeWindow, snapWindow]
  );

  // ── Resize handle (bottom-right corner) ───────────────────────────────────────
  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (win.isMaximized) return;

      const startX = e.clientX, startY = e.clientY;
      const startW = sizeRef.current.width, startH = sizeRef.current.height;

      const onMove = (ev: MouseEvent) => {
        const next: Size = {
          width:  Math.max(300, startW + ev.clientX - startX),
          height: Math.max(200, startH + ev.clientY - startY),
        };
        sizeRef.current = next;
        setSize(next);
      };
      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [win.isMaximized]
  );

  // ── Double-click title: toggle maximize ────────────────────────────────────
  const handleTitleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-no-drag]')) return;
      maximizeWindow(win.id);
    },
    [win.id, maximizeWindow]
  );

  const posStyle = win.isMaximized
    ? { top: 0, left: 0, right: 0, bottom: 54 }
    : { top: pos.y, left: pos.x, width: size.width, height: size.height };

  return (
    <>
      {/* Snap preview ghost */}
      {preview && (
        <div
          className="fixed pointer-events-none rounded-xl"
          style={{
            ...preview,
            zIndex: win.zIndex - 1,
            background: 'rgba(74,243,255,0.06)',
            border: '2px solid rgba(74,243,255,0.3)',
            transition: 'all 0.12s ease',
          }}
        />
      )}

      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{
          scale:   win.isMinimized ? 0.82 : 1,
          opacity: win.isMinimized ? 0    : 1,
        }}
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
          onDoubleClick={handleTitleDoubleClick}
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

        {/* Resize handle */}
        {!win.isMaximized && (
          <div
            className="absolute bottom-0 right-0 cursor-nwse-resize"
            style={{ width: 16, height: 16 }}
            onMouseDown={handleResizeMouseDown}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" style={{ position: 'absolute', bottom: 3, right: 3, opacity: 0.25 }}>
              <path d="M9 1L1 9M9 5L5 9M9 9" stroke="#f5d393" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </motion.div>
    </>
  );
}
