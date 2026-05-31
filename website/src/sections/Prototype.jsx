import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';

const LINKS = [
  {
    label: 'iOS 버전',
    sub: 'iPhone, Face ID, HIG',
    href: 'https://gangneung-pay.vercel.app',
    accent: color.brand,
    primary: true,
  },
  {
    label: 'Android 버전',
    sub: 'Galaxy, Fingerprint, Google Material 3',
    href: 'https://gangneung-pay-android.vercel.app',
    accent: color.brand,
    primary: false,
  },
];

export default function Prototype() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [ctaRef, ctaVisible] = useReveal({ threshold: 0.05 });
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="prototype"
      style={{
        background: color.bg,
        fontFamily: font.family,
        padding: `${layout.sectionY} clamp(20px,5vw,80px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={headRef}
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 'clamp(56px,7vw,96px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px', fontFamily: font.family,
          }}>
            PROTOTYPE
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: '0 0 16px', fontFamily: font.family,
            wordBreak: 'keep-all',
          }}>
            iOS와 Android 버전을 직접 사용해 보세요.
          </h2>
          <p style={{
            fontSize: t.lead.size, fontWeight: 500,
            lineHeight: t.lead.lh, color: color.inkMuted,
            margin: 0, fontFamily: font.family,
          }}>
            iOS, Android 플랫폼별 실제 작동 프로토타입
          </p>
        </div>

        {/* CTA pair */}
        <div
          ref={ctaRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
            gap: 'clamp(20px,3vw,48px)',
          }}
        >
          {LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                textDecoration: 'none',
                opacity: ctaVisible ? 1 : 0,
                transform: ctaVisible ? 'none' : 'translateY(24px)',
                transition: `opacity 0.65s ease-out ${i * 0.1}s, transform 0.65s ease-out ${i * 0.1}s`,
              }}
            >
              <div style={{
                width: '100%',
                background: color.white,
                borderRadius: layout.rMd,
                padding: 'clamp(28px,3.5vw,48px) clamp(24px,3vw,40px)',
                boxShadow: '0 8px 40px rgba(29,78,216,0.12), 0 2px 8px rgba(0,0,0,0.06)',
                transition: 'box-shadow 0.2s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.10)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <p style={{
                  fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                  letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                  color: link.accent, margin: '0 0 16px', fontFamily: font.family,
                }}>
                  {link.sub}
                </p>
                <p style={{
                  fontSize: 'clamp(24px,2.8vw,40px)', fontWeight: 800,
                  lineHeight: 1.22, letterSpacing: '-0.02em',
                  color: color.ink, margin: '0 0 32px', fontFamily: font.family,
                }}>
                  {link.label}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  background: link.primary ? color.brand : color.white,
                  border: `2px solid ${link.primary ? color.white : color.brand}`,
                  borderRadius: '999px',
                  color: link.primary ? color.white : color.brand,
                  fontSize: 14, fontWeight: 700,
                  fontFamily: font.family,
                  letterSpacing: '0.04em',
                }}>
                  확인하기
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
