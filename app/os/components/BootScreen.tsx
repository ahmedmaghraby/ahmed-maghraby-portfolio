'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

const MESSAGES = [
  'Initializing AHMED.OS kernel...',
  'Loading UI environment...',
  'Mounting virtual file system...',
  'Starting window compositor...',
  'Loading profile: ahmed.maghraby...',
  'Applying visual themes...',
  'Launching desktop...',
];

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i < MESSAGES.length) {
        setLines(prev => [...prev, MESSAGES[i]]);
        setProgress(Math.round(((i + 1) / MESSAGES.length) * 100));
        i++;
        setTimeout(tick, 300);
      } else {
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 700);
        }, 400);
      }
    };
    setTimeout(tick, 300);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: '#06090f' }}
        >
          {/* Grid bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(74,243,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(74,243,255,0.18) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              opacity: 0.18,
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-1"
          >
            <img src="/logo.png" width={220} alt="AHMED.OS" style={{ objectFit: 'contain' }} />
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mb-8 font-mono tracking-[0.55em]"
            style={{ fontSize: 11, color: 'rgba(74,243,255,0.4)' }}
          >
            PORTFOLIO EDITION v1.0
          </motion.div>

          {/* Progress bar */}
          <div
            className="w-56 mb-5 overflow-hidden"
            style={{ height: 1, background: 'rgba(245,211,147,0.1)' }}
          >
            <div
              className="h-full transition-all duration-300"
              style={{ width: `${progress}%`, background: '#f5d393' }}
            />
          </div>

          {/* Boot log */}
          <div className="w-72 space-y-1.5">
            {lines.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 font-mono"
                style={{ fontSize: 11, color: 'rgba(74,243,255,0.42)' }}
              >
                <span style={{ color: 'rgba(245,211,147,0.38)' }}>›</span>
                {msg}
              </motion.div>
            ))}
          </div>

          <div
            className="mt-5 font-mono tabular-nums"
            style={{ fontSize: 10, color: 'rgba(245,211,147,0.22)' }}
          >
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
