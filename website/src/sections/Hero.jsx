import { color, font, type as t, layout } from '../tokens/web.js';
import { useParallax } from '../lib/useParallax.js';
import { useReveal } from '../lib/useReveal.js';
import { useCountUp } from '../lib/useCountUp.js';

const META = [
  { label: 'PROJECT', value: '강릉페이 UX 개선' },
  { label: 'TEAM', value: '마카모예' },
  { label: 'PERIOD', value: '2026.03 ~ 2026.06' },
  { label: 'TOOL', value: 'Figma · Antigravity · Claude Code · Vercel · Neon DB' },
];

const STATS = [
  { label: 'SCREENS', value: 30, suffix: '' },
  { label: 'COMPONENTS', value: 70, suffix: '+' },
  { label: 'STORES', value: 13021, suffix: '' },
];

const IOS_URL = 'https://gangneung-pay.vercel.app';
const ANDROID_URL = 'https://gangneung-pay-android.vercel.app';

export default function Hero() {
  const phonesRef = useParallax(0.07);
  const [textRef, textVisible] = useReveal({ threshold: 0.05 });
  const [metaRef, metaVisible] = useReveal({ threshold: 0.1 });

  return (
    <section
      id="hero"
      style={{
        minHeight: '100svh',
        background: color.bg,
        fontFamily: font.family,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          flex: 1,
          maxWidth: layout.container,
          width: '100%',
          margin: '0 auto',
          padding: `${layout.gut} clamp(20px,5vw,80px) 0`,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
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
              margin: '0 0 28px',
              whiteSpace: 'pre-line',
            }}
          >
            {'내 돈이\n내 편인 앱'}
          </h1>

          <p
            style={{
              fontSize: t.lead.size,
              fontWeight: t.lead.weight,
              lineHeight: t.lead.lh,
              color: color.inkMuted,
              margin: '0 0 40px',
              maxWidth: 420,
            }}
          >
            강릉시 지역화폐 강릉페이의 UX/UI를 전면 개선했습니다.
            리서치에서 구현까지, 논리가 화면이 되는 과정.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <HeroCTA href={IOS_URL} label="iOS 보기" primary />
            <HeroCTA href={ANDROID_URL} label="Android 보기" />
          </div>
        </div>

        {/* RIGHT: 폰 2대 — flex로 겹침 */}
        <div
          ref={phonesRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(40px,4vw,60px) 0',
          }}
          aria-hidden="true"
        >
          {/* iOS — 크게, 앞에 (z-index 2), rotate -6deg */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              transform: 'rotate(-6deg)',
              flexShrink: 0,
            }}
          >
            <PhoneMock variant="ios" />
          </div>
          {/* Android — 작게, 뒤에 (z-index 1), iOS 오른쪽+40px위 */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              transform: 'translateY(-40px) rotate(8deg)',
              marginLeft: 'clamp(-100px,-8vw,-60px)',
              flexShrink: 0,
            }}
          >
            <PhoneMock variant="android" />
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
        <div
          style={{
            maxWidth: layout.container,
            margin: '0 auto',
            padding: 'clamp(24px,3vw,40px) clamp(20px,5vw,80px)',
          }}
        >
          {/* 상단: 수치 3개 — 큰 숫자 + countUp */}
          <div
            style={{
              display: 'flex',
              gap: 'clamp(32px,5vw,80px)',
              flexWrap: 'wrap',
              marginBottom: 'clamp(20px,2vw,28px)',
            }}
          >
            {STATS.map((s) => (
              <StatCountUp key={s.label} target={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>

          {/* 구분선 */}
          <div
            style={{
              height: 1,
              background: color.brandAlt,
              marginBottom: 'clamp(16px,2vw,24px)',
              opacity: 0.5,
            }}
          />

          {/* 하단: 텍스트 메타 */}
          <div
            style={{
              display: 'flex',
              gap: 'clamp(24px,4vw,64px)',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
            }}
          >
            <p
              style={{
                fontSize: t.eyebrow.size,
                fontWeight: t.eyebrow.weight,
                letterSpacing: t.eyebrow.ls,
                textTransform: t.eyebrow.transform,
                color: color.whiteA60,
                margin: 0,
                flexShrink: 0,
                alignSelf: 'center',
              }}
            >
              Project Detail
            </p>
            {META.map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0em',
                    textTransform: 'uppercase',
                    color: color.whiteA50,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: color.white,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
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
        padding: 'clamp(12px,1.2vw,16px) clamp(20px,2vw,28px)',
        borderRadius: 100,
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: '-0.01em',
        textDecoration: 'none',
        transition: 'opacity 0.18s, transform 0.18s',
        background: primary ? color.brand : 'transparent',
        color: primary ? color.white : color.ink,
        border: `2px solid ${primary ? color.brand : color.line}`,
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

function PhoneMock({ variant }) {
  const isIos = variant === 'ios';
  const w = isIos ? 'clamp(240px,20vw,340px)' : 'clamp(210px,17vw,290px)';
  const h = isIos ? 'clamp(518px,43.2vw,734px)' : 'clamp(453px,36.7vw,626px)';
  const r = isIos ? '28px' : '22px';

  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: r,
        border: `5px solid ${color.ink}`,
        background: color.white,
        boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      {isIos && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 76,
            height: 20,
            borderRadius: 12,
            background: color.ink,
            zIndex: 2,
          }}
        />
      )}

      <div
        style={{
          width: '100%',
          height: '100%',
          background: color.brandSky,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: color.brand,
              margin: '0 auto 10px',
            }}
          />
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: color.inkMuted,
              margin: 0,
              letterSpacing: '0.06em',
            }}
          >
            {isIos ? 'iOS' : 'Android'}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCountUp({ target, suffix, label }) {
  const [ref, value] = useCountUp(target, 1500);
  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
        <span
          style={{
            fontSize: 'clamp(28px,2.5vw,40px)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: color.white,
            fontFamily: font.family,
          }}
        >
          {value.toLocaleString()}
        </span>
        {suffix && (
          <span
            style={{
              fontSize: 'clamp(20px,1.8vw,28px)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: color.white,
            }}
          >
            {suffix}
          </span>
        )}
      </div>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0em',
          textTransform: 'uppercase',
          color: color.whiteA50,
        }}
      >
        {label}
      </span>
    </div>
  );
}
