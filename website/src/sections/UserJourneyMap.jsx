import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const STAGES = [
  {
    step: '01',
    name: '진입',
    action: '앱 실행 / 잔액 확인',
    problem: '홈 로딩 지연. 잔액 즉시 안 보임.',
    improve: '홈 최상단 잔액 카드 + 위젯 지원',
    emotion: 0.55,
  },
  {
    step: '02',
    name: '상태 파악',
    action: '캐시백·잔액 확인',
    problem: '충전잔액 vs 캐시백 구분 불명확.',
    improve: '색상·레이블로 명확히 분리',
    emotion: 0.3,
  },
  {
    step: '03',
    name: '충전',
    action: '금액 입력 → 결제',
    problem: '6단계 인지 부하. 매번 반복.',
    improve: '3단계 압축 + 빠른금액 칩',
    emotion: 0.15,
  },
  {
    step: '04',
    name: '결제',
    action: '가맹점 바코드/카드',
    problem: '계산대 앞 잔액 부족 → 당황.',
    improve: '잔액 부족 사전 알림 차단',
    emotion: 0.45,
  },
  {
    step: '05',
    name: '확인',
    action: '내역 조회 / 환불',
    problem: '환불 메뉴 4인 전원 탐색 실패.',
    improve: '2탭 이내 환불 접근 동등 위계',
    emotion: 0.65,
  },
];

const SVG_W = 100;
const SVG_H = 64;

function buildPath(points) {
  return points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cpX = (prev.x + pt.x) / 2;
    return `${acc} C ${cpX} ${prev.y}, ${cpX} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');
}

export default function UserJourneyMap() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [mapRef, mapVisible] = useReveal({ threshold: 0.03 });

  const pts = STAGES.map((s, i) => ({
    x: (i / (STAGES.length - 1)) * SVG_W,
    y: SVG_H - s.emotion * SVG_H,
  }));

  const pathD = buildPath(pts);

  return (
    <section
      id="journey"
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
            marginBottom: 'clamp(48px,6vw,80px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px',
          }}>
            USER JOURNEY MAP
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: 0, maxWidth: '28ch',
          }}>
            사용자가 겪는 5단계 여정과 마찰점
          </h2>
        </div>

        {/* Journey map */}
        <div
          ref={mapRef}
          style={{
            opacity: mapVisible ? 1 : 0,
            transform: mapVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            overflowX: 'auto',
          }}
        >
          {/* Stage columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${STAGES.length}, 1fr)`,
            gap: 2,
            minWidth: 560,
          }}>
            {STAGES.map(({ step, name, action, problem, improve }, i) => (
              <div
                key={step}
                style={{
                  background: color.white,
                  borderRadius: i === 0
                    ? `${layout.rMd} 0 0 0`
                    : i === STAGES.length - 1
                    ? `0 ${layout.rMd} 0 0`
                    : 0,
                  padding: 'clamp(16px,2vw,24px)',
                  borderRight: i < STAGES.length - 1 ? `2px solid ${color.bg}` : 'none',
                  opacity: mapVisible ? 1 : 0,
                  transform: mapVisible ? 'none' : 'translateY(16px)',
                  transition: `opacity 0.55s ease-out ${i * 0.07}s, transform 0.55s ease-out ${i * 0.07}s`,
                }}
              >
                <p style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: color.brand,
                  margin: '0 0 6px', fontFamily: font.family,
                }}>
                  STAGE {step}
                </p>
                <h4 style={{
                  fontSize: 'clamp(15px,1.6vw,20px)', fontWeight: 800,
                  lineHeight: 1.2, letterSpacing: '-0.01em',
                  color: color.ink, margin: '0 0 6px',
                  fontFamily: font.family,
                }}>
                  {name}
                </h4>
                <p style={{
                  fontSize: 12, color: color.inkFaint,
                  lineHeight: 1.5, margin: '0 0 16px',
                  fontFamily: font.family,
                }}>
                  {action}
                </p>

                <p style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: color.warn,
                  margin: '0 0 4px', fontFamily: font.family,
                }}>
                  PROBLEM
                </p>
                <p style={{
                  fontSize: 12, lineHeight: 1.5,
                  color: color.inkMuted, margin: '0 0 14px',
                  fontFamily: font.family,
                }}>
                  {problem}
                </p>

                <p style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: color.brand,
                  margin: '0 0 4px', fontFamily: font.family,
                }}>
                  IMPROVE
                </p>
                <p style={{
                  fontSize: 12, lineHeight: 1.5,
                  color: color.inkMuted, margin: 0,
                  fontFamily: font.family,
                }}>
                  {improve}
                </p>
              </div>
            ))}
          </div>

          {/* Emotion curve */}
          <div
            style={{
              background: color.white,
              borderRadius: `0 0 ${layout.rMd} ${layout.rMd}`,
              padding: 'clamp(16px,2vw,24px) clamp(16px,2vw,24px) clamp(20px,2.5vw,28px)',
              minWidth: 560,
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}>
              <p style={{
                fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: color.inkFaint,
                margin: 0, fontFamily: font.family,
              }}>
                EMOTION CURVE
              </p>
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 10, color: color.inkFaint, fontFamily: font.family }}>
                  낮음 (부정)
                </span>
                <span style={{ fontSize: 10, color: color.brand, fontWeight: 700, fontFamily: font.family }}>
                  높음 (긍정)
                </span>
              </div>
            </div>

            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              preserveAspectRatio="none"
              style={{ width: '100%', height: 56, display: 'block' }}
              aria-hidden="true"
            >
              {/* Gridlines */}
              {[0.25, 0.5, 0.75].map((v) => (
                <line
                  key={v}
                  x1="0" y1={SVG_H - v * SVG_H}
                  x2={SVG_W} y2={SVG_H - v * SVG_H}
                  stroke={color.line}
                  strokeWidth="0.4"
                />
              ))}
              {/* Filled area under curve */}
              <path
                d={`${pathD} L ${pts[pts.length - 1].x} ${SVG_H} L 0 ${SVG_H} Z`}
                fill={color.brandPale}
                opacity="0.6"
              />
              {/* Curve line */}
              <path
                d={pathD}
                fill="none"
                stroke={color.brand}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Data points */}
              {pts.map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="2.5"
                  fill={color.white}
                  stroke={color.brand}
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
