'use client';

import { useEffect, useRef } from 'react';

const SPACING = 50;
const GLOW_RADIUS = 180;

export default function DesktopBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouseX = -9999;
    let mouseY = -9999;
    let scanY = 0;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Ambient corner glows (static)
      const topLeft = ctx.createRadialGradient(width * 0.15, height * 0.15, 0, width * 0.15, height * 0.15, width * 0.4);
      topLeft.addColorStop(0, 'rgba(74,243,255,0.045)');
      topLeft.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = topLeft;
      ctx.fillRect(0, 0, width, height);

      const btmRight = ctx.createRadialGradient(width * 0.85, height * 0.8, 0, width * 0.85, height * 0.8, width * 0.4);
      btmRight.addColorStop(0, 'rgba(245,211,147,0.04)');
      btmRight.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = btmRight;
      ctx.fillRect(0, 0, width, height);

      // Interactive grid dots
      for (let x = 0; x <= width; x += SPACING) {
        for (let y = 0; y <= height; y += SPACING) {
          const dist = Math.hypot(x - mouseX, y - mouseY);
          const proximity = Math.max(0, 1 - dist / GLOW_RADIUS);
          const baseAlpha = 0.055;
          const alpha = baseAlpha + proximity * 0.38;
          const radius = 1 + proximity * 2.5;

          ctx.fillStyle = proximity > 0.05
            ? `rgba(74,243,255,${alpha.toFixed(3)})`
            : `rgba(74,243,255,${baseAlpha})`;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Mouse spotlight
      if (mouseX > -1000) {
        const spot = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 360);
        spot.addColorStop(0, 'rgba(74,243,255,0.06)');
        spot.addColorStop(0.45, 'rgba(245,211,147,0.025)');
        spot.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = spot;
        ctx.fillRect(0, 0, width, height);
      }

      // Slow horizontal scan line
      scanY = (scanY + 0.25) % height;
      const scan = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
      scan.addColorStop(0, 'rgba(74,243,255,0)');
      scan.addColorStop(0.5, 'rgba(74,243,255,0.028)');
      scan.addColorStop(1, 'rgba(74,243,255,0)');
      ctx.fillStyle = scan;
      ctx.fillRect(0, scanY - 50, width, 100);

      animId = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
