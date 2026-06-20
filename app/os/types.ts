export type AppId = 'about' | 'resume' | 'projects' | 'terminal' | 'browser' | 'snake' | '2048' | 'leaderboard' | 'racer' | 'calculator' | 'notes';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  icon: string;
  position: Position;
  size: Size;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface AppDefinition {
  id: AppId;
  title: string;
  icon: string;
  defaultSize: Size;
  description: string;
}
