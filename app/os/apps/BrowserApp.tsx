'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useWindowManager } from '../context/WindowManagerContext';

const BOOKMARKS = [
  { label: 'Old Portfolio', url: '/legacy',                                         icon: '💼', embed: true  },
  { label: 'LinkedIn',      url: 'https://www.linkedin.com/in/amaghraby/',         icon: '🔗', embed: false },
  { label: 'GitHub',        url: 'https://github.com/ahmedmaghraby',               icon: '⌥', embed: false },
  { label: 'Book Meeting',  url: 'https://calendar.app.google/rPaupi1Yd5vjJahRA',  icon: '📅', embed: false },
];

export default function BrowserApp() {
  const { windows, maximizeWindow } = useWindowManager();
  const [url, setUrl]               = useState('');
  const [activeUrl, setActiveUrl]   = useState('');
  const [blocked, setBlocked]       = useState(false);
  const [loading, setLoading]       = useState(false);
  const iframeRef                   = useRef<HTMLIFrameElement>(null);
  const timeoutRef                  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const maximize = () => {
    const win = windows.find(w => w.appId === 'browser');
    if (win && !win.isMaximized) maximizeWindow(win.id);
  };

  const sanitizeUrl = (raw: string): string => {
    let u = raw.trim();
    if (!u) return '';
    if (/^(javascript|data|vbscript):/i.test(u)) return '';
    if (!u.startsWith('/') && !/^https?:\/\//i.test(u)) u = `https://${u}`;
    return u;
  };

  const navigate = (target: string) => {
    const full = sanitizeUrl(target);
    if (!full) return;
    setUrl(full);
    setActiveUrl(full);
    setBlocked(false);
    setLoading(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setBlocked(true);
      setLoading(false);
    }, 8000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(url);
  };

  const handleIframeLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    try {
      const loc = iframeRef.current?.contentWindow?.location?.href;
      if (loc === 'about:blank' || loc === '') {
        setBlocked(true);
        setLoading(false);
        return;
      }
    } catch {
      // SecurityError = cross-origin page that DID load — fine
    }
    setLoading(false);
  };

  // Cleanup timeout on unmount
  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  return (
    <div className="h-full flex flex-col" style={{ background: '#06090f' }}>
      {/* Address bar */}
      <div
        className="flex items-center gap-2 px-3 py-2 shrink-0"
        style={{ borderBottom: '1px solid rgba(245,211,147,0.1)', background: 'rgba(10,14,28,0.8)' }}
      >
        <button
          onClick={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setActiveUrl(''); setUrl(''); setBlocked(false); setLoading(false); }}
          className="font-mono transition-opacity hover:opacity-60"
          style={{ fontSize: 14, color: 'rgba(245,211,147,0.5)' }}
          title="Home"
        >⌂</button>

        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
          <div
            className="flex-1 flex items-center rounded-md px-3"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', height: 28 }}
          >
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="Enter URL or search..."
              className="flex-1 bg-transparent outline-none font-mono"
              style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', caretColor: '#f5d393' }}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <button
            type="submit"
            className="font-mono px-3 py-1 rounded-md"
            style={{ fontSize: 11, color: 'rgba(245,211,147,0.8)', background: 'rgba(245,211,147,0.1)', border: '1px solid rgba(245,211,147,0.18)' }}
          >Go</button>
        </form>

        {/* Always-visible open-in-tab button when a URL is active */}
        {activeUrl && (
          <a
            href={activeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono px-2 py-1 rounded-md transition-opacity hover:opacity-75"
            style={{ fontSize: 11, color: 'rgba(74,243,255,0.75)', textDecoration: 'none', background: 'rgba(74,243,255,0.08)', border: '1px solid rgba(74,243,255,0.15)', whiteSpace: 'nowrap' }}
            title="Open in new tab"
          >↗ Open</a>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        {!activeUrl ? (
          /* New tab / bookmarks page */
          <div className="h-full flex flex-col items-center justify-center p-6">
            <div className="font-mono mb-6 tracking-widest" style={{ fontSize: 10, color: 'rgba(245,211,147,0.3)' }}>BOOKMARKS</div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {BOOKMARKS.map(bm => (
                <button
                  key={bm.url}
                  onClick={() => {
                    if (bm.embed) { maximize(); navigate(bm.url); }
                    else window.open(bm.url, '_blank', 'noopener,noreferrer');
                  }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-150"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(245,211,147,0.06)'; el.style.borderColor = 'rgba(245,211,147,0.15)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.03)'; el.style.borderColor = 'rgba(255,255,255,0.07)'; }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span style={{ fontSize: 22 }}>{bm.icon}</span>
                    <span
                      className="font-mono"
                      style={{ fontSize: 10, color: bm.embed ? 'rgba(245,211,147,0.5)' : 'rgba(74,243,255,0.5)' }}
                    >{bm.embed ? '⛶' : '↗'}</span>
                  </div>
                  <div className="font-mono w-full text-left" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                    {bm.label}
                  </div>
                </button>
              ))}
            </div>

            <p className="font-mono mt-8 text-center" style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', lineHeight: 1.7 }}>
              Note: many sites block embedding in iframes.<br />
              Use ↗ to open them in a new browser tab.
            </p>
          </div>
        ) : blocked ? (
          /* Blocked / X-Frame-Options fallback */
          <div className="h-full flex flex-col items-center justify-center p-6 text-center gap-4">
            <div style={{ fontSize: 36 }}>🔒</div>
            <div>
              <p className="font-mono mb-1" style={{ fontSize: 13, color: 'rgba(245,211,147,0.8)' }}>
                This site can't be embedded
              </p>
              <p className="font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                Most sites block iframes for security reasons.<br />
                Open it in a real browser tab instead.
              </p>
            </div>
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono px-6 py-2.5 rounded-xl"
              style={{ fontSize: 13, color: '#4af3ff', background: 'rgba(74,243,255,0.1)', border: '1px solid rgba(74,243,255,0.25)', textDecoration: 'none' }}
            >
              Open in new tab ↗
            </a>
            <button
              onClick={() => navigate(activeUrl)}
              className="font-mono"
              style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none' }}
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            {loading && (
              <div className="absolute top-0 left-0 right-0 z-10" style={{ height: 2, background: 'rgba(74,243,255,0.15)' }}>
                <div className="h-full animate-pulse" style={{ background: '#f5d393', width: '65%' }} />
              </div>
            )}
            <iframe
              ref={iframeRef}
              key={activeUrl}
              src={activeUrl}
              className="w-full h-full border-0"
              title="Browser"
              onLoad={handleIframeLoad}
              onError={() => { setBlocked(true); setLoading(false); if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          </>
        )}
      </div>
    </div>
  );
}
