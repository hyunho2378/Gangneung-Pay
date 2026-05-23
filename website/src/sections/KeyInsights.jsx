import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const INSIGHTS = [
  {
    num: '01',
    eyebrow: 'Key Insight 01',
    headline: ['결제 앱이 아니라', '잔액 확인 앱으로 축소됐습니다.'],
    body: '사용자들은 결제를 위해 앱을 열지 않습니다. 계산대에서 망신당하지 않기 위해 미리 잔액을 확인하고 안심하는 루틴. 실제 결제는 실물카드로 수행되며, 앱은 불안 해소 창구로 기능이 축소되어 있습니다.',
    quote: '식당 자리에서 먼저 확인하고 본 다음에 안심하고 갑니다',
    attribution: '인터뷰 A2',
    ur: ['UR-U01'],
    stat: null,
    bgColor: color.bg,
  },
  {
    num: '02',
    eyebrow: 'Key Insight 02',
    headline: ['시니어에게 앱 실행 자체가', '결제 장벽입니다.'],
    body: '주사용층인 40~60대 시니어는 앱 결제보다 실물카드를 훨씬 선호합니다. 결제 전 잔액을 확인하기 위해 반드시 앱을 열어야 하는 과정이 부담으로 작용합니다.',
    quote: '로딩이 길어서 삼성페이로 한 경험이 있습니다',
    attribution: '인터뷰 A1',
    ur: ['UR-U01', 'UR-U05'],
    stat: { value: '62.5%', label: '이 계산대 당황을 경험했습니다' },
    bgColor: color.white,
  },
  {
    num: '03',
    eyebrow: 'Key Insight 03',
    headline: ['충전은 복잡하고,', '환불은 더 어렵습니다.'],
    body: '관찰 참여자 4인 전원이 환불 메뉴를 끝내 찾지 못했습니다. 기능이 존재하더라도 발견할 수 없으면 UX상 존재하지 않는 것입니다.',
    quote: '그런 기능이 있습니까? 금시초문입니다',
    attribution: '인터뷰 A2',
    ur: ['UR-U03', 'UR-F01'],
    stat: { value: '4인 전원', label: '환불 메뉴 탐색 실패' },
    bgColor: color.bg,
  },
];

export default function KeyInsights() {
  const [ref1, vis1] = useReveal({ threshold: 0.05 });
  const [ref2, vis2] = useReveal({ threshold: 0.05 });
  const [ref3, vis3] = useReveal({ threshold: 0.05 });

  const refs = [[ref1, vis1], [ref2, vis2], [ref3, vis3]];

  return (
    <section id="insights">
      {INSIGHTS.map(({ num, eyebrow, headline, body, quote, attribution, ur, stat, bgColor }, i) => {
        const [ref, vis] = refs[i];

        return (
          <div
            key={num}
            style={{
              background: bgColor,
              overflow: 'hidden',
              padding: `${layout.sectionY} clamp(20px,5vw,80px)`,
            }}
          >
            <div
              style={{
                maxWidth: layout.container,
                margin: '0 auto',
                position: 'relative',
              }}
            >
              {/* Background number — brand color at 8% opacity */}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-0.1em',
                  left: '-0.05em',
                  fontSize: 'clamp(100px,14vw,200px)',
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.05em',
                  color: color.brand,
                  opacity: 0.08,
                  zIndex: 0,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  fontFamily: font.family,
                }}
              >
                {num}
              </span>

              {/* Content */}
              <div
                ref={ref}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  opacity: vis ? 1 : 0,
                  transform: vis ? 'none' : 'translateY(28px)',
                  transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                }}
              >
                {/* Eyebrow */}
                <p
                  style={{
                    fontSize: t.eyebrow.size,
                    fontWeight: t.eyebrow.weight,
                    letterSpacing: t.eyebrow.ls,
                    textTransform: t.eyebrow.transform,
                    color: color.brand,
                    margin: '0 0 24px',
                    fontFamily: font.family,
                  }}
                >
                  {eyebrow}
                </p>

                {/* Headline */}
                <h2
                  style={{
                    fontSize: 'clamp(32px,4vw,60px)',
                    fontWeight: 800,
                    lineHeight: 1.22,
                    letterSpacing: '-0.03em',
                    color: color.ink,
                    margin: '0 0 28px',
                    fontFamily: font.family,
                  }}
                >
                  {headline[0]}
                  <br />
                  {headline[1]}
                </h2>

                {/* Body */}
                <p
                  style={{
                    fontSize: t.body.size,
                    fontWeight: t.body.weight,
                    lineHeight: t.body.lh,
                    color: color.inkMuted,
                    margin: '0 0 32px',
                    maxWidth: 560,
                    fontFamily: font.family,
                  }}
                >
                  {body}
                </p>

                {/* Stat highlight — INSIGHT 02, 03 only */}
                {stat && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 'clamp(12px,1.5vw,20px)',
                      flexWrap: 'wrap',
                      margin: '0 0 clamp(28px,3vw,40px)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'clamp(80px,10vw,140px)',
                        fontWeight: 800,
                        lineHeight: 1,
                        letterSpacing: '-0.04em',
                        color: color.brand,
                        fontFamily: font.family,
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontSize: t.lead.size,
                        fontWeight: 500,
                        lineHeight: 1.4,
                        color: color.inkMuted,
                        maxWidth: '12ch',
                        fontFamily: font.family,
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                )}

                {/* Quote */}
                <div
                  style={{
                    borderLeft: `3px solid ${color.brand}`,
                    paddingLeft: 'clamp(16px,2vw,24px)',
                    margin: '0 0 28px',
                  }}
                >
                  <p
                    style={{
                      fontSize: t.lead.size,
                      fontWeight: 500,
                      lineHeight: 1.65,
                      color: color.ink,
                      fontStyle: 'italic',
                      margin: '0 0 8px',
                      maxWidth: '40ch',
                      fontFamily: font.family,
                    }}
                  >
                    &ldquo;{quote}&rdquo;
                  </p>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: color.inkFaint,
                      letterSpacing: '0.04em',
                      fontFamily: font.family,
                    }}
                  >
                    — {attribution}
                  </span>
                </div>

                {/* UR connection tags */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {ur.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: color.brandPale,
                        color: color.brand,
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '4px 10px',
                        borderRadius: 100,
                        fontFamily: font.family,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
