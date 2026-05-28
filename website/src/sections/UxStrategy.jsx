import { useState } from 'react';
import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const STRATEGIES = [
  {
    id: 'S1', num: 'S1',
    title: '위젯 잔액 노출',
    oneliner: '앱을 열지 않아도 잔액이 보입니다',
    quote: '식당 자리에서 먼저 확인하고 본 다음에 안심하고 갑니다',
    attribution: '인터뷰 A2',
    evidence: null,
    solution: '홈 위젯과 잠금화면에서 잔액을 즉시 확인. 앱 실행 없이도 결제 전 불안을 해소합니다.',
    ur: 'UR-U01',
  },
  {
    id: 'S2', num: 'S2',
    title: '환불 동등 위계',
    oneliner: '충전과 환불을 같은 자리에 뒀습니다',
    quote: null,
    attribution: 'Service Safari 4인 전원',
    evidence: '관찰 참여자 4인 전원 환불 메뉴 탐색 실패',
    solution: '잔액 카드에 [충전 / 환불 / QR결제] 3슬롯을 동일 크기로 배치. 환불은 권리입니다.',
    ur: 'UR-U03',
  },
  {
    id: 'S3', num: 'S3',
    title: '가맹점 실시간 신뢰',
    oneliner: '13,021개 실데이터로 신뢰를 만들었습니다',
    quote: '가게 들어가서 여기 강릉페이 돼요? 라고 물어봐야',
    attribution: '인터뷰 A1',
    evidence: null,
    solution: 'konacard 실데이터 13,021개 + Google Maps 클러스터링. 12카테고리 필터 + 216개 QR매장.',
    ur: 'UR-U06',
  },
  {
    id: 'S4', num: 'S4',
    title: '코치마크 단계 안내',
    oneliner: '첫 사용자도 혼자 완주할 수 있습니다',
    quote: null,
    attribution: '인터뷰 참여자',
    evidence: '카드 신청 과정 복잡해 포기',
    solution: '카드 등록 직후 충전→환불 단계를 자동 안내. ScreenContainer 절대좌표 기반 코치마크.',
    ur: 'UR-U03',
  },
];

export default function UxStrategy() {
  const [openId, setOpenId] = useState(null);
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [listRef, listVisible] = useReveal({ threshold: 0.02 });

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      id="strategy"
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
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px',
          }}>
            UX STRATEGY
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: 0, wordBreak: 'keep-all',
          }}>
            4가지 전략으로 구체화했습니다.
          </h2>
        </div>

        {/* Accordion */}
        <div ref={listRef}>
          {STRATEGIES.map((s, i) => {
            const isOpen = openId === s.id;

            return (
              <div
                key={s.id}
                style={{
                  opacity: listVisible ? 1 : 0,
                  transform: listVisible ? 'none' : 'translateY(20px)',
                  transition: `opacity 0.6s ease-out ${i * 0.06}s, transform 0.6s ease-out ${i * 0.06}s`,
                }}
              >
                {/* Toggle row */}
                <button
                  onClick={() => toggle(s.id)}
                  aria-expanded={isOpen}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: 'clamp(18px,2.5vw,32px) 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: 'clamp(16px,2.5vw,40px)',
                  }}
                >
                  {/* Strategy number */}
                  <span style={{
                    fontSize: 'clamp(36px,4.5vw,64px)',
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    color: color.brand,
                    flexShrink: 0,
                    width: '2.5ch',
                    fontFamily: font.family,
                  }}>
                    {s.num}
                  </span>

                  {/* Title + oneliner */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: t.h3.size, fontWeight: t.h3.weight,
                      lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
                      color: color.ink, margin: '0 0 5px',
                      fontFamily: font.family,
                    }}>
                      {s.title}
                    </p>
                    {s.oneliner && (
                      <p style={{
                        fontSize: 14, fontWeight: 500,
                        lineHeight: 1.5, color: color.inkMuted,
                        margin: 0, fontFamily: font.family,
                      }}>
                        {s.oneliner}
                      </p>
                    )}
                  </div>

                  {/* Expand indicator */}
                  <span style={{
                    fontSize: 'clamp(18px,2vw,24px)',
                    fontWeight: 500,
                    lineHeight: 1,
                    color: color.brand,
                    flexShrink: 0,
                    width: '1em',
                    textAlign: 'center',
                    fontFamily: font.family,
                    transition: 'transform 0.35s ease-out',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    display: 'inline-block',
                  }}>
                    +
                  </span>
                </button>

                {/* Expanded content */}
                <div
                  style={{
                    maxHeight: isOpen ? '800px' : 0,
                    overflow: 'hidden',
                    opacity: isOpen ? 1 : 0,
                    transition: isOpen
                      ? 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease-out 0.05s'
                      : 'max-height 0.35s cubic-bezier(0.4,0,0,1), opacity 0.2s ease-out',
                  }}
                >
                  <div style={{
                    paddingLeft: 'clamp(64px,8vw,120px)',
                    paddingBottom: 'clamp(28px,3.5vw,48px)',
                    display: 'flex',
                    gap: 'clamp(24px,3.5vw,56px)',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                  }}>

                    {/* Evidence + solution */}
                    <div style={{ flex: '1 1 280px', minWidth: 0 }}>

                      {/* Quoted evidence */}
                      {s.quote && (
                        <div style={{
                          paddingLeft: 'clamp(12px,1.5vw,20px)',
                          marginBottom: 20,
                        }}>
                          <p style={{
                            fontSize: t.lead.size, fontWeight: 500,
                            lineHeight: 1.65, color: color.ink,
                            fontStyle: 'italic', margin: '0 0 6px',
                            fontFamily: font.family,
                          }}>
                            &ldquo;{s.quote}&rdquo;
                          </p>
                          <span style={{
                            fontSize: 12, fontWeight: 600,
                            color: color.inkMuted, letterSpacing: '0.04em',
                            fontFamily: font.family,
                          }}>
                            · {s.attribution}
                          </span>
                        </div>
                      )}

                      {/* Factual evidence (no direct quote) */}
                      {s.evidence && (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          marginBottom: 20,
                          background: color.white,
                          border: `1px solid ${color.line}`,
                          borderRadius: layout.rSm,
                          padding: '10px 14px',
                        }}>
                          <span style={{
                            fontSize: 13, fontWeight: 700,
                            color: color.inkMuted,
                            letterSpacing: '-0.01em', fontFamily: font.family,
                          }}>
                            {s.evidence}
                          </span>
                          {s.attribution && (
                            <span style={{
                              fontSize: 11, fontWeight: 600,
                              color: color.inkMuted, letterSpacing: '0.04em',
                              fontFamily: font.family,
                            }}>
                              · {s.attribution}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Solution text */}
                      <p style={{
                        fontSize: t.body.size, lineHeight: t.body.lh,
                        color: color.inkMuted, margin: '0 0 16px',
                        fontFamily: font.family,
                      }}>
                        {s.solution}
                      </p>

                      {/* UR tag */}
                      <span style={{
                        fontSize: 11, fontWeight: 700,
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: color.brand, background: color.brandPale,
                        padding: '4px 10px', borderRadius: 100,
                        fontFamily: font.family,
                      }}>
                        {s.ur}
                      </span>
                    </div>

                    {/* Mini-render placeholder */}
                    <div style={{ flex: '0 0 clamp(90px,12vw,140px)' }}>
                      <div style={{
                        background: color.line,
                        borderRadius: layout.rMd,
                        aspectRatio: '9/16',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                      }}>
                        <span style={{
                          fontSize: 9, fontWeight: 800,
                          letterSpacing: '0.08em', textTransform: 'uppercase',
                          color: color.inkFaint, fontFamily: font.family,
                          textAlign: 'center', padding: '0 6px',
                        }}>
                          미니렌더
                        </span>
                        <span style={{
                          fontSize: 9, color: color.inkFaint,
                          fontFamily: font.family, textAlign: 'center',
                          padding: '0 6px',
                        }}>
                          STEP 10 교체
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
