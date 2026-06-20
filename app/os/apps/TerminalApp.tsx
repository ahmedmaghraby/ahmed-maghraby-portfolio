'use client';

import { useEffect, useRef, useState, KeyboardEvent } from 'react';

interface Line {
  type: 'input' | 'output' | 'error' | 'link';
  content: string;
  href?: string;
}

const HELP_TEXT = `
Available commands:
  whoami        — who is this guy?
  about         — short bio
  skills        — tech skills list
  experience    — work history
  projects      — notable projects
  contact       — contact information
  social        — social links
  open <app>    — open an OS app (about|resume|projects|browser|snake|2048)
  clear         — clear the terminal
  date          — current date & time
  echo <text>   — echo text back
  legacy        — link to the old portfolio
  help          — show this list
`.trim();

const WHOAMI = `ahmed maghraby
role: Associate Principal Engineer
exp:  7+ years (2019 – present)
loc:  Riyadh, Saudi Arabia
focus: Front-End Architecture · Micro Frontends · Mobile · UI Libraries`;

const ABOUT = `A highly skilled Associate Principal Engineer with 7+ years of experience
leading front-end and mobile teams, delivering scalable fintech, ERP, and
e-service solutions. Passionate about performance, clean code, and shipping
high-quality products in fast-paced environments.

Currently learning: ML/AI, RAG ChatBots`;

const SKILLS = `Frontend   React · Next.js · Vue · Nuxt · Angular · TypeScript · Tailwind
Mobile     React Native · Flutter
Testing    Jest · Testing Library · Selenium (Python)
Backend    Firebase · GraphQL · ASP.NET Core · SignalR · Python · SQL
Tools      Webpack · GULP · StoryBook · PWA`;

const EXPERIENCE = `Lendo          Associate Principal Engineer      Mar 2024 – Present
BuildMart      Senior Front-End Engineer           Nov 2022 – Mar 2024
Wtheq          Senior Front-End Engineer (PT)      May 2023 – Jan 2024
Tribal         Senior Front-End Engineer (PT)      Dec 2022 – Apr 2023
Link TSP       Senior Software Engineer            Mar 2021 – Nov 2022
Electrified    Software Engineer                   Mar 2020 – Mar 2021
Bedab Software .Net Full-Stack Engineer            Dec 2019 – Mar 2020`;

const PROJECTS_TEXT = `LEAP'23 Tracking System
  Real-time tracking & analytics used during LEAP'23
  Stack: Vue.ts, Firebase, Google Cloud, Google Maps API

Azha ERP
  Full ERP covering accounting, HR, inventory & invoices
  Used by 5+ clients | Includes mobile delivery app
  Stack: Vue.js, ASP.NET Core, MS SQL Server, Flutter`;

const CONTACT = `Email     ahmedhamdy078@gmail.com
Location  Riyadh, Saudi Arabia`;

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/amaghraby/' },
  { label: 'GitHub', href: 'https://github.com/ahmedmaghraby' },
  { label: 'Calendar', href: 'https://calendar.app.google/rPaupi1Yd5vjJahRA' },
  { label: 'Portfolio (legacy)', href: 'https://ahmedmaghraby.me' },
];

const EASTER_EGGS: Record<string, string> = {
  sudo: 'Nice try. You don\'t have sudo privileges here.',
  vim: 'I know how to exit vim. It\'s :wq, by the way.',
  'rm -rf /': 'I see what you\'re trying to do. No.',
  ls: 'about.app  resume.app  projects.app  browser.app  snake.game  2048.game',
  pwd: '/home/ahmed',
  'cat package.json': '{ "name": "MAGHRABY.OS", "version": "1.0.0", "author": "Ahmed Maghraby" }',
};

function processCommand(raw: string, openApp: (id: string) => void): Line[] {
  const cmd = raw.trim().toLowerCase();
  const arg = raw.trim().slice(raw.trim().indexOf(' ') + 1).trim();

  if (!cmd) return [];

  if (EASTER_EGGS[cmd]) {
    return [{ type: 'output', content: EASTER_EGGS[cmd] }];
  }

  switch (cmd) {
    case 'help':
      return [{ type: 'output', content: HELP_TEXT }];
    case 'whoami':
      return [{ type: 'output', content: WHOAMI }];
    case 'about':
      return [{ type: 'output', content: ABOUT }];
    case 'skills':
      return [{ type: 'output', content: SKILLS }];
    case 'experience':
      return [{ type: 'output', content: EXPERIENCE }];
    case 'projects':
      return [{ type: 'output', content: PROJECTS_TEXT }];
    case 'contact':
      return [{ type: 'output', content: CONTACT }];
    case 'social':
      return SOCIAL_LINKS.map(s => ({ type: 'link' as const, content: s.label, href: s.href }));
    case 'date':
      return [{ type: 'output', content: new Date().toString() }];
    case 'clear':
      return [];
    case 'legacy':
      return [
        {
          type: 'link',
          content: 'Open old portfolio → ahmedmaghraby.me',
          href: 'https://ahmedmaghraby.me',
        },
      ];
    default:
      if (cmd.startsWith('echo ')) {
        return [{ type: 'output', content: arg || '' }];
      }
      if (cmd.startsWith('open ')) {
        const appId = arg.toLowerCase();
        const valid = ['about', 'resume', 'projects', 'browser', 'snake', '2048', 'leaderboard'];
        if (valid.includes(appId)) {
          openApp(appId);
          return [{ type: 'output', content: `Opening ${appId}...` }];
        }
        return [{ type: 'error', content: `open: unknown app "${appId}". Valid: ${valid.join(', ')}` }];
      }
      return [{ type: 'error', content: `command not found: ${cmd}. Type 'help' for available commands.` }];
  }
}

interface TerminalAppProps {
  onOpenApp?: (appId: string) => void;
}

export default function TerminalApp({ onOpenApp }: TerminalAppProps) {
  const [history, setHistory] = useState<Line[]>([
    { type: 'output', content: 'MAGHRABY.OS Terminal v1.0 — type \'help\' for commands.' },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      const inputLine: Line = { type: 'input', content: cmd };

      if (cmd.toLowerCase() === 'clear') {
        setHistory([{ type: 'output', content: 'MAGHRABY.OS Terminal v1.0 — type \'help\' for commands.' }]);
        setInput('');
        return;
      }

      const result = processCommand(cmd, (appId) => {
        onOpenApp?.(appId);
      });

      setHistory(prev => [...prev, inputLine, ...result]);
      if (cmd) {
        setCmdHistory(prev => [cmd, ...prev]);
        setHistoryIdx(-1);
      }
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? '' : cmdHistory[next] ?? '');
    }
  };

  return (
    <div
      className="h-full flex flex-col font-mono cursor-text"
      style={{ background: '#040608', color: '#c8d3d8' }}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-0.5"
        style={{ scrollbarWidth: 'none', fontSize: 12, lineHeight: '1.7' }}
      >
        {history.map((line, idx) => (
          <div key={idx}>
            {line.type === 'input' && (
              <div className="flex items-start gap-2">
                <span style={{ color: '#f5d393', userSelect: 'none' }}>ahmed@os:~$</span>
                <span style={{ color: '#e2e8f0' }}>{line.content}</span>
              </div>
            )}
            {line.type === 'output' && (
              <pre
                className="whitespace-pre-wrap"
                style={{ color: 'rgba(200,211,216,0.75)', fontFamily: 'inherit' }}
              >
                {line.content}
              </pre>
            )}
            {line.type === 'error' && (
              <div style={{ color: 'rgba(255,95,87,0.8)' }}>{line.content}</div>
            )}
            {line.type === 'link' && (
              <a
                href={line.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'rgba(74,243,255,0.75)', textDecoration: 'underline' }}
              >
                {line.content} ↗
              </a>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div
        className="flex items-center gap-2 px-4 py-3 shrink-0"
        style={{ borderTop: '1px solid rgba(245,211,147,0.08)' }}
      >
        <span style={{ color: '#f5d393', fontSize: 12, userSelect: 'none' }}>ahmed@os:~$</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          className="flex-1 bg-transparent outline-none"
          style={{ color: '#e2e8f0', fontSize: 12, caretColor: '#f5d393' }}
          spellCheck={false}
          autoCapitalize="none"
          autoComplete="off"
        />
      </div>
    </div>
  );
}
