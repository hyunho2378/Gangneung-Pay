import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const MISSIONS = [
  { num: '01', name: '환불 찾기', result: '4인 전원 실패', quote: '인용 추후 기입' },
  { num: '02', name: '공지 + 가맹점 탐색', result: '혼선 반복', quote: '인용 추후 기입' },
  { num: '03', name: '토스 vs 강릉페이 비교', result: '금융앱 멘탈모델 괴리', quote: '인용 추후 기입' },
  { num: '04', name: '강릉머니 찾기', result: '4인 전원 미인지', quote: '인용 추후 기입' },
  { num: '05', name: '자유 탐색', result: 'B2B 메뉴 혼재', quote: '인용 추후 기입' },
];

const KEY_STATS = [
  { value: '0', unit: '명', label: '환불 미션 성공자' },
  { value: '0', unit: '명', label: '강릉머니 인지자' },
  { value: '62.5', unit: '%', label: '계산대 당황 경험' },
];

export default function ServiceSafari() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [listRef, listVisible] = useReveal({ threshold: 0.03 });
  const [statsRef, statsVisible] = useReveal({ threshold: 0.1 });

  return (
    <section
      id="safari"
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
            marginBottom: 'clamp(40px,5vw,64px)',
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
            Service Safari
          </p>
          <h2
            style={{
              fontSize: t.h1.size,
              fontWeight: t.h1.weight,
              lineHeight: t.h1.lh,
              letterSpacing: t.h1.ls,
              color: color.ink,
              margin: 0,
            }}
          >
            사용자의 손가락이 멈추는 곳을 기록했습니다.
          </h2>
        </div>

        {/* Mission list */}
        <div
          ref={listRef}
          style={{
            opacity: listVisible ? 1 : 0,
            transform: listVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 'clamp(8px,1.5vw,16px)',
            marginBottom: 'clamp(56px,6vw,88px)',
          }}
        >
          {MISSIONS.map(({ num, name, result, quote }, i) => (
            <div
              key={num}
              style={{
                background: color.white,
                borderRadius: layout.rMd,
                padding: 'clamp(12px,1.5vw,20px)',
                boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
              }}
            >
              {/* Mission number */}
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: color.brand,
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                  fontFamily: font.family,
                  marginBottom: 8,
                  display: 'block',
                }}
              >
                {num}
              </span>

              {/* Content */}
              <div style={{ marginTop: 4 }}>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: t.h3.weight,
                    lineHeight: t.h3.lh,
                    letterSpacing: t.h3.ls,
                    color: color.ink,
                    margin: '0 0 8px',
                  }}
                >
                  {name}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: color.inkMuted,
                    letterSpacing: '-0.01em',
                    margin: '0 0 10px',
                    fontFamily: font.family,
                  }}
                >
                  {result}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: 1.6,
                    color: color.inkMuted,
                    fontStyle: 'italic',
                    margin: 0,
                    fontFamily: font.family,
                  }}
                >
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Key stats */}
        <div
          ref={statsRef}
          style={{
            opacity: statsVisible ? 1 : 0,
            transform: statsVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            display: 'flex',
            gap: 'clamp(32px,5vw,80px)',
            flexWrap: 'wrap',
          }}
        >
          {KEY_STATS.map(({ value, unit, label }) => (
            <div key={label} style={{ flex: 1, minWidth: 140 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 3,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 'clamp(40px,5vw,72px)',
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    color: color.brand,
                    fontFamily: font.family,
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontSize: 'clamp(24px,3vw,40px)',
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    color: color.brand,
                    fontFamily: font.family,
                  }}
                >
                  {unit}
                </span>
              </div>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: color.inkMuted,
                  margin: 0,
                  letterSpacing: '-0.01em',
                  fontFamily: font.family,
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
