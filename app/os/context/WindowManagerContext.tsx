'use client';

import React, { createContext, useCallback, useContext, useReducer } from 'react';
import { AppDefinition, Position, WindowState } from '../types';

interface ManagerState {
  windows: WindowState[];
  maxZ: number;
}

type Action =
  | { type: 'OPEN'; app: AppDefinition }
  | { type: 'CLOSE'; id: string }
  | { type: 'MINIMIZE'; id: string }
  | { type: 'MAXIMIZE'; id: string }
  | { type: 'FOCUS'; id: string }
  | { type: 'MOVE'; id: string; position: Position };

function reducer(state: ManagerState, action: Action): ManagerState {
  switch (action.type) {
    case 'OPEN': {
      const existing = state.windows.find(w => w.appId === action.app.id);
      if (existing) {
        return {
          ...state,
          maxZ: state.maxZ + 1,
          windows: state.windows.map(w =>
            w.id === existing.id ? { ...w, isMinimized: false, zIndex: state.maxZ + 1 } : w
          ),
        };
      }
      const offset = state.windows.filter(w => !w.isMinimized).length * 28;
      return {
        ...state,
        maxZ: state.maxZ + 1,
        windows: [
          ...state.windows,
          {
            id: `${action.app.id}-${state.maxZ}`,
            appId: action.app.id,
            title: action.app.title,
            icon: action.app.icon,
            position: { x: 90 + offset, y: 48 + offset },
            size: action.app.defaultSize,
            isMinimized: false,
            isMaximized: false,
            zIndex: state.maxZ + 1,
          },
        ],
      };
    }
    case 'CLOSE':
      return { ...state, windows: state.windows.filter(w => w.id !== action.id) };
    case 'MINIMIZE':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, isMinimized: true } : w
        ),
      };
    case 'MAXIMIZE':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, isMaximized: !w.isMaximized } : w
        ),
      };
    case 'FOCUS':
      return {
        ...state,
        maxZ: state.maxZ + 1,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, zIndex: state.maxZ + 1, isMinimized: false } : w
        ),
      };
    case 'MOVE':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, position: action.position } : w
        ),
      };
    default:
      return state;
  }
}

interface WindowManagerContextType {
  windows: WindowState[];
  openApp: (app: AppDefinition) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, position: Position) => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { windows: [], maxZ: 10 });

  const openApp = useCallback((app: AppDefinition) => dispatch({ type: 'OPEN', app }), []);
  const closeWindow = useCallback((id: string) => dispatch({ type: 'CLOSE', id }), []);
  const minimizeWindow = useCallback((id: string) => dispatch({ type: 'MINIMIZE', id }), []);
  const maximizeWindow = useCallback((id: string) => dispatch({ type: 'MAXIMIZE', id }), []);
  const focusWindow = useCallback((id: string) => dispatch({ type: 'FOCUS', id }), []);
  const moveWindow = useCallback(
    (id: string, position: Position) => dispatch({ type: 'MOVE', id, position }),
    []
  );

  return (
    <WindowManagerContext.Provider
      value={{ windows: state.windows, openApp, closeWindow, minimizeWindow, maximizeWindow, focusWindow, moveWindow }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager(): WindowManagerContextType {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error('useWindowManager must be used within WindowManagerProvider');
  return ctx;
}
