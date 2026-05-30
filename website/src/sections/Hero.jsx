import { color, font, type as t, layout } from '../tokens/web.js';
import { useParallax } from '../lib/useParallax.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';
import hero1Img from '../assets/hero-1.png';

const META = [
  { label: 'PROJECT', value: '강릉페이 UX 개선' },
  { label: 'ADVISOR', value: '김성우 교수' },
  { label: 'TEAM', value: '마카모예' },
  { label: 'PERIOD', value: '2026.03 ~ 2026.06' },
  { label: 'TOOL', value: 'Figma, Antigravity, Claude Code, Vercel, Neon DB' },
];

const IOS_URL = 'https://gangneung-pay.vercel.app';
const ANDROID_URL = 'https://gangneung-pay-android.vercel.app';

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
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'auto repeat(5, 1fr)',
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
                      wordBreak: label === 'TOOL' ? 'break-word' : 'keep-all',
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

function HeroCTA({ href, label, primary = false }) {
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
