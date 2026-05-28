import { useState } from 'react';
import { color, font, layout } from '../tokens/web.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';

const LINKS = [
  { label: 'Discover', href: '#research' },
  { label: 'Define', href: '#affinity' },
  { label: 'Develop', href: '#direction' },
  { label: 'Deliver', href: '#key-screens' },
];

const IOS_URL = 'https://gangneung-pay.vercel.app';
const ANDROID_URL = 'https://gangneung-pay-android.vercel.app';

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
        padding: '0 clamp(20px,5vw,80px)',
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
          gap: 24,
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
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
        </a>

        {/* Desktop / Tablet: nav links */}
        {!isMobile && (
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
        )}

        {/* Desktop / Tablet: CTA buttons */}
        {!isMobile ? (
          <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignItems: 'center' }}>
            <NavCTA href={IOS_URL} label="iOS" primary />
            <NavCTA href={ANDROID_URL} label="Android" />
            {!isTablet && (
              <a
                href="https://github.com/hyunho2378/Gangneung-Pay"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 16px',
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                  textDecoration: 'none',
                  transition: 'opacity 0.18s',
                  background: color.white,
                  color: color.brand,
                  border: `1.5px solid ${color.brand}`,
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Github
              </a>
            )}
          </div>
        ) : (
          /* Mobile: iOS CTA + hamburger */
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <NavCTA href={IOS_URL} label="iOS" primary />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
              }}
            >
              <span style={{
                display: 'block', width: 22, height: 2,
                background: color.ink, borderRadius: 1,
                transition: 'transform 0.2s',
                transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }} />
              <span style={{
                display: 'block', width: 22, height: 2,
                background: color.ink, borderRadius: 1,
                transition: 'opacity 0.2s',
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                display: 'block', width: 22, height: 2,
                background: color.ink, borderRadius: 1,
                transition: 'transform 0.2s',
                transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile: dropdown menu */}
      {isMobile && menuOpen && (
        <div
          style={{
            background: color.bgAlpha,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: `1px solid ${color.line}`,
            padding: '12px clamp(20px,5vw,80px) 20px',
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '12px 0',
                    textDecoration: 'none',
                    fontSize: 15,
                    fontWeight: 600,
                    color: color.ink,
                    letterSpacing: '-0.01em',
                    borderBottom: `1px solid ${color.line}`,
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <NavCTA href={ANDROID_URL} label="Android" />
            <a
              href="https://github.com/hyunho2378/Gangneung-Pay"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 16px',
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 700,
                textDecoration: 'none',
                background: color.white,
                color: color.brand,
                border: `1.5px solid ${color.brand}`,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Github
            </a>
          </div>
        </div>
      )}
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
        background: primary ? color.brand : color.white,
        color: primary ? color.white : color.brand,
        border: `1.5px solid ${primary ? color.white : color.brand}`,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      {label}
    </a>
  );
}
