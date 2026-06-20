'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';

// ─── Data ─────────────────────────────────────────────────────────────────────

const LINKS = [
  { label: 'LinkedIn',    href: 'https://www.linkedin.com/in/amaghraby/', icon: '🔗', color: '#4af3ff' },
  { label: 'GitHub',      href: 'https://github.com/ahmedmaghraby',        icon: '⌥', color: '#f5d393' },
  { label: 'Book a Call', href: 'https://calendar.app.google/rPaupi1Yd5vjJahRA', icon: '📅', color: '#a78bfa' },
  { label: 'Email',       href: 'mailto:ahmedhamdy078@gmail.com',          icon: '✉', color: '#34d399' },
];

const STATS = [
  { value: '7+', label: 'Years Exp.' },
  { value: '4',  label: 'Companies' },
  { value: '20+', label: 'Products' },
  { value: '2',  label: 'Languages' },
];

const EXP = [
  { company: 'Lendo',          role: 'Associate Principal Engineer', period: 'Mar 2024 – Present',   part: false, current: true  },
  { company: 'BuildMart',      role: 'Senior Front-End Engineer',    period: 'Nov 2022 – Mar 2024',   part: false, current: false },
  { company: 'Wtheq',          role: 'Senior Front-End Engineer',    period: 'May 2023 – Jan 2024',   part: true,  current: false },
  { company: 'Tribal',         role: 'Senior Front-End Engineer',    period: 'Dec 2022 – Apr 2023',   part: true,  current: false },
  { company: 'Link TSP',       role: 'Senior Software Engineer',     period: 'Mar 2021 – Nov 2022',   part: false, current: false },
  { company: 'Electrified',    role: 'Software Engineer',            period: 'Mar 2020 – Mar 2021',   part: false, current: false },
  { company: 'Bedab Software', role: '.Net Full-Stack Engineer',     period: 'Dec 2019 – Mar 2020',   part: false, current: false },
];

const SKILL_GROUPS = [
  { label: 'Frontend', color: '#f5d393', items: ['React', 'Next.js', 'TypeScript', 'Vue', 'Nuxt', 'Angular', 'Tailwind'] },
  { label: 'Mobile',   color: '#4af3ff', items: ['React Native', 'Flutter'] },
  { label: 'Backend',  color: '#a78bfa', items: ['Firebase', 'GraphQL', 'ASP.NET Core', 'Python', 'SignalR'] },
  { label: 'Tooling',  color: '#34d399', items: ['Webpack', 'StoryBook', 'Jest', 'PWA'] },
];

const PROJECTS = [
  {
    name: "LEAP'23 Tracking System",
    desc: "Real-time analytics dashboard for LEAP 2023. Tracks thousands of live events with Google Maps integration.",
    stack: ['Vue.ts', 'Firebase', 'Google Maps'],
  },
  {
    name: 'Azha ERP',
    desc: 'Full ERP: accounting, HR, inventory & invoicing. Used by 5+ enterprise clients with mobile delivery app.',
    stack: ['Vue.js', 'ASP.NET Core', 'Flutter'],
  },
];

// ─── Tap Ripple ───────────────────────────────────────────────────────────────

function useRipple() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = useRef(0);

  const trigger = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const id = ++idRef.current;
    setRipples(r => [...r, { id, x: clientX - rect.left, y: clientY - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(x => x.id !== id)), 600);
  }, []);

  const Ripples = useCallback(
    () => (
      <>
        {ripples.map(r => (
          <span
            key={r.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: r.x - 40, top: r.y - 40,
              width: 80, height: 80,
              background: 'rgba(245,211,147,0.25)',
              animation: 'ripple 0.6s ease-out forwards',
            }}
          />
        ))}
      </>
    ),
    [ripples]
  );

  return { trigger, Ripples };
}

// ─── Swipe-aware link button ──────────────────────────────────────────────────

function RippleLink({ href, color, icon, label }: { href: string; color: string; icon: string; label: string }) {
  const { trigger, Ripples } = useRipple();
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="relative overflow-hidden flex items-center gap-2 px-4 py-2.5 rounded-full font-mono"
      style={{ fontSize: 12, color, background: `${color}12`, border: `1px solid ${color}28`, textDecoration: 'none' }}
      onMouseDown={trigger}
      onTouchStart={trigger}
    >
      <Ripples />
      <span>{icon}</span>
      {label}
    </a>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────

function HeroSection({ dragX }: { dragX: number }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,211,147,0.07) 0%, transparent 70%)' }} />

      {/* Parallax logo — moves slower than content */}
      <motion.div style={{ x: dragX * 0.12 }} className="mb-5">
        <img src="/logo.png" width={120} alt="MAGHRABY.OS" style={{ objectFit: 'contain' }} />
      </motion.div>

      <motion.h1
        style={{ x: dragX * 0.06, fontSize: 30, color: '#f5d393', fontFamily: 'monospace', fontWeight: 700 }}
        className="font-mono font-bold"
      >
        Ahmed Maghraby
      </motion.h1>

      <motion.p
        style={{ x: dragX * 0.04, fontSize: 13, color: 'rgba(74,243,255,0.8)', fontFamily: 'monospace' }}
        className="mt-2 font-mono"
      >
        Associate Principal Engineer
      </motion.p>

      <div className="flex flex-wrap justify-center gap-1.5 mt-2">
        {['📍 Riyadh', '🌐 AR · EN', '🎓 CS'].map(t => (
          <span key={t} className="font-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{t}</span>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-7">
        {LINKS.map(l => <RippleLink key={l.href} {...l} />)}
      </div>

      <div className="mt-8 font-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>
        Swipe → to explore
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="h-full overflow-y-auto px-6 py-10" style={{ scrollbarWidth: 'none' }}>
      <div className="font-mono mb-3 tracking-widest uppercase" style={{ fontSize: 10, color: 'rgba(245,211,147,0.45)' }}>About</div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2 mb-7">
        {STATS.map(s => (
          <div key={s.label} className="flex flex-col items-center rounded-xl py-3" style={{ background: 'rgba(245,211,147,0.04)', border: '1px solid rgba(245,211,147,0.1)' }}>
            <div className="font-mono font-bold" style={{ fontSize: 20, color: '#f5d393' }}>{s.value}</div>
            <div className="font-mono text-center mt-0.5" style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.85 }}>
        A highly skilled engineer with{' '}
        <span style={{ color: '#f5d393', fontWeight: 700 }}>7+ years</span> of experience
        leading front-end and mobile teams, delivering scalable fintech, ERP, and
        e-service solutions. Specialized in{' '}
        <span style={{ color: '#f5d393' }}>Front-End Architecture</span>,
        Micro Frontends, and building internal UI libraries.
      </p>

      <div className="flex flex-wrap gap-2 mt-5">
        {['📚 ML / AI', '📚 RAG ChatBots'].map(item => (
          <span key={item} className="font-mono px-3 py-1.5 rounded-full" style={{ fontSize: 11, color: 'rgba(74,243,255,0.85)', background: 'rgba(74,243,255,0.08)', border: '1px solid rgba(74,243,255,0.2)' }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ExperienceSection() {
  return (
    <div className="h-full overflow-y-auto px-6 py-10" style={{ scrollbarWidth: 'none' }}>
      <div className="font-mono mb-5 tracking-widest uppercase" style={{ fontSize: 10, color: 'rgba(245,211,147,0.45)' }}>Experience</div>
      <div className="relative">
        <div className="absolute left-2 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, rgba(245,211,147,0.3), transparent)' }} />
        <div className="space-y-3 pl-8">
          {EXP.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className="relative"
            >
              <div className="absolute -left-8 top-3 w-3 h-3 rounded-full" style={{ background: e.current ? '#f5d393' : 'rgba(245,211,147,0.25)', border: '2px solid rgba(245,211,147,0.18)' }} />
              <div className="rounded-xl p-3.5" style={{ background: e.current ? 'rgba(245,211,147,0.06)' : 'rgba(255,255,255,0.03)', border: `1px solid ${e.current ? 'rgba(245,211,147,0.18)' : 'rgba(255,255,255,0.06)'}` }}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono font-bold" style={{ fontSize: 13, color: e.current ? '#f5d393' : 'rgba(255,255,255,0.85)' }}>{e.company}</span>
                  {e.part && <span className="font-mono px-1.5 py-0.5 rounded" style={{ fontSize: 9, color: 'rgba(74,243,255,0.7)', background: 'rgba(74,243,255,0.08)', border: '1px solid rgba(74,243,255,0.15)' }}>PT</span>}
                </div>
                <div className="font-mono mt-0.5" style={{ fontSize: 11, color: 'rgba(74,243,255,0.6)' }}>{e.role}</div>
                <div className="font-mono mt-0.5" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{e.period}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <div className="h-full overflow-y-auto px-6 py-10" style={{ scrollbarWidth: 'none' }}>
      <div className="font-mono mb-5 tracking-widest uppercase" style={{ fontSize: 10, color: 'rgba(245,211,147,0.45)' }}>Skills</div>
      <div className="space-y-5">
        {SKILL_GROUPS.map((group, gi) => (
          <div key={group.label}>
            <div className="font-mono mb-2" style={{ fontSize: 11, color: group.color }}>{group.label}</div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((s, si) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: gi * 0.1 + si * 0.04 }}
                  className="font-mono px-3 py-1 rounded-lg"
                  style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <div className="h-full overflow-y-auto px-6 py-10" style={{ scrollbarWidth: 'none' }}>
      <div className="font-mono mb-5 tracking-widest uppercase" style={{ fontSize: 10, color: 'rgba(245,211,147,0.45)' }}>Projects</div>
      <div className="space-y-4 mb-6">
        {PROJECTS.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="font-mono font-bold" style={{ fontSize: 14, color: '#f5d393' }}>{p.name}</div>
            <p className="mt-1" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{p.desc}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {p.stack.map(t => (
                <span key={t} className="font-mono px-2 py-0.5 rounded text-xs" style={{ color: 'rgba(74,243,255,0.7)', background: 'rgba(74,243,255,0.06)', border: '1px solid rgba(74,243,255,0.13)' }}>{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop CTA */}
      <div className="rounded-2xl p-5 text-center relative overflow-hidden" style={{ background: 'rgba(245,211,147,0.05)', border: '1px solid rgba(245,211,147,0.14)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(245,211,147,0.07) 0%, transparent 70%)' }} />
        <div className="font-mono font-bold" style={{ fontSize: 14, color: '#f5d393' }}>Try MAGHRABY.OS on Desktop</div>
        <p className="font-mono mt-1.5" style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', lineHeight: 1.7 }}>
          Draggable windows · Terminal · Games · Full OS experience
        </p>
      </div>
    </div>
  );
}

// ─── Section config ───────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'hero',       label: '🏠', title: 'Home'       },
  { id: 'about',      label: '👤', title: 'About'      },
  { id: 'experience', label: '💼', title: 'Experience' },
  { id: 'skills',     label: '⚙️', title: 'Skills'     },
  { id: 'projects',   label: '🚀', title: 'Projects'   },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function MobileView() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const dragX = useMotionValue(0);
  const [liveX, setLiveX] = useState(0);

  const goTo = useCallback((idx: number) => {
    setCurrent(Math.max(0, Math.min(SECTIONS.length - 1, idx)));
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setDragging(true);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    // Only capture horizontal swipes
    if (Math.abs(dx) > Math.abs(dy)) {
      dragX.set(dx);
      setLiveX(dx);
    }
  }, [dragX]);

  const onTouchEnd = useCallback(() => {
    const dx = dragX.get();
    setDragging(false);
    dragX.set(0);
    setLiveX(0);
    if (Math.abs(dx) > 60) {
      goTo(dx < 0 ? current + 1 : current - 1);
    }
  }, [dragX, current, goTo]);

  // Keyboard nav on mobile (tab focus)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowLeft')  goTo(current - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, goTo]);

  const renderSection = (id: string) => {
    switch (id) {
      case 'hero':       return <HeroSection dragX={liveX} />;
      case 'about':      return <AboutSection />;
      case 'experience': return <ExperienceSection />;
      case 'skills':     return <SkillsSection />;
      case 'projects':   return <ProjectsSection />;
      default:           return null;
    }
  };

  return (
    <>
      {/* Ripple keyframe */}
      <style>{`@keyframes ripple{0%{transform:scale(0);opacity:1}100%{transform:scale(3);opacity:0}}`}</style>

      <div
        className="fixed inset-0 overflow-hidden"
        style={{ background: '#06090f', color: '#e2e8f0', touchAction: 'pan-y' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(74,243,255,0.03) 0%, transparent 60%)' }} />

        {/* Section slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="h-full"
            initial={{ opacity: 0, x: liveX < 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: liveX < 0 ? -60 : 60 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderSection(SECTIONS[current].id)}
          </motion.div>
        </AnimatePresence>

        {/* Bottom navigation */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1 py-4"
          style={{ background: 'rgba(6,9,15,0.85)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(245,211,147,0.08)' }}
        >
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{ background: i === current ? 'rgba(245,211,147,0.08)' : 'transparent' }}
            >
              <span style={{ fontSize: 14 }}>{s.label}</span>
              <span className="font-mono" style={{ fontSize: 8, color: i === current ? '#f5d393' : 'rgba(255,255,255,0.28)', letterSpacing: '0.1em' }}>
                {s.title.toUpperCase()}
              </span>
              {i === current && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full"
                  style={{ width: 3, height: 3, background: '#f5d393' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
