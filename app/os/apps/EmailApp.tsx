'use client';

import { FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? '';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '';
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? '';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const FIELD: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(74,243,255,0.12)',
  borderRadius: 6,
  padding: '8px 12px',
  fontFamily: 'inherit',
  fontSize: 12,
  color: 'rgba(255,255,255,0.8)',
  outline: 'none',
  caretColor: '#f5d393',
};

export default function EmailApp() {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status,  setStatus]  = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus('sending');
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: name, from_email: email, subject: subject || '(no subject)', message },
        PUBLIC_KEY,
      );
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setName(''); setEmail(''); setSubject(''); setMessage('');
    setStatus('idle');
  };

  return (
    <div
      className="h-full flex flex-col font-mono"
      style={{ background: '#06090f', color: 'rgba(255,255,255,0.75)' }}
    >
      {/* Header bar */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 shrink-0"
        style={{ borderBottom: '1px solid rgba(74,243,255,0.1)', background: 'rgba(4,10,24,0.6)' }}
      >
        <span style={{ fontSize: 16 }}>✉️</span>
        <span style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(245,211,147,0.7)' }}>
          NEW MESSAGE
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 9, letterSpacing: '0.25em', color: 'rgba(74,243,255,0.35)' }}>
          MAGHRABY.OS · MAIL
        </span>
      </div>

      {/* Sent screen */}
      {status === 'sent' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 text-center">
          <div style={{ fontSize: 42 }}>📨</div>
          <div>
            <div style={{ fontSize: 14, color: '#4af3ff', letterSpacing: '0.1em', marginBottom: 6 }}>
              MESSAGE SENT
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
              Got it — I'll get back to you soon.
            </div>
          </div>
          <div style={{ fontSize: 10, color: 'rgba(74,243,255,0.4)', letterSpacing: '0.2em' }}>
            {'> '}<span style={{ color: 'rgba(245,211,147,0.6)' }}>Message delivered successfully</span>
          </div>
          <button
            onClick={reset}
            className="font-mono"
            style={{
              fontSize: 11, letterSpacing: '0.15em',
              color: 'rgba(245,211,147,0.8)',
              background: 'rgba(245,211,147,0.08)',
              border: '1px solid rgba(245,211,147,0.2)',
              borderRadius: 8, padding: '8px 24px',
            }}
          >
            ← Send another
          </button>
        </div>
      )}

      {/* Error screen */}
      {status === 'error' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 text-center">
          <div style={{ fontSize: 42 }}>⚠️</div>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,100,100,0.85)', letterSpacing: '0.1em', marginBottom: 6 }}>
              SEND FAILED
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
              Something went wrong. Try again or email me directly.
            </div>
          </div>
          <button
            onClick={() => setStatus('idle')}
            className="font-mono"
            style={{
              fontSize: 11, letterSpacing: '0.15em',
              color: 'rgba(74,243,255,0.8)',
              background: 'rgba(74,243,255,0.08)',
              border: '1px solid rgba(74,243,255,0.2)',
              borderRadius: 8, padding: '8px 24px',
            }}
          >
            ← Try again
          </button>
        </div>
      )}

      {/* Compose form */}
      {(status === 'idle' || status === 'sending') && (
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-y-auto">

          {/* To field — read-only */}
          <div
            className="flex items-center gap-3 px-4 py-2.5 shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <span style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(245,211,147,0.5)', width: 52 }}>TO</span>
            <span style={{ fontSize: 12, color: 'rgba(74,243,255,0.7)' }}>ahmedhamdy078@gmail.com</span>
          </div>

          {/* Name */}
          <div
            className="flex items-center gap-3 px-4 py-2.5 shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <span style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(245,211,147,0.5)', width: 52 }}>NAME</span>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              required
              style={{ ...FIELD, border: 'none', background: 'transparent', padding: '0', flex: 1 }}
            />
          </div>

          {/* From email */}
          <div
            className="flex items-center gap-3 px-4 py-2.5 shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <span style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(245,211,147,0.5)', width: 52 }}>FROM</span>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{ ...FIELD, border: 'none', background: 'transparent', padding: '0', flex: 1 }}
            />
          </div>

          {/* Subject */}
          <div
            className="flex items-center gap-3 px-4 py-2.5 shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <span style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(245,211,147,0.5)', width: 52 }}>RE</span>
            <input
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Subject (optional)"
              style={{ ...FIELD, border: 'none', background: 'transparent', padding: '0', flex: 1 }}
            />
          </div>

          {/* Message body */}
          <div className="flex-1 flex flex-col px-4 py-3" style={{ minHeight: 0 }}>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={`Hi Ahmed,\n\n...`}
              required
              style={{
                ...FIELD,
                flex: 1,
                resize: 'none',
                lineHeight: 1.75,
                paddingTop: 10,
              }}
            />
          </div>

          {/* Send bar */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ borderTop: '1px solid rgba(74,243,255,0.08)', background: 'rgba(4,10,24,0.4)' }}
          >
            <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)' }}>
              * name, email and message are required
            </span>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="font-mono"
              style={{
                fontSize: 12, letterSpacing: '0.18em',
                color: status === 'sending' ? 'rgba(74,243,255,0.4)' : '#4af3ff',
                background: 'rgba(74,243,255,0.08)',
                border: '1px solid rgba(74,243,255,0.25)',
                borderRadius: 8, padding: '8px 22px',
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.15s',
              }}
            >
              {status === 'sending' ? 'Sending…' : 'Send ↗'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
