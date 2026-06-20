import { AppDefinition } from '../types';

export const APPS: AppDefinition[] = [
  {
    id: 'about',
    title: 'About Me',
    icon: '👤',
    defaultSize: { width: 560, height: 460 },
    description: 'Who is Ahmed?',
  },
  {
    id: 'resume',
    title: 'Resume',
    icon: '📄',
    defaultSize: { width: 640, height: 580 },
    description: 'Experience & Skills',
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: '💼',
    defaultSize: { width: 720, height: 540 },
    description: 'My Portfolio',
  },
  {
    id: 'terminal',
    title: 'Terminal',
    icon: '⌨️',
    defaultSize: { width: 620, height: 420 },
    description: 'Interactive Terminal',
  },
  {
    id: 'browser',
    title: 'Browser',
    icon: '🌐',
    defaultSize: { width: 720, height: 520 },
    description: 'Web Browser',
  },
  {
    id: 'snake',
    title: 'Snake',
    icon: '🐍',
    defaultSize: { width: 380, height: 440 },
    description: 'Play Snake',
  },
  {
    id: '2048',
    title: '2048',
    icon: '🎮',
    defaultSize: { width: 380, height: 480 },
    description: 'Play 2048',
  },
  {
    id: 'leaderboard',
    title: 'Leaderboard',
    icon: '🏆',
    defaultSize: { width: 560, height: 500 },
    description: 'Game High Scores',
  },
  {
    id: 'calculator',
    title: 'Calculator',
    icon: '🧮',
    defaultSize: { width: 280, height: 420 },
    description: 'Calculator',
  },
  {
    id: 'notes',
    title: 'Notes',
    icon: '📝',
    defaultSize: { width: 620, height: 460 },
    description: 'Notepad — saves locally',
  },
];
