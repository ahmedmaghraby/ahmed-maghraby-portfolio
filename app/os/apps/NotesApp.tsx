'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Note {
  id: string;
  title: string;
  body: string;
  updatedAt: string;
}

const KEY = 'ahmed-os-notes';

// ─── Persistence ──────────────────────────────────────────────────────────────

function load(): Note[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; }
}

function save(notes: Note[]) {
  try { localStorage.setItem(KEY, JSON.stringify(notes)); } catch {}
}

function fmtDate(iso: string): string {
  try {
    const d = new Date(iso);
    const today = new Date();
    if (d.toDateString() === today.toDateString()) {
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    }
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch { return ''; }
}

function newNote(): Note {
  return { id: `note-${Date.now()}`, title: 'Untitled', body: '', updatedAt: new Date().toISOString() };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function NotesApp() {
  const [notes, setNotes]           = useState<Note[]>(load);
  const [activeId, setActiveId]     = useState<string | null>(() => load()[0]?.id ?? null);
  const [saveFlash, setSaveFlash]   = useState(false);
  const autoSaveTimer               = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = notes.find(n => n.id === activeId) ?? null;

  // Persist whenever notes change
  useEffect(() => { save(notes); }, [notes]);

  // Create note
  const createNote = useCallback(() => {
    const n = newNote();
    setNotes(prev => [n, ...prev]);
    setActiveId(n.id);
  }, []);

  // Delete note
  const deleteNote = useCallback(
    (id: string) => {
      setNotes(prev => {
        const next = prev.filter(n => n.id !== id);
        if (activeId === id) setActiveId(next[0]?.id ?? null);
        return next;
      });
    },
    [activeId]
  );

  // Update field with auto-save flash
  const updateNote = useCallback((id: string, patch: Partial<Note>) => {
    setNotes(prev =>
      prev.map(n => n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n)
    );
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      setSaveFlash(true);
      setTimeout(() => setSaveFlash(false), 1200);
    }, 600);
  }, []);

  const preview = (body: string) =>
    body.trim().split('\n').find(l => l.trim()) ?? '—';

  return (
    <div className="h-full flex" style={{ background: '#06090f', color: '#e2e8f0' }}>

      {/* ── Sidebar ── */}
      <div
        className="flex flex-col shrink-0"
        style={{ width: 200, borderRight: '1px solid rgba(245,211,147,0.09)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-3 py-3 shrink-0"
          style={{ borderBottom: '1px solid rgba(245,211,147,0.08)' }}
        >
          <span className="font-mono" style={{ fontSize: 11, color: 'rgba(245,211,147,0.5)', letterSpacing: '0.2em' }}>
            NOTES
          </span>
          <button
            onClick={createNote}
            className="rounded-lg px-2 py-1 font-mono transition-colors duration-100"
            style={{ fontSize: 16, color: '#f5d393', background: 'rgba(245,211,147,0.08)', border: '1px solid rgba(245,211,147,0.15)', lineHeight: 1 }}
            title="New note"
          >
            +
          </button>
        </div>

        {/* Note list */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
          {notes.length === 0 ? (
            <div className="px-3 py-8 text-center font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>
              No notes yet.<br />
              Click + to start.
            </div>
          ) : (
            notes.map(note => {
              const isActive = note.id === activeId;
              return (
                <button
                  key={note.id}
                  onClick={() => setActiveId(note.id)}
                  className="w-full text-left px-3 py-3 relative group transition-colors duration-100"
                  style={{
                    background: isActive ? 'rgba(245,211,147,0.07)' : 'transparent',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    borderLeft: `2px solid ${isActive ? '#f5d393' : 'transparent'}`,
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <div className="font-mono font-medium truncate" style={{ fontSize: 12, color: isActive ? '#f5d393' : 'rgba(255,255,255,0.78)' }}>
                    {note.title || 'Untitled'}
                  </div>
                  <div className="font-mono truncate mt-0.5" style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>
                    {preview(note.body)}
                  </div>
                  <div className="font-mono mt-1" style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>
                    {fmtDate(note.updatedAt)}
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={e => { e.stopPropagation(); deleteNote(note.id); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5"
                    style={{ fontSize: 11, color: 'rgba(255,95,87,0.7)', background: 'rgba(255,95,87,0.08)' }}
                    title="Delete note"
                  >
                    ✕
                  </button>
                </button>
              );
            })
          )}
        </div>

        {/* Footer: note count + local storage badge */}
        <div className="px-3 py-2 shrink-0 font-mono flex flex-col gap-1" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>
            {notes.length} note{notes.length !== 1 ? 's' : ''}
          </span>
          <div
            className="flex items-center gap-1 rounded-md px-1.5 py-1"
            style={{ background: 'rgba(74,243,255,0.06)', border: '1px solid rgba(74,243,255,0.12)' }}
            title="Notes are stored in your browser's localStorage — they stay private to this device"
          >
            <span style={{ fontSize: 9 }}>💾</span>
            <span style={{ fontSize: 9, color: 'rgba(74,243,255,0.6)', letterSpacing: '0.04em' }}>Saved on this device</span>
          </div>
        </div>
      </div>

      {/* ── Editor ── */}
      {active ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Editor header */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 shrink-0"
            style={{ borderBottom: '1px solid rgba(245,211,147,0.08)' }}
          >
            <input
              value={active.title}
              onChange={e => updateNote(active.id, { title: e.target.value })}
              placeholder="Note title…"
              className="flex-1 bg-transparent outline-none font-mono font-bold"
              style={{ fontSize: 14, color: '#f5d393', caretColor: '#f5d393' }}
            />
            {/* Auto-save indicator */}
            <span
              className="font-mono transition-opacity duration-300"
              style={{ fontSize: 9, color: 'rgba(74,243,255,0.6)', opacity: saveFlash ? 1 : 0 }}
            >
              ✓ saved
            </span>
          </div>

          {/* Textarea */}
          <textarea
            value={active.body}
            onChange={e => updateNote(active.id, { body: e.target.value })}
            placeholder="Start writing…"
            className="flex-1 resize-none outline-none px-4 py-4 font-mono"
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.75)',
              fontSize: 13,
              lineHeight: 1.8,
              caretColor: '#f5d393',
              scrollbarWidth: 'none',
            }}
          />

          {/* Word / char count */}
          <div
            className="px-4 py-1.5 shrink-0 flex items-center gap-4 font-mono"
            style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', borderTop: '1px solid rgba(255,255,255,0.04)' }}
          >
            <span>{active.body.trim() ? active.body.trim().split(/\s+/).length : 0} words</span>
            <span>{active.body.length} chars</span>
            <span className="ml-auto">Updated {fmtDate(active.updatedAt)}</span>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
          <span style={{ fontSize: 36 }}>📝</span>
          <p className="font-mono" style={{ fontSize: 12 }}>Select a note or create one</p>
          <button
            onClick={createNote}
            className="font-mono px-5 py-2 rounded-xl mt-1"
            style={{ fontSize: 12, color: '#f5d393', background: 'rgba(245,211,147,0.08)', border: '1px solid rgba(245,211,147,0.18)' }}
          >
            + New Note
          </button>
        </div>
      )}
    </div>
  );
}
