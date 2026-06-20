'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const BOOT_LINES = [
  'MAGHRABY.OS kernel v2.0.0 ..............  [OK]',
  'Mounting virtual filesystem ............  [OK]',
  'Starting window compositor .............  [OK]',
  'Resolving path: /unknown ...............  [FAIL]',
  'ERR_PATH_NOT_FOUND: no such file or directory',
];

export default function NotFound() {
  const [lines, setLines]     = useState<string[]>([]);
  const [done, setDone]       = useState(false);
  const [blink, setBlink]     = useState(true);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setLines(prev => [...prev, BOOT_LINES[i]]);
      i++;
      if (i >= BOOT_LINES.length) { clearInterval(id); setDone(true); }
    }, 320);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#020b18',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'SF Mono','Fira Code','Cascadia Code',monospace",
      padding: '32px 20px',
      gap: 40,
    }}>

      {/* Scanline overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'repeating-linear-gradient(0deg,rgba(0,0,0,0.06) 0px,rgba(0,0,0,0.06) 1px,transparent 1px,transparent 3px)',
      }} />

      {/* OS badge */}
      <div style={{ fontSize: 10, letterSpacing: '0.35em', color: 'rgba(74,243,255,0.4)', textTransform: 'uppercase', zIndex: 1 }}>
        MAGHRABY.OS — System Report
      </div>

      {/* 404 heading */}
      <div style={{ zIndex: 1, textAlign: 'center' }}>
        <div style={{
          fontSize: 'clamp(72px,14vw,140px)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(74,243,255,0.35)',
          userSelect: 'none',
        }}>404</div>
        <div style={{ fontSize: 13, color: 'rgba(245,211,147,0.7)', letterSpacing: '0.25em', marginTop: 8 }}>
          ERR_PATH_NOT_FOUND
        </div>
      </div>

      {/* Terminal log */}
      <div style={{
        zIndex: 1,
        width: '100%',
        maxWidth: 520,
        background: 'rgba(4,243,255,0.03)',
        border: '1px solid rgba(74,243,255,0.12)',
        borderRadius: 8,
        padding: '16px 20px',
      }}>
        <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(74,243,255,0.4)', marginBottom: 12 }}>
          BOOT LOG
        </div>
        {lines.map((line, i) => {
          const isFail = line.includes('[FAIL]') || line.includes('ERR_');
          return (
            <div key={i} style={{
              fontSize: 11,
              lineHeight: '1.9',
              color: isFail ? 'rgba(255,100,100,0.85)' : 'rgba(138,180,216,0.65)',
              whiteSpace: 'pre',
            }}>
              {line}
            </div>
          );
        })}
        {!done && (
          <div style={{ fontSize: 11, color: 'rgba(74,243,255,0.6)', marginTop: 2 }}>
            {'> '}<span style={{ opacity: blink ? 1 : 0 }}>█</span>
          </div>
        )}
        {done && (
          <div style={{ fontSize: 11, color: 'rgba(74,243,255,0.6)', marginTop: 2 }}>
            {'> '}
            <span style={{ color: 'rgba(245,211,147,0.7)' }}>cd ~</span>
            <span style={{ opacity: blink ? 1 : 0 }}>█</span>
          </div>
        )}
      </div>

      {/* Return button */}
      {done && (
        <Link href="/" style={{
          zIndex: 1,
          fontSize: 12,
          letterSpacing: '0.18em',
          color: '#4af3ff',
          background: 'rgba(74,243,255,0.08)',
          border: '1px solid rgba(74,243,255,0.25)',
          borderRadius: 8,
          padding: '10px 28px',
          textDecoration: 'none',
          transition: 'background 0.15s',
        }}>
          ← Return to Desktop
        </Link>
      )}

      {/* Bottom brand */}
      <div style={{ position: 'fixed', bottom: 20, fontSize: 9, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.1)', zIndex: 1 }}>
        MAGHRABY.OS · {new Date().getFullYear()}
      </div>
    </div>
  );
}
