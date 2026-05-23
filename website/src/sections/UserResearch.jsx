import { color, font, type as t, layout } from '../tokens/web.js';
import { useCountUp } from '../lib/useCountUp.js';
import { useReveal } from '../lib/useReveal.js';

const METHODS = [
  {
    label: '설문 응답자',
    desc: '온라인 설문 · 19~26세 85.3% · 강릉거주 25%',
  },
  {
    label: '심층 인터뷰 (IDI)',
    desc: '4050 헤비유저 2 · 2030 이탈자 2 · 소상공인 2',
  },
  {
    label: '서비스 사파리 관찰',
    desc: '강릉 현장 관찰 · 20대女 2 · 50대男 1 · 50대女 1',
  },
];

export default function UserResearch() {
  const [ref68, val68] = useCountUp(68, 1500);
  const [ref6, val6] = useCountUp(6, 1200);
  const [ref4, val4] = useCountUp(4, 900);
  const [headRef, headVisible] = useReveal({ threshold: 0.1 });
  const [metaRef, metaVisible] = useReveal({ threshold: 0.1 });

  const STATS = [
    { countRef: ref68, value: val68, ...METHODS[0] },
    { countRef: ref6, value: val6, ...METHODS[1] },
    { countRef: ref4, value: val4, ...METHODS[2] },
  ];

  return (
    <section
      id="user-research"
      style={{
        background: color.white,
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
            marginBottom: 'clamp(48px,6vw,80px)',
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
            User Research
          </p>
          <h2
            style={{
              fontSize: t.h1.size,
              fontWeight: t.h1.weight,
              lineHeight: t.h1.lh,
              letterSpacing: t.h1.ls,
              color: color.ink,
              margin: 0,
              maxWidth: '22ch',
            }}
          >
            세 가지 방법으로 사용자를 만났습니다.
          </h2>
        </div>

        {/* 3 countup stats */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(32px,5vw,80px)',
            flexWrap: 'wrap',
            marginBottom: 'clamp(48px,5vw,72px)',
          }}
        >
          {STATS.map(({ countRef, value, label, desc }) => (
            <div key={label} style={{ flex: 1, minWidth: 180 }}>
              <div
                ref={countRef}
                style={{
                  fontSize: 'clamp(60px,8vw,120px)',
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: color.brand,
                  fontFamily: font.family,
                  marginBottom: 12,
                }}
              >
                {value}
              </div>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: color.inkMuted,
                  margin: '0 0 8px',
                  letterSpacing: '-0.01em',
                  fontFamily: font.family,
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: color.inkFaint,
                  margin: 0,
                  fontFamily: font.family,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* 조사기간 */}
        <div
          ref={metaRef}
          style={{
            opacity: metaVisible ? 1 : 0,
            transform: metaVisible ? 'none' : 'translateY(16px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: color.inkFaint,
              fontFamily: font.family,
            }}
          >
            조사기간
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: color.inkMuted,
              letterSpacing: '-0.01em',
              fontFamily: font.family,
            }}
          >
            2026.03.29 — 04.06
          </span>
        </div>

      </div>
    </section>
  );
}
