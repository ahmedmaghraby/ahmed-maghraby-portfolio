'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Logo from '../../components/svg/Logo';

// ─── Data ─────────────────────────────────────────────────────────────────────

const LINKS = [
  { label: 'LinkedIn',      href: 'https://www.linkedin.com/in/amaghraby/', icon: '🔗', color: '#4af3ff' },
  { label: 'GitHub',        href: 'https://github.com/ahmedmaghraby',        icon: '⌥', color: '#f5d393' },
  { label: 'Book a Call',   href: 'https://calendar.app.google/rPaupi1Yd5vjJahRA', icon: '📅', color: '#a78bfa' },
  { label: 'Email',         href: 'mailto:ahmedhamdy078@gmail.com',          icon: '✉', color: '#34d399' },
];

const STATS = [
  { value: '7+', label: 'Years Experience' },
  { value: '4',  label: 'Companies Led' },
  { value: '20+', label: 'Products Shipped' },
  { value: '2',  label: 'Languages' },
];

const EXP = [
  { company: 'Lendo',          role: 'Associate Principal Engineer', period: 'Mar 2024 – Present',   part: false },
  { company: 'BuildMart',      role: 'Senior Front-End Engineer',    period: 'Nov 2022 – Mar 2024',   part: false },
  { company: 'Wtheq',          role: 'Senior Front-End Engineer',    period: 'May 2023 – Jan 2024',   part: true  },
  { company: 'Tribal',         role: 'Senior Front-End Engineer',    period: 'Dec 2022 – Apr 2023',   part: true  },
  { company: 'Link TSP',       role: 'Senior Software Engineer',     period: 'Mar 2021 – Nov 2022',   part: false },
  { company: 'Electrified',    role: 'Software Engineer',            period: 'Mar 2020 – Mar 2021',   part: false },
  { company: 'Bedab Software', role: '.Net Full-Stack Engineer',     period: 'Dec 2019 – Mar 2020',   part: false },
];

const SKILL_GROUPS = [
  { label: 'Frontend',  color: '#f5d393', items: ['React', 'Next.js', 'TypeScript', 'Vue', 'Nuxt', 'Angular', 'Tailwind'] },
  { label: 'Mobile',   color: '#4af3ff', items: ['React Native', 'Flutter'] },
  { label: 'Backend',  color: '#a78bfa', items: ['Firebase', 'GraphQL', 'ASP.NET Core', 'SignalR', 'Python'] },
  { label: 'Tooling',  color: '#34d399', items: ['Webpack', 'StoryBook', 'Jest', 'PWA', 'Storybook'] },
];

const LEARNING = ['ML / AI', 'RAG ChatBots'];

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] } }),
};

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.section
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono mb-4 tracking-widest uppercase" style={{ fontSize: 10, color: 'rgba(245,211,147,0.45)' }}>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: 'rgba(245,211,147,0.07)', margin: '0 24px' }} />;
}

// ─── Animated typewriter ──────────────────────────────────────────────────────

function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(iv);
      }, 40);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);
  return <>{displayed}<span className="animate-pulse">_</span></>;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function MobileView() {
  return (
    <div
      className="fixed inset-0 overflow-y-auto"
      style={{ background: '#06090f', color: '#e2e8f0', WebkitOverflowScrolling: 'touch' }}
    >
      {/* ── Hero ── */}
      <section className="flex flex-col items-center justify-center px-6 pt-16 pb-10 text-center relative overflow-hidden">
        {/* Ambient glow behind hero */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,211,147,0.06) 0%, transparent 70%)',
          }}
        />

        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <Logo width={130} height={65} />
        </motion.div>

        <motion.h1
          className="mt-6 font-mono font-bold"
          style={{ fontSize: 30, color: '#f5d393', lineHeight: 1.1 }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
        >
          Ahmed Maghraby
        </motion.h1>

        <motion.p
          className="mt-2 font-mono"
          style={{ fontSize: 14, color: 'rgba(74,243,255,0.8)', minHeight: 22 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        >
          <Typewriter text="Associate Principal Engineer" delay={600} />
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mt-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        >
          {['📍 Riyadh, Saudi Arabia', '🌐 Arabic · English', '🎓 CS — Banha Univ.'].map(t => (
            <span key={t} className="font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{t}</span>
          ))}
        </motion.div>

        {/* Contact pills */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}
        >
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full font-mono"
              style={{
                fontSize: 12,
                color: l.color,
                background: `${l.color}12`,
                border: `1px solid ${l.color}28`,
                textDecoration: 'none',
              }}
            >
              <span>{l.icon}</span>
              {l.label}
            </a>
          ))}
        </motion.div>
      </section>

      <Divider />

      {/* ── Stats ── */}
      <Section className="px-6 py-8">
        <div className="grid grid-cols-4 gap-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center rounded-xl py-4 px-2"
              style={{ background: 'rgba(245,211,147,0.04)', border: '1px solid rgba(245,211,147,0.1)' }}
              custom={i}
              variants={fadeUp}
            >
              <div className="font-mono font-bold" style={{ fontSize: 22, color: '#f5d393' }}>{s.value}</div>
              <div className="font-mono text-center mt-1" style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── About ── */}
      <Section className="px-6 py-10">
        <SectionLabel>About</SectionLabel>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.85 }}>
          A highly skilled engineer with{' '}
          <span style={{ color: '#f5d393', fontWeight: 700 }}>7+ years</span> of experience
          leading front-end and mobile teams, delivering scalable fintech, ERP, and
          e-service solutions. Specialized in{' '}
          <span style={{ color: '#f5d393' }}>Front-End Architecture</span>,
          Micro Frontends, Mobile Development, and building internal UI libraries.
          Passionate about performance, clean code, and shipping high-quality products.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {LEARNING.map(item => (
            <span
              key={item}
              className="font-mono px-3 py-1.5 rounded-full"
              style={{
                fontSize: 11,
                color: 'rgba(74,243,255,0.85)',
                background: 'rgba(74,243,255,0.08)',
                border: '1px solid rgba(74,243,255,0.2)',
              }}
            >
              📚 {item}
            </span>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── Experience ── */}
      <Section className="px-6 py-10">
        <SectionLabel>Experience</SectionLabel>
        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, rgba(245,211,147,0.25), transparent)' }}
          />
          <div className="space-y-4 pl-8">
            {EXP.map((e, i) => (
              <motion.div
                key={i}
                className="relative"
                custom={i}
                variants={fadeUp}
              >
                {/* Dot on timeline */}
                <div
                  className="absolute -left-8 top-3 w-3 h-3 rounded-full"
                  style={{ background: i === 0 ? '#f5d393' : 'rgba(245,211,147,0.3)', border: '2px solid rgba(245,211,147,0.2)' }}
                />
                <div
                  className="rounded-xl p-4"
                  style={{ background: i === 0 ? 'rgba(245,211,147,0.06)' : 'rgba(255,255,255,0.03)', border: `1px solid ${i === 0 ? 'rgba(245,211,147,0.18)' : 'rgba(255,255,255,0.06)'}` }}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="font-mono font-bold" style={{ fontSize: 14, color: i === 0 ? '#f5d393' : 'rgba(255,255,255,0.85)' }}>
                      {e.company}
                    </div>
                    {e.part && (
                      <span className="font-mono px-2 py-0.5 rounded" style={{ fontSize: 9, color: 'rgba(74,243,255,0.7)', background: 'rgba(74,243,255,0.08)', border: '1px solid rgba(74,243,255,0.15)' }}>
                        Part-time
                      </span>
                    )}
                  </div>
                  <div className="font-mono mt-1" style={{ fontSize: 12, color: 'rgba(74,243,255,0.65)' }}>{e.role}</div>
                  <div className="font-mono mt-0.5" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{e.period}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── Skills ── */}
      <Section className="px-6 py-10">
        <SectionLabel>Skills</SectionLabel>
        <div className="space-y-5">
          {SKILL_GROUPS.map((group, gi) => (
            <div key={group.label}>
              <div className="font-mono mb-2" style={{ fontSize: 11, color: group.color }}>
                {group.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((s, si) => (
                  <motion.span
                    key={s}
                    className="font-mono px-3 py-1 rounded-lg"
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.6)',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    custom={gi * 4 + si}
                    variants={fadeUp}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── Projects teaser ── */}
      <Section className="px-6 py-10">
        <SectionLabel>Notable Projects</SectionLabel>
        <div className="space-y-4">
          {[
            {
              name: 'LEAP\'23 Tracking System',
              desc: 'Real-time analytics dashboard used during LEAP 2023. Handles live tracking of thousands of events.',
              stack: ['Vue.ts', 'Firebase', 'Google Maps'],
            },
            {
              name: 'Azha ERP',
              desc: 'Full-scale ERP covering accounting, HR, inventory & invoicing. Used by 5+ enterprise clients.',
              stack: ['Vue.js', 'ASP.NET Core', 'Flutter', 'MS SQL'],
            },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              custom={i}
              variants={fadeUp}
            >
              <div className="font-mono font-bold" style={{ fontSize: 14, color: '#f5d393' }}>{p.name}</div>
              <p className="mt-1" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {p.stack.map(t => (
                  <span key={t} className="font-mono px-2 py-0.5 rounded text-xs" style={{ color: 'rgba(74,243,255,0.7)', background: 'rgba(74,243,255,0.06)', border: '1px solid rgba(74,243,255,0.13)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── Desktop CTA ── */}
      <Section className="px-6 pb-16 pt-6">
        <div
          className="rounded-2xl p-6 text-center relative overflow-hidden"
          style={{ background: 'rgba(245,211,147,0.05)', border: '1px solid rgba(245,211,147,0.15)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(245,211,147,0.06) 0%, transparent 70%)' }}
          />
          <div className="font-mono font-bold" style={{ fontSize: 16, color: '#f5d393' }}>
            Try AHMED.OS on Desktop
          </div>
          <p className="font-mono mt-2" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
            Open draggable windows, play games, run the terminal,<br /> and experience the full OS interface.
          </p>
          <div className="mt-4 font-mono" style={{ fontSize: 11, color: 'rgba(245,211,147,0.5)' }}>
            ↑ Switch to desktop for the full experience
          </div>
        </div>
      </Section>
    </div>
  );
}
