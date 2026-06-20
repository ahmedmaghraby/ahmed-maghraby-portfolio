'use client';

const CONTACT_LINKS = [
  { label: 'ahmedhamdy078@gmail.com', href: 'mailto:ahmedhamdy078@gmail.com', icon: '✉' },
  { label: 'linkedin.com/in/amaghraby', href: 'https://www.linkedin.com/in/amaghraby/', icon: '🔗' },
  { label: 'github.com/ahmedmaghraby', href: 'https://github.com/ahmedmaghraby', icon: '⌥' },
  { label: 'Book a Meeting', href: 'https://calendar.app.google/rPaupi1Yd5vjJahRA', icon: '📅' },
];

const LEARNING = ['ML / AI', 'RAG ChatBots'];

export default function AboutApp() {
  return (
    <div
      className="h-full overflow-y-auto"
      style={{ background: '#06090f', color: '#e2e8f0', scrollbarWidth: 'none' }}
    >
      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">

        {/* Terminal-style header */}
        <div
          className="rounded-lg px-4 py-3 font-mono"
          style={{ background: 'rgba(74,243,255,0.04)', border: '1px solid rgba(74,243,255,0.1)' }}
        >
          <div style={{ fontSize: 11, color: 'rgba(74,243,255,0.45)' }}>
            $ cat /home/ahmed/profile.json
          </div>
        </div>

        {/* Identity block */}
        <div style={{ borderBottom: '1px solid rgba(245,211,147,0.1)', paddingBottom: '1.25rem' }}>
          <h1
            className="font-mono font-bold tracking-wide"
            style={{ fontSize: 22, color: '#f5d393' }}
          >
            Ahmed Maghraby
          </h1>
          <p
            className="font-mono mt-1"
            style={{ fontSize: 13, color: 'rgba(74,243,255,0.7)' }}
          >
            Associate Principal Engineer
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            {[
              { icon: '📍', text: 'Riyadh, Saudi Arabia' },
              { icon: '🌐', text: 'Arabic · English' },
              { icon: '🎓', text: 'CS — Banha University' },
            ].map(item => (
              <span
                key={item.text}
                className="font-mono"
                style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}
              >
                {item.icon} {item.text}
              </span>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div>
          <div
            className="font-mono mb-2 tracking-widest uppercase"
            style={{ fontSize: 10, color: 'rgba(245,211,147,0.45)' }}
          >
            About
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75 }}>
            A highly skilled Associate Principal Engineer with{' '}
            <span style={{ color: '#f5d393' }}>7+ years</span> of experience leading front-end
            and mobile teams, delivering scalable fintech, ERP, and e-service solutions.
            Specialized in{' '}
            <span style={{ color: '#f5d393' }}>Front-End Architecture</span>, Micro Frontends,
            Mobile Development, and building internal UI libraries. Passionate about performance,
            clean code, and shipping high-quality products in fast-paced environments.
          </p>
        </div>

        {/* Currently Learning */}
        <div>
          <div
            className="font-mono mb-2 tracking-widest uppercase"
            style={{ fontSize: 10, color: 'rgba(245,211,147,0.45)' }}
          >
            Currently Learning
          </div>
          <div className="flex flex-wrap gap-2">
            {LEARNING.map(item => (
              <span
                key={item}
                className="font-mono px-3 py-1 rounded-full"
                style={{
                  fontSize: 11,
                  color: 'rgba(74,243,255,0.8)',
                  background: 'rgba(74,243,255,0.08)',
                  border: '1px solid rgba(74,243,255,0.18)',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div
            className="font-mono mb-3 tracking-widest uppercase"
            style={{ fontSize: 10, color: 'rgba(245,211,147,0.45)' }}
          >
            Contact
          </div>
          <div className="space-y-2">
            {CONTACT_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-150 group"
                style={{ textDecoration: 'none' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(245,211,147,0.06)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                <span style={{ fontSize: 14, width: 18, textAlign: 'center' }}>{link.icon}</span>
                <span
                  className="font-mono group-hover:underline"
                  style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}
                >
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
