'use client';

interface DesktopIconProps {
  icon: string;
  label: string;
  description: string;
  onOpen: () => void;
}

export default function DesktopIcon({ icon, label, description, onOpen }: DesktopIconProps) {
  return (
    <button
      onDoubleClick={onOpen}
      title={`Double-click to open — ${description}`}
      className="group relative flex flex-col items-center gap-1.5 px-2 pt-2 pb-2 rounded-xl cursor-default select-none w-[76px] transition-all duration-150"
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = 'rgba(245,211,147,0.08)';
        el.style.boxShadow = '0 0 0 1px rgba(245,211,147,0.14)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = 'transparent';
        el.style.boxShadow = 'none';
      }}
    >
      <span className="text-3xl transition-transform duration-150 group-hover:scale-110 drop-shadow-lg">
        {icon}
      </span>
      <span
        className="text-center leading-tight font-mono block"
        style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10 }}
      >
        {label}
      </span>
    </button>
  );
}
