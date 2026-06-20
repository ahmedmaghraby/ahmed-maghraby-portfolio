export default function TerminalApp() {
  return (
    <div className="h-full flex flex-col items-center justify-center" style={{ background: '#06090f' }}>
      <div className="text-center space-y-3 font-mono">
        <div className="text-5xl" style={{ opacity: 0.25 }}>⌨️</div>
        <div style={{ fontSize: 11, color: 'rgba(74,243,255,0.35)', letterSpacing: '0.4em' }}>
          LOADING MODULE
        </div>
        <div style={{ fontSize: 10, color: 'rgba(245,211,147,0.22)', letterSpacing: '0.3em' }}>
          terminal.app
        </div>
      </div>
    </div>
  );
}
