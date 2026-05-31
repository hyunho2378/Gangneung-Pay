import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { color, font, layout } from '../tokens/web.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';

const LINKS = [
  { label: 'Intro',         to: '/' },
  { label: 'Research',      to: '/research' },
  { label: 'Insights',      to: '/insights' },
  { label: 'Solution',      to: '/solution' },
  { label: 'Design System', to: '/design' },
  { label: 'Build',         to: '/build' },
];

const IOS_URL    = 'https://gangneung-pay.vercel.app';
const ANDROID_URL = 'https://gangneung-pay-android.vercel.app';

function navLinkStyle({ isActive }) {
  return {
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: isActive ? 700 : 500,
    color: isActive ? color.brand : color.inkMuted,
    letterSpacing: '-0.01em',
    transition: 'color 0.18s',
  };
}

function NavCTA({ href, label, primary = false, compact = false }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: compact ? '5px 10px' : '7px 16px',
        borderRadius: 100,
        fontSize: compact ? 11 : 12,
        fontWeight: 700,
        letterSpacing: '0.01em',
        textDecoration: 'none',
        transition: 'opacity 0.18s',
        background: primary ? color.brand : color.white,
        color: primary ? color.white : color.brand,
        border: `1.5px solid ${primary ? color.white : color.brand}`,
        flexShrink: 0,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      {label}
    </a>
  );
}

export default function Nav() {
  const { isMobile, isTablet } = useBreakpoint();
  const [menuOpen, setMenuOpen] = useState(false);

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
        padding: isMobile ? '0 clamp(20px,5vw,80px)' : `0 ${layout.gut}`,
      }}
    >
      <div
        style={{
          maxWidth: layout.container,
          margin: '0 auto',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        {/* Logo */}
        <NavLink
          to="/"
          style={{
            textDecoration: 'none',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src="/logos/logo-blue.svg"
            alt="강릉페이"
            style={{ height: 28, width: 'auto' }}
          />
          {!isMobile && !isTablet && (
            <span style={{
              fontSize: 13, fontWeight: 700,
              color: color.brand, marginLeft: 10,
              letterSpacing: '-0.01em', fontFamily: font.family,
            }}>
              강릉페이 UX 개선 프로젝트
            </span>
          )}
        </NavLink>

        {/* Desktop / Tablet: nav links */}
        {!isMobile && (
          <ul
            style={{
              display: 'flex',
              gap: 'clamp(10px,1.5vw,28px)',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {LINKS.map(({ label, to }) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'} style={navLinkStyle}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop / Tablet: CTA buttons */}
        {!isMobile ? (
          <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignItems: 'center' }}>
            <NavCTA href={IOS_URL} label="iOS" primary />
            <NavCTA href={ANDROID_URL} label="Android" />
          </div>
        ) : (
          /* Mobile: iOS + Android + hamburger (nav links only in dropdown) */
          <div style={{ display: 'flex', gap: 5, alignItems: 'center', flexShrink: 0 }}>
            <NavCTA href={IOS_URL} label="iOS" primary compact />
            <NavCTA href={ANDROID_URL} label="Android" compact />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 6,
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                flexShrink: 0,
              }}
            >
              <span style={{
                display: 'block', width: 20, height: 2,
                background: color.ink, borderRadius: 1,
                transition: 'transform 0.2s',
                transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              }} />
              <span style={{
                display: 'block', width: 20, height: 2,
                background: color.ink, borderRadius: 1,
                transition: 'opacity 0.2s',
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                display: 'block', width: 20, height: 2,
                background: color.ink, borderRadius: 1,
                transition: 'transform 0.2s',
                transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              }} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile: dropdown — nav links only */}
      {isMobile && menuOpen && (
        <div
          style={{
            background: color.bgAlpha,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: `1px solid ${color.line}`,
            padding: `12px ${layout.gut} 20px`,
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {LINKS.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '12px 0',
                    textDecoration: 'none',
                    fontSize: 15,
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? color.brand : color.ink,
                    letterSpacing: '-0.01em',
                    borderBottom: `1px solid ${color.line}`,
                  })}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
