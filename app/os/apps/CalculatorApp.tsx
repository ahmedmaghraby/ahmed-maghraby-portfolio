'use client';

import { useCallback, useEffect, useReducer } from 'react';

// ─── State ────────────────────────────────────────────────────────────────────

interface State {
  display: string;   // what's shown on screen
  pending: number | null;
  op: string | null;
  waitingForOperand: boolean;
}

const INIT: State = { display: '0', pending: null, op: null, waitingForOperand: false };

type Action =
  | { type: 'DIGIT';    value: string }
  | { type: 'OP';       value: string }
  | { type: 'EQUALS' }
  | { type: 'DECIMAL' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'PERCENT' }
  | { type: 'CLEAR' }
  | { type: 'BACKSPACE' };

function calc(a: number, op: string, b: number): number {
  switch (op) {
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷': return b !== 0 ? a / b : 0;
    default:  return b;
  }
}

function fmt(n: number): string {
  const s = parseFloat(n.toPrecision(12)).toString();
  return s.length > 12 ? n.toExponential(4) : s;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CLEAR':
      return INIT;

    case 'BACKSPACE':
      if (state.waitingForOperand) return state;
      if (state.display.length <= 1) return { ...state, display: '0' };
      return { ...state, display: state.display.slice(0, -1) };

    case 'DIGIT': {
      if (state.waitingForOperand) {
        return { ...state, display: action.value, waitingForOperand: false };
      }
      const d = state.display === '0' ? action.value : state.display + action.value;
      return { ...state, display: d.slice(0, 12) };
    }

    case 'DECIMAL': {
      if (state.waitingForOperand) return { ...state, display: '0.', waitingForOperand: false };
      if (state.display.includes('.')) return state;
      return { ...state, display: state.display + '.' };
    }

    case 'TOGGLE_SIGN': {
      const n = parseFloat(state.display) * -1;
      return { ...state, display: fmt(n) };
    }

    case 'PERCENT': {
      const n = parseFloat(state.display) / 100;
      return { ...state, display: fmt(n) };
    }

    case 'OP': {
      const current = parseFloat(state.display);
      if (state.op && !state.waitingForOperand) {
        const result = calc(state.pending!, state.op, current);
        return { display: fmt(result), pending: result, op: action.value, waitingForOperand: true };
      }
      return { ...state, pending: current, op: action.value, waitingForOperand: true };
    }

    case 'EQUALS': {
      if (!state.op || state.pending === null) return state;
      const result = calc(state.pending, state.op, parseFloat(state.display));
      return { display: fmt(result), pending: null, op: null, waitingForOperand: true };
    }

    default:
      return state;
  }
}

// ─── Button config ────────────────────────────────────────────────────────────

type BtnType = 'func' | 'op' | 'digit' | 'equals';

interface Btn {
  label: string;
  type: BtnType;
  action: Action;
  wide?: boolean;
}

const BUTTONS: Btn[][] = [
  [
    { label: 'AC',  type: 'func',   action: { type: 'CLEAR' } },
    { label: '±',   type: 'func',   action: { type: 'TOGGLE_SIGN' } },
    { label: '%',   type: 'func',   action: { type: 'PERCENT' } },
    { label: '÷',   type: 'op',     action: { type: 'OP', value: '÷' } },
  ],
  [
    { label: '7',   type: 'digit',  action: { type: 'DIGIT', value: '7' } },
    { label: '8',   type: 'digit',  action: { type: 'DIGIT', value: '8' } },
    { label: '9',   type: 'digit',  action: { type: 'DIGIT', value: '9' } },
    { label: '×',   type: 'op',     action: { type: 'OP', value: '×' } },
  ],
  [
    { label: '4',   type: 'digit',  action: { type: 'DIGIT', value: '4' } },
    { label: '5',   type: 'digit',  action: { type: 'DIGIT', value: '5' } },
    { label: '6',   type: 'digit',  action: { type: 'DIGIT', value: '6' } },
    { label: '−',   type: 'op',     action: { type: 'OP', value: '−' } },
  ],
  [
    { label: '1',   type: 'digit',  action: { type: 'DIGIT', value: '1' } },
    { label: '2',   type: 'digit',  action: { type: 'DIGIT', value: '2' } },
    { label: '3',   type: 'digit',  action: { type: 'DIGIT', value: '3' } },
    { label: '+',   type: 'op',     action: { type: 'OP', value: '+' } },
  ],
  [
    { label: '0',   type: 'digit',  action: { type: 'DIGIT', value: '0' }, wide: true },
    { label: '.',   type: 'digit',  action: { type: 'DECIMAL' } },
    { label: '=',   type: 'equals', action: { type: 'EQUALS' } },
  ],
];

const BTN_STYLES: Record<BtnType, { bg: string; color: string; hover: string }> = {
  func:   { bg: 'rgba(100,120,160,0.22)', color: '#e2e8f0',  hover: 'rgba(100,120,160,0.35)' },
  op:     { bg: 'rgba(245,211,147,0.18)', color: '#f5d393',  hover: 'rgba(245,211,147,0.3)' },
  digit:  { bg: 'rgba(255,255,255,0.07)', color: '#e2e8f0',  hover: 'rgba(255,255,255,0.13)' },
  equals: { bg: '#f5d393',               color: '#06090f',  hover: '#ffe5a0' },
};

// ─── Keyboard map ─────────────────────────────────────────────────────────────

const KEY_MAP: Record<string, Action> = {
  '0': { type: 'DIGIT', value: '0' }, '1': { type: 'DIGIT', value: '1' },
  '2': { type: 'DIGIT', value: '2' }, '3': { type: 'DIGIT', value: '3' },
  '4': { type: 'DIGIT', value: '4' }, '5': { type: 'DIGIT', value: '5' },
  '6': { type: 'DIGIT', value: '6' }, '7': { type: 'DIGIT', value: '7' },
  '8': { type: 'DIGIT', value: '8' }, '9': { type: 'DIGIT', value: '9' },
  '.': { type: 'DECIMAL' },
  'Enter': { type: 'EQUALS' }, '=': { type: 'EQUALS' },
  'Escape': { type: 'CLEAR' }, 'c': { type: 'CLEAR' },
  'Backspace': { type: 'BACKSPACE' },
  '+': { type: 'OP', value: '+' }, '-': { type: 'OP', value: '−' },
  '*': { type: 'OP', value: '×' }, '/': { type: 'OP', value: '÷' },
  '%': { type: 'PERCENT' },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CalculatorApp() {
  const [state, dispatch] = useReducer(reducer, INIT);

  const fire = useCallback((a: Action) => dispatch(a), []);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't interfere if an input is focused elsewhere
      if ((e.target as HTMLElement).tagName === 'INPUT') return;
      const action = KEY_MAP[e.key];
      if (action) { e.preventDefault(); dispatch(action); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const displaySize = state.display.length > 9 ? 22 : state.display.length > 6 ? 28 : 36;

  return (
    <div
      className="h-full flex flex-col"
      style={{ background: '#06090f', userSelect: 'none' }}
    >
      {/* Display */}
      <div
        className="flex flex-col items-end justify-end px-5 py-4 shrink-0"
        style={{ minHeight: 110, borderBottom: '1px solid rgba(245,211,147,0.08)' }}
      >
        {/* Operation preview */}
        <div className="font-mono" style={{ fontSize: 13, color: 'rgba(245,211,147,0.35)', height: 18 }}>
          {state.pending !== null && state.op ? `${fmt(state.pending)} ${state.op}` : ''}
        </div>

        {/* Main display */}
        <div
          className="font-mono font-light tabular-nums"
          style={{ fontSize: displaySize, color: '#f5d393', lineHeight: 1.1, wordBreak: 'break-all', textAlign: 'right' }}
        >
          {state.display}
        </div>
      </div>

      {/* Button grid */}
      <div className="flex-1 grid grid-rows-5 p-2 gap-1.5">
        {BUTTONS.map((row, ri) => (
          <div key={ri} className="grid gap-1.5" style={{ gridTemplateColumns: row.map(b => b.wide ? '2fr' : '1fr').join(' ') }}>
            {row.map((btn, bi) => {
              const s = BTN_STYLES[btn.type];
              const isActiveOp = btn.type === 'op' && state.op === btn.label && state.waitingForOperand;
              return (
                <button
                  key={bi}
                  onClick={() => fire(btn.action)}
                  className="rounded-xl font-mono font-medium transition-all duration-75 active:scale-95"
                  style={{
                    background: isActiveOp ? s.color : s.bg,
                    color: isActiveOp ? s.bg : s.color,
                    fontSize: 20,
                    border: 'none',
                    outline: 'none',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = isActiveOp ? s.color : s.hover; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isActiveOp ? s.color : s.bg; }}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
