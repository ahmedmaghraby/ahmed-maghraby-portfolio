'use client';

import Logo from '../../components/svg/Logo';

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/amaghraby/', icon: '🔗' },
  { label: 'GitHub', href: 'https://github.com/ahmedmaghraby', icon: '⌥' },
  { label: 'Book a Meeting', href: 'https://calendar.app.google/rPaupi1Yd5vjJahRA', icon: '📅' },
  { label: 'Email', href: 'mailto:ahmedhamdy078@gmail.com', icon: '✉' },
];

const SKILLS = [
  'React', 'Next.js', 'TypeScript', 'Vue', 'Flutter', 'React Native',
  'Tailwind', 'Firebase', 'GraphQL', 'ASP.NET Core',
];

const EXP = [
  { company: 'Lendo', role: 'Associate Principal Engineer', period: 'Mar 2024 – Present' },
  { company: 'BuildMart', role: 'Senior Front-End Engineer', period: 'Nov 2022 – Mar 2024' },
  { company: 'Link TSP', role: 'Senior Software Engineer', period: 'Mar 2021 – Nov 2022' },
  { company: 'Electrified', role: 'Software Engineer', period: 'Mar 2020 – Mar 2021' },
];

export default function MobileView() {
  return (
    <div
      className="fixed inset-0 overflow-y-auto"
      style={{ background: '#06090f', color: '#e2e8f0', WebkitOverflowScrolling: 'touch' }}
    >
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-16 pb-12 text-center">
        <Logo width={140} height={70} />
        <h1
          className="mt-6 font-mono font-bold"
          style={{ fontSize: 28, color: '#f5d393' }}
        >
          Ahmed Maghraby
        </h1>
        <p
          className="mt-2 font-mono"
          style={{ fontSize: 14, color: 'rgba(74,243,255,0.7)' }}
        >
          Associate Principal Engineer
        </p>
        <p
          className="mt-1 font-mono"
          style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}
        >
          📍 Riyadh, Saudi Arabia
        </p>

        {/* Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full font-mono"
              style={{
                fontSize: 12,
                color: 'rgba(245,211,147,0.8)',
                background: 'rgba(245,211,147,0.08)',
                border: '1px solid rgba(245,211,147,0.15)',
                textDecoration: 'none',
              }}
            >
              <span>{l.icon}</span>
              {l.label}
            </a>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(245,211,147,0.08)', margin: '0 24px' }} />

      {/* About */}
      <section className="px-6 py-10">
        <div
          className="font-mono mb-3 tracking-widest uppercase"
          style={{ fontSize: 10, color: 'rgba(245,211,147,0.4)' }}
        >
          About
        </div>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
          A highly skilled engineer with <span style={{ color: '#f5d393' }}>7+ years</span> of experience
          leading front-end and mobile teams, delivering scalable fintech, ERP, and e-service solutions.
          Specialized in Front-End Architecture, Micro Frontends, and building internal UI libraries.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {['ML / AI', 'RAG ChatBots'].map(item => (
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
              📚 {item}
            </span>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(245,211,147,0.08)', margin: '0 24px' }} />

      {/* Experience */}
      <section className="px-6 py-10">
        <div
          className="font-mono mb-4 tracking-widest uppercase"
          style={{ fontSize: 10, color: 'rgba(245,211,147,0.4)' }}
        >
          Experience
        </div>
        <div className="space-y-4">
          {EXP.map((e, i) => (
            <div
              key={i}
              className="rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="font-mono font-bold" style={{ fontSize: 14, color: '#f5d393' }}>
                {e.company}
              </div>
              <div className="font-mono mt-0.5" style={{ fontSize: 12, color: 'rgba(74,243,255,0.65)' }}>
                {e.role}
              </div>
              <div className="font-mono mt-0.5" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                {e.period}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(245,211,147,0.08)', margin: '0 24px' }} />

      {/* Skills */}
      <section className="px-6 py-10">
        <div
          className="font-mono mb-3 tracking-widest uppercase"
          style={{ fontSize: 10, color: 'rgba(245,211,147,0.4)' }}
        >
          Skills
        </div>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map(s => (
            <span
              key={s}
              className="font-mono px-3 py-1 rounded-lg"
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.6)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Desktop hint */}
      <div
        className="text-center px-6 pb-12 font-mono"
        style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}
      >
        Visit on desktop for the full AHMED.OS experience
      </div>
    </div>
  );
}
