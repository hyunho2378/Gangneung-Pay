import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const DOCS = [
  { name: 'CLAUDE.md', desc: '행동지침·금지규칙' },
  { name: 'AGENTS.md', desc: '에이전트 역할·경계' },
  { name: 'DESIGN.md', desc: '토큰·컴포넌트 계약' },
  { name: 'IA.md', desc: '라우트·화면 계층' },
  { name: 'Components.md', desc: '70+ 컴포넌트 스펙' },
  { name: 'Patterns.md', desc: '재사용 인터랙션 패턴' },
  { name: 'Routes.md', desc: '30개 화면 목록' },
  { name: 'PROGRESS.md', desc: '진행 상태·완료 목록' },
];

const AGENTS = [
  { id: 'BN', label: '검색·발견', desc: '상점 검색, 지도, 카테고리 필터', color: color.brand },
  { id: 'MY', label: 'MY·카드', desc: 'MY 탭, 카드 관리, 설정 플로우', color: color.brand },
  { id: 'FX', label: '버그·지도·내역', desc: '버그 수정, 지도 통합, 거래 내역', color: color.brand },
  { id: 'VR', label: '검증 — 44항목', desc: '빌드·토큰·접근성·로직 전수 검사', color: color.warn },
];

const MODELS = [
  {
    name: 'Sonnet',
    uses: ['단순 매핑', '컴포넌트 교체', '스타일 수정', '반복 작업'],
    note: '속도 우선 — 결과 예측 가능',
  },
  {
    name: 'Opus',
    uses: ['아키텍처 설계', '디버깅', '검증 에이전트', '트레이드오프 판단'],
    note: '정확도 우선 — 복잡한 의존성',
  },
];

const CHECKS = [
  { label: '빌드 오류', target: '0건' },
  { label: 'localStorage 사용', target: '0건' },
  { label: '하드코딩 색상', target: '0건' },
  { label: 'TypeScript 오류', target: '0건' },
  { label: '이모지 사용', target: '0건' },
  { label: '명시 외 수정', target: '0건' },
];

const METRICS = [
  { value: '199건', label: 'spacing 자동검증' },
  { value: '13,643 → 13,021', label: '불필요 코드 제거' },
  { value: '30분', label: 'Face ID 디버깅' },
];

const QUOTE =
  'AI는 How를 잘한다. 사람은 Why를 결정한다. 핵심 결정(시니어 우선·환불 동등위계·캐시백 직관메시지·13,000개 전부 등록)은 사람이 했다. AI는 그 의도를 정확히 구현하는 파트너였다.';

export default function AiHarness() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [metricsRef, metricsVisible] = useReveal({ threshold: 0.05 });
  const [blocksRef, blocksVisible] = useReveal({ threshold: 0.03 });
  const [quoteRef, quoteVisible] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="ai-harness"
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
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px', fontFamily: font.family,
          }}>
            AI HARNESS
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: '0 0 16px', fontFamily: font.family,
          }}>
            AI는 How를 잘한다.<br />사람은 Why를 결정한다.
          </h2>
        </div>

        {/* Metrics strip */}
        <div
          ref={metricsRef}
          style={{
            opacity: metricsVisible ? 1 : 0,
            transform: metricsVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(16px,2vw,32px)',
            marginBottom: 'clamp(64px,8vw,112px)',
            padding: 'clamp(24px,3vw,40px)',
            background: color.bg,
            borderRadius: layout.rMd,
          }}
        >
          {METRICS.map((m, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                padding: 'clamp(16px,2vw,24px) 0',
                opacity: metricsVisible ? 1 : 0,
                transition: `opacity 0.5s ease-out ${i * 0.1}s`,
              }}
            >
              <div style={{
                fontSize: 'clamp(20px,2.4vw,32px)', fontWeight: 800,
                letterSpacing: '-0.03em', color: color.brand,
                fontFamily: font.family, marginBottom: 8,
              }}>
                {m.value}
              </div>
              <div style={{
                fontSize: t.caption.size, lineHeight: t.caption.lh,
                color: color.inkMuted, fontFamily: font.family,
              }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* 4 blocks 2x2 */}
        <div
          ref={blocksRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(20px,2.5vw,40px)',
            marginBottom: 'clamp(64px,8vw,112px)',
          }}
        >

          {/* Block 1 — 문서 기반 컨텍스트 주입 */}
          <div
            style={{
              opacity: blocksVisible ? 1 : 0,
              transform: blocksVisible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.65s ease-out 0s, transform 0.65s ease-out 0s',
              background: color.bg,
              borderRadius: layout.rMd,
              padding: 'clamp(24px,3vw,40px)',
            }}
          >
            <p style={{
              fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
              color: color.brand, margin: '0 0 12px', fontFamily: font.family,
            }}>
              01
            </p>
            <h3 style={{
              fontSize: t.h3.size, fontWeight: t.h3.weight,
              lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
              color: color.ink, margin: '0 0 24px', fontFamily: font.family,
            }}>
              문서 기반 컨텍스트 주입
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {DOCS.map((doc) => (
                <div
                  key={doc.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '8px 12px',
                    background: color.white,
                    borderRadius: layout.rSm,
                  }}
                >
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: color.brand, fontFamily: "'SFMono-Regular','Consolas','Monaco',monospace",
                    minWidth: 112, flexShrink: 0,
                  }}>
                    {doc.name}
                  </span>
                  <span style={{
                    fontSize: t.caption.size, lineHeight: t.caption.lh,
                    color: color.inkMuted, fontFamily: font.family,
                  }}>
                    {doc.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Block 2 — 병렬 에이전트 */}
          <div
            style={{
              opacity: blocksVisible ? 1 : 0,
              transform: blocksVisible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.65s ease-out 0.1s, transform 0.65s ease-out 0.1s',
              background: color.bg,
              borderRadius: layout.rMd,
              padding: 'clamp(24px,3vw,40px)',
            }}
          >
            <p style={{
              fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
              color: color.brand, margin: '0 0 12px', fontFamily: font.family,
            }}>
              02
            </p>
            <h3 style={{
              fontSize: t.h3.size, fontWeight: t.h3.weight,
              lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
              color: color.ink, margin: '0 0 24px', fontFamily: font.family,
            }}>
              병렬 에이전트
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* BN / MY / FX row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                {AGENTS.slice(0, 3).map((ag) => (
                  <div
                    key={ag.id}
                    style={{
                      padding: '12px',
                      background: color.white,
                      borderRadius: layout.rSm,
                      borderTop: `3px solid ${ag.color}`,
                    }}
                  >
                    <div style={{
                      fontSize: 16, fontWeight: 800,
                      color: ag.color, fontFamily: font.family, marginBottom: 4,
                    }}>
                      {ag.id}
                    </div>
                    <div style={{
                      fontSize: 11, fontWeight: 700,
                      color: color.ink, fontFamily: font.family, marginBottom: 4,
                    }}>
                      {ag.label}
                    </div>
                    <div style={{
                      fontSize: 11, lineHeight: 1.5,
                      color: color.inkMuted, fontFamily: font.family,
                    }}>
                      {ag.desc}
                    </div>
                  </div>
                ))}
              </div>
              {/* Arrow */}
              <div style={{
                textAlign: 'center',
                fontSize: 18, color: color.inkFaint,
              }}>
                ↓
              </div>
              {/* VR row */}
              <div
                style={{
                  padding: '14px 16px',
                  background: color.white,
                  borderRadius: layout.rSm,
                  borderTop: `3px solid ${AGENTS[3].color}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span style={{
                  fontSize: 16, fontWeight: 800,
                  color: AGENTS[3].color, fontFamily: font.family,
                }}>
                  VR
                </span>
                <div>
                  <div style={{
                    fontSize: 11, fontWeight: 700,
                    color: color.ink, fontFamily: font.family, marginBottom: 2,
                  }}>
                    {AGENTS[3].label}
                  </div>
                  <div style={{
                    fontSize: 11, color: color.inkMuted, fontFamily: font.family,
                  }}>
                    {AGENTS[3].desc}
                  </div>
                </div>
              </div>
            </div>
            <p style={{
              margin: '16px 0 0',
              fontSize: t.caption.size, lineHeight: t.caption.lh,
              color: color.brand, fontFamily: font.family, fontWeight: 700,
            }}>
              1일치 작업을 반나절에
            </p>
          </div>

          {/* Block 3 — 모델 선택 기준 */}
          <div
            style={{
              opacity: blocksVisible ? 1 : 0,
              transform: blocksVisible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.65s ease-out 0.2s, transform 0.65s ease-out 0.2s',
              background: color.bg,
              borderRadius: layout.rMd,
              padding: 'clamp(24px,3vw,40px)',
            }}
          >
            <p style={{
              fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
              color: color.brand, margin: '0 0 12px', fontFamily: font.family,
            }}>
              03
            </p>
            <h3 style={{
              fontSize: t.h3.size, fontWeight: t.h3.weight,
              lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
              color: color.ink, margin: '0 0 24px', fontFamily: font.family,
            }}>
              모델 선택 기준
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {MODELS.map((m) => (
                <div
                  key={m.name}
                  style={{
                    padding: '16px',
                    background: color.white,
                    borderRadius: layout.rSm,
                    borderTop: `3px solid ${color.brand}`,
                  }}
                >
                  <div style={{
                    fontSize: 15, fontWeight: 800,
                    color: color.brand, fontFamily: font.family, marginBottom: 12,
                  }}>
                    {m.name}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                    {m.uses.map((u) => (
                      <div
                        key={u}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                        }}
                      >
                        <div style={{
                          width: 4, height: 4, borderRadius: '50%',
                          background: color.brand, flexShrink: 0,
                        }} />
                        <span style={{
                          fontSize: 12, color: color.ink,
                          fontFamily: font.family, lineHeight: 1.5,
                        }}>
                          {u}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p style={{
                    fontSize: 11, color: color.inkMuted,
                    fontFamily: font.family, margin: 0,
                    borderTop: `1px solid ${color.line}`,
                    paddingTop: 8,
                  }}>
                    {m.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Block 4 — 자기검증 의무 */}
          <div
            style={{
              opacity: blocksVisible ? 1 : 0,
              transform: blocksVisible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.65s ease-out 0.3s, transform 0.65s ease-out 0.3s',
              background: color.bg,
              borderRadius: layout.rMd,
              padding: 'clamp(24px,3vw,40px)',
            }}
          >
            <p style={{
              fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
              color: color.brand, margin: '0 0 12px', fontFamily: font.family,
            }}>
              04
            </p>
            <h3 style={{
              fontSize: t.h3.size, fontWeight: t.h3.weight,
              lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
              color: color.ink, margin: '0 0 24px', fontFamily: font.family,
            }}>
              자기검증 의무
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CHECKS.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: color.white,
                    borderRadius: layout.rSm,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 18, height: 18,
                      borderRadius: '50%',
                      background: color.ok,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <div style={{
                        width: 8, height: 5,
                        borderLeft: `2px solid ${color.white}`,
                        borderBottom: `2px solid ${color.white}`,
                        transform: 'rotate(-45deg) translateY(-1px)',
                      }} />
                    </div>
                    <span style={{
                      fontSize: t.body.size, lineHeight: t.body.lh,
                      color: color.ink, fontFamily: font.family,
                    }}>
                      {c.label}
                    </span>
                  </div>
                  <span style={{
                    fontSize: 12, fontWeight: 800,
                    color: color.ok, fontFamily: font.family,
                    letterSpacing: '0.04em',
                  }}>
                    {c.target}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing quote */}
        <div
          ref={quoteRef}
          style={{
            opacity: quoteVisible ? 1 : 0,
            transform: quoteVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            borderLeft: `4px solid ${color.brand}`,
            paddingLeft: 'clamp(20px,2.5vw,36px)',
          }}
        >
          <p style={{
            fontSize: t.lead.size, lineHeight: t.lead.lh,
            color: color.ink, fontFamily: font.family,
            margin: 0, fontStyle: 'normal',
          }}>
            {QUOTE}
          </p>
        </div>

      </div>
    </section>
  );
}
