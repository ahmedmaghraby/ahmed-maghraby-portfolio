'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useCallback, useContext, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Toast {
  id: string;
  icon?: string;
  message: string;
  sub?: string;
}

interface ToastCtx {
  toast: (opts: Omit<Toast, 'id'>) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const Ctx = createContext<ToastCtx>({ toast: () => {} });

export function useToast() {
  return useContext(Ctx);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const toast = useCallback((opts: Omit<Toast, 'id'>) => {
    const id = String(++counter.current);
    setToasts(prev => [...prev.slice(-4), { ...opts, id }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);

  return (
    <Ctx.Provider value={{ toast }}>
      {children}

      {/* Toast container — above taskbar, below boot screen */}
      <div
        className="fixed pointer-events-none flex flex-col-reverse gap-2"
        style={{ bottom: 66, right: 14, zIndex: 99990, minWidth: 240, maxWidth: 320 }}
      >
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 48, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 48, scale: 0.9 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background: 'rgba(8,12,28,0.96)',
                border: '1px solid rgba(245,211,147,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(245,211,147,0.06)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {t.icon && (
                <span style={{ fontSize: 18, lineHeight: 1 }}>{t.icon}</span>
              )}
              <div className="min-w-0">
                <div className="font-mono truncate" style={{ fontSize: 12, color: '#f5d393' }}>
                  {t.message}
                </div>
                {t.sub && (
                  <div className="font-mono truncate mt-0.5" style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)' }}>
                    {t.sub}
                  </div>
                )}
              </div>

              {/* Progress bar */}
              <motion.div
                className="absolute bottom-0 left-0 h-px"
                style={{ background: '#f5d393', opacity: 0.3 }}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 3.2, ease: 'linear' }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}
