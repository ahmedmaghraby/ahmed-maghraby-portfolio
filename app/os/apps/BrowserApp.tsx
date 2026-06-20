'use client';

import { FormEvent, useState } from 'react';

const BOOKMARKS = [
  { label: 'Old Portfolio', url: 'https://ahmedmaghraby.me', icon: '💼' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/amaghraby/', icon: '🔗' },
  { label: 'GitHub', url: 'https://github.com/ahmedmaghraby', icon: '⌥' },
  { label: 'Book Meeting', url: 'https://calendar.app.google/rPaupi1Yd5vjJahRA', icon: '📅' },
];

const BLOCKED_MSG = 'This site cannot be embedded. Click "Open in new tab" to visit it.';

export default function BrowserApp() {
  const [url, setUrl] = useState('');
  const [activeUrl, setActiveUrl] = useState('');
  const [blocked, setBlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = (target: string) => {
    let full = target.trim();
    if (!full) return;
    if (!/^https?:\/\//i.test(full)) full = `https://${full}`;
    setUrl(full);
    setActiveUrl(full);
    setBlocked(false);
    setLoading(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(url);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#06090f' }}>
      {/* Address bar */}
      <div
        className="flex items-center gap-2 px-3 py-2 shrink-0"
        style={{ borderBottom: '1px solid rgba(245,211,147,0.1)', background: 'rgba(10,14,28,0.8)' }}
      >
        <button
          onClick={() => { setActiveUrl(''); setUrl(''); setBlocked(false); setLoading(false); }}
          className="font-mono transition-opacity hover:opacity-60"
          style={{ fontSize: 14, color: 'rgba(245,211,147,0.5)' }}
          title="Home"
        >
          ⌂
        </button>

        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
          <div
            className="flex-1 flex items-center rounded-md px-3"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              height: 28,
            }}
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
            className="font-mono px-3 py-1 rounded-md transition-colors"
            style={{
              fontSize: 11,
              color: 'rgba(245,211,147,0.8)',
              background: 'rgba(245,211,147,0.1)',
              border: '1px solid rgba(245,211,147,0.18)',
            }}
          >
            Go
          </button>
        </form>

        {activeUrl && (
          <a
            href={activeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono transition-opacity hover:opacity-60"
            style={{ fontSize: 11, color: 'rgba(74,243,255,0.6)', textDecoration: 'none' }}
            title="Open in new tab"
          >
            ↗
          </a>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        {!activeUrl ? (
          /* New tab page */
          <div className="h-full flex flex-col items-center justify-center p-6">
            <div
              className="font-mono mb-6 tracking-widest"
              style={{ fontSize: 10, color: 'rgba(245,211,147,0.3)' }}
            >
              BOOKMARKS
            </div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {BOOKMARKS.map(bm => (
                <button
                  key={bm.url}
                  onClick={() => navigate(bm.url)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-150"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(245,211,147,0.06)';
                    el.style.borderColor = 'rgba(245,211,147,0.15)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.03)';
                    el.style.borderColor = 'rgba(255,255,255,0.07)';
                  }}
                >
                  <span style={{ fontSize: 24 }}>{bm.icon}</span>
                  <span className="font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                    {bm.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : blocked ? (
          /* Blocked / X-Frame-Options */
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
            <p className="font-mono mb-4" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
              {BLOCKED_MSG}
            </p>
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono px-4 py-2 rounded-lg transition-colors"
              style={{
                fontSize: 12,
                color: 'rgba(74,243,255,0.8)',
                background: 'rgba(74,243,255,0.08)',
                border: '1px solid rgba(74,243,255,0.18)',
                textDecoration: 'none',
              }}
            >
              Open in new tab ↗
            </a>
          </div>
        ) : (
          <>
            {loading && (
              <div
                className="absolute top-0 left-0 right-0 z-10"
                style={{ height: 2, background: 'rgba(74,243,255,0.3)' }}
              >
                <div
                  className="h-full animate-pulse"
                  style={{ background: '#f5d393', width: '60%' }}
                />
              </div>
            )}
            <iframe
              key={activeUrl}
              src={activeUrl}
              className="w-full h-full border-0"
              title="Browser"
              onLoad={() => setLoading(false)}
              onError={() => { setBlocked(true); setLoading(false); }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </>
        )}
      </div>
    </div>
  );
}
