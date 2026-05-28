import { color, font, type as t, layout } from '../tokens/web.js';
import { useParallax } from '../lib/useParallax.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';
import hero1Img from '../assets/hero-1.png';

const META = [
  { label: 'PROJECT', value: '강릉페이 UX 개선' },
  { label: 'TEAM', value: '마카모예' },
  { label: 'PERIOD', value: '2026.03 ~ 2026.06' },
  { label: 'TOOL', value: 'Figma, Antigravity, Claude Code, Vercel, Neon DB' },
];

const IOS_URL = 'https://gangneung-pay.vercel.app';
const ANDROID_URL = 'https://gangneung-pay-android.vercel.app';
const GITHUB_URL = 'https://github.com/hyunho2378/Gangneung-Pay';

export default function Hero() {
  const imgRef = useParallax(0.05);
  const [textRef, textVisible] = useReveal({ threshold: 0.05 });
  const [metaRef, metaVisible] = useReveal({ threshold: 0.1 });
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="hero"
      style={{
        background: color.bg,
        fontFamily: font.family,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: `clamp(48px,5vw,72px) clamp(20px,5vw,80px) clamp(32px,4vw,56px)` }}>
        <div
          style={{
            maxWidth: layout.container,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 'clamp(32px,4vw,80px)',
            alignItems: 'center',
          }}
        >
          {/* LEFT: 텍스트 */}
          <div
            ref={textRef}
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? 'none' : 'translateY(28px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            }}
          >
            <p
              style={{
                fontSize: t.eyebrow.size,
                fontWeight: t.eyebrow.weight,
                letterSpacing: t.eyebrow.ls,
                textTransform: t.eyebrow.transform,
                color: color.brand,
                margin: '0 0 24px',
              }}
            >
              UX Project
            </p>

            <h1
              style={{
                fontSize: t.display.size,
                fontWeight: t.display.weight,
                lineHeight: t.display.lh,
                letterSpacing: t.display.ls,
                color: color.ink,
                margin: '0 0 20px',
                wordBreak: 'keep-all',
              }}
            >
              내 돈이 내 편인 앱, <span style={{ color: color.brand }}>강릉페이</span>
            </h1>

            <p
              style={{
                fontSize: t.lead.size,
                fontWeight: t.lead.weight,
                lineHeight: t.lead.lh,
                color: color.inkMuted,
                margin: '0 0 28px',
                wordBreak: 'keep-all',
              }}
            >
              강릉 시민을 위한 로컬 결제 경험 개선 프로젝트
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <HeroCTA href={IOS_URL} label="iOS 보기" primary />
              <HeroCTA href={ANDROID_URL} label="Android 보기" />
              <HeroCTA href={GITHUB_URL} icon />
            </div>
          </div>

          {/* RIGHT: 히어로 이미지 (모바일에서도 표시) */}
          <div
            ref={isMobile ? null : imgRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-hidden="true"
          >
            <img
              src={hero1Img}
              alt="강릉페이 앱 화면"
              style={{
                width: '100%',
                maxWidth: isMobile ? '320px' : 'clamp(420px,54vw,780px)',
                transform: isMobile ? 'none' : 'translateX(8%)',
                height: 'auto',
                display: 'block',
                margin: isMobile ? '0 auto' : undefined,
              }}
            />
          </div>
        </div>
      </div>

      {/* 하단: PROJECT DETAIL 메타블록 */}
      <div
        ref={metaRef}
        style={{
          background: color.brand,
          width: '100%',
          opacity: metaVisible ? 1 : 0,
          transform: metaVisible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
        }}
      >
        <div style={{ padding: 'clamp(24px,3vw,40px) clamp(20px,5vw,80px)' }}>
          <div
            style={{
              maxWidth: layout.container,
              margin: '0 auto',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'auto repeat(4, 1fr)',
                gap: 'clamp(16px,2.5vw,40px)',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {!isMobile && (
                <p
                  style={{
                    fontSize: t.eyebrow.size,
                    fontWeight: t.eyebrow.weight,
                    letterSpacing: t.eyebrow.ls,
                    textTransform: t.eyebrow.transform,
                    color: color.whiteA60,
                    margin: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Project Detail
                </p>
              )}
              {META.map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      color: color.white,
                      opacity: 0.7,
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: isMobile ? 15 : 18,
                      fontWeight: 700,
                      color: color.white,
                      letterSpacing: '-0.01em',
                      wordBreak: 'keep-all',
                      lineHeight: 1.3,
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCTA({ href, label, primary = false, icon = false }) {
  if (icon) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          minHeight: 44,
          padding: 'clamp(12px,1.2vw,16px) clamp(20px,2vw,28px)',
          borderRadius: 100,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '-0.01em',
          textDecoration: 'none',
          transition: 'opacity 0.18s, transform 0.18s',
          background: color.white,
          color: color.brand,
          border: `2px solid ${color.brand}`,
          fontFamily: font.family,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.82';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'none';
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        Github
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        minHeight: 44,
        padding: 'clamp(12px,1.2vw,16px) clamp(20px,2vw,28px)',
        borderRadius: 100,
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: '-0.01em',
        textDecoration: 'none',
        transition: 'opacity 0.18s, transform 0.18s',
        background: primary ? color.brand : color.white,
        color: primary ? color.white : color.brand,
        border: `2px solid ${primary ? color.white : color.brand}`,
        fontFamily: font.family,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.82';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.transform = 'none';
      }}
    >
      {label}
    </a>
  );
}
