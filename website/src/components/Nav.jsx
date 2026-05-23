import { color, font, type as t, layout } from '../tokens/web.js';

const LINKS = [
  { label: 'Research', href: '#research' },
  { label: 'Insights', href: '#insights' },
  { label: 'Strategy', href: '#strategy' },
  { label: 'The Build', href: '#build' },
];

const IOS_URL = 'https://gangneung-pay.vercel.app';
const ANDROID_URL = 'https://gangneung-pay-android.vercel.app';

export default function Nav() {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: color.bgAlpha,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${color.line}`,
        fontFamily: font.family,
      }}
    >
      <div
        style={{
          maxWidth: layout.container,
          margin: '0 auto',
          padding: '0 clamp(20px,5vw,80px)',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <a
          href="#hero"
          style={{
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: 15,
            letterSpacing: '-0.02em',
            color: color.ink,
            flexShrink: 0,
          }}
        >
          강릉페이
        </a>

        <ul
          style={{
            display: 'flex',
            gap: 'clamp(16px,2.5vw,36px)',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                style={{
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 500,
                  color: color.inkMuted,
                  letterSpacing: '-0.01em',
                  transition: 'color 0.18s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = color.ink)}
                onMouseLeave={(e) => (e.currentTarget.style.color = color.inkMuted)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <NavCTA href={IOS_URL} label="iOS" />
          <NavCTA href={ANDROID_URL} label="Android" primary />
        </div>
      </div>
    </nav>
  );
}

function NavCTA({ href, label, primary = false }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '7px 16px',
        borderRadius: 100,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.01em',
        textDecoration: 'none',
        transition: 'opacity 0.18s',
        background: primary ? color.brand : 'transparent',
        color: primary ? color.white : color.ink,
        border: `1.5px solid ${primary ? color.brand : color.line}`,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      {label}
    </a>
  );
}
