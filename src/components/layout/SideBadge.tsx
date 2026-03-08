export function SideBadge() {
  return (
    <div
      className="side-badge hidden md:block"
      style={{
        position: 'fixed',
        left: '-65px',
        top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        transformOrigin: 'center',
        zIndex: 9999,
      }}
    >
      <a
        href="https://nextdeveloper.in"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: '#0f172a',
          color: 'white',
          padding: '10px 18px',
          fontSize: '14px',
          fontFamily: 'system-ui, sans-serif',
          textDecoration: 'none',
          borderRadius: '8px 8px 0 0',
          boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
          transition: 'all 0.3s ease',
          display: 'inline-block',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#7c3aed';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#0f172a';
        }}
      >
        Created with Next Developer
      </a>
    </div>
  );
}
