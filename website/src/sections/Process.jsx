import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';

const PHASES = [
  {
    num: '01',
    label: 'Phase 1',
    title: '리서치',
    period: '2026.03 - 04',
    items: [
      '데스크 리서치: 경쟁 서비스 4종 비교',
      '서비스 사파리: 현장 관찰 4인, 5개 미션',
      '설문조사 70명',
      '심층 인터뷰 (IDI) 6인',
    ],
  },
  {
    num: '02',
    label: 'Phase 2',
    title: '설계',
    period: '2026.04 - 05',
    items: [
      '어피니티 다이어그램: 메모 87개, 5클러스터',
      'Key Insight 3개 도출',
      'AS-IS 휴리스틱 감사',
      '페르소나 수립',
      '유저 저니맵 5단계',
      'UX 전략 4개, UR 14개 정의',
      '정보 구조 재설계 (IA)',
    ],
  },
  {
    num: '03',
    label: 'Phase 3',
    title: '구현',
    period: '2026.05 - 2026.05.31',
    items: [
      '듀얼 디자인 시스템 (HIG / Google Material 3)',
      '비금융 기능 덜어내기 (생활편의, 소통참여, 챗봇 삭제)',
      '이용내역, 캐시백 내역, 환불내역 신설',
      '환불 동등 위계 (큰글씨 전용 다크패턴 해소)',
      '가맹점 페이지, 지도 개선',
      '프로토타입 (iOS / Android)',
      '유저 테스트 진행',
    ],
  },
];

const VIOLATIONS = [
  {
    code: 'N#2',
    label: '사용자 언어',
    before: "'강릉머니', 4인 전원 미인지",
    after: '메뉴명 사용자 언어 통일',
    ur: 'P0-06',
  },
  {
    code: 'N#4',
    label: '일관성',
    before: 'B2C에 B2B 메뉴 혼재',
    after: 'B2C / B2B 완전 분리',
    ur: 'P0-05',
  },
  {
    code: 'N#6',
    label: '인식 보조',
    before: '환불이 큰글씨 모드에서만 노출',
    after: '잔액카드 3슬롯 동등 위계',
    ur: 'P0-03',
  },
  {
    code: 'N#10',
    label: '도움말',
    before: '충전, 환불 절차 안내 없음',
    after: '코치마크 단계별 자동 안내',
    ur: '신규',
  },
  {
    code: 'S#3',
    label: '단순성',
    before: 'B2C/B2B 혼재로 탐색 복잡',
    after: 'B2C 전용 단순 구조',
    ur: 'P0-05',
  },
  {
    code: 'S#8',
    label: '단순 오류',
    before: "'강릉머니', 내부 용어 사용",
    after: '일관된 브랜드 언어 적용',
    ur: 'P0-06',
  },
];

export default function Process() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [timelineRef, timelineVisible] = useReveal({ threshold: 0.03 });
  const [tableRef, tableVisible] = useReveal({ threshold: 0.03 });
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="process"
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
            color: color.brand, margin: '0 0 24px', fontFamily: font.family,
          }}>
            PROCESS
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: '0 0 16px', fontFamily: font.family,
            wordBreak: 'keep-all',
          }}>
            사용자를 직접 만나 문제를 찾고, 7개 전략으로 설계하고, 화면으로 구현했습니다.
          </h2>
          <p style={{
            fontSize: t.lead.size, fontWeight: 500,
            lineHeight: t.lead.lh, color: color.inkMuted,
            margin: 0, fontFamily: font.family,
          }}>
            3개 Phase, 리서치부터 구현까지
          </p>
        </div>

        {/* Phase timeline */}
        <div
          ref={timelineRef}
          style={{
            opacity: timelineVisible ? 1 : 0,
            transform: timelineVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 'clamp(40px,5vw,72px)',
          }}
        >
          {/* Connector line */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
            gap: 'clamp(16px,2.5vw,40px)',
            position: 'relative',
          }}>

            {PHASES.map((phase, i) => (
              <div
                key={phase.num}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  opacity: timelineVisible ? 1 : 0,
                  transform: timelineVisible ? 'none' : 'translateY(16px)',
                  transition: `opacity 0.55s ease-out ${i * 0.12}s, transform 0.55s ease-out ${i * 0.12}s`,
                }}
              >
                {/* Node */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <div style={{
                    width: 56, height: 56,
                    borderRadius: '50%',
                    background: color.brand,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{
                      fontSize: 14, fontWeight: 800,
                      color: color.white, fontFamily: font.family,
                      letterSpacing: '0.04em',
                    }}>
                      {phase.num}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div style={{
                  background: color.white,
                  borderRadius: layout.rMd,
                  padding: 'clamp(20px,2.5vw,32px)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                }}>
                  <p style={{
                    fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                    letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                    color: color.brand, margin: '0 0 8px', fontFamily: font.family,
                  }}>
                    {phase.label}
                  </p>
                  <h3 style={{
                    fontSize: t.h3.size, fontWeight: t.h3.weight,
                    lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
                    color: color.ink, margin: '0 0 6px', fontFamily: font.family,
                  }}>
                    {phase.title}
                  </h3>
                  <p style={{
                    fontSize: t.caption.size, lineHeight: t.caption.lh,
                    color: color.inkMuted, fontFamily: font.family,
                    margin: '0 0 16px',
                  }}>
                    {phase.period}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {phase.items.map((item) => (
                      <div
                        key={item}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: 8,
                        }}
                      >
                        <div style={{
                          width: 4, height: 4, borderRadius: '50%',
                          background: phase.highlight === item ? color.warn : color.brand,
                          flexShrink: 0, marginTop: 7,
                        }} />
                        <span style={{
                          fontSize: t.caption.size, lineHeight: 1.6,
                          color: phase.highlight === item ? color.warn : color.ink,
                          fontWeight: phase.highlight === item ? 700 : 500,
                          fontFamily: font.family,
                        }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heuristic violations table */}
        <div
          ref={tableRef}
          style={{
            opacity: tableVisible ? 1 : 0,
            transform: tableVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.inkMuted, margin: '0 0 20px', fontFamily: font.family,
          }}>
            HEURISTIC VIOLATIONS, BEFORE / AFTER
          </p>

          {isMobile ? (
            /* Mobile: card per violation */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {VIOLATIONS.map(({ code, label, before, after, ur }, i) => (
                <div
                  key={code}
                  style={{
                    background: color.white,
                    borderRadius: layout.rMd,
                    padding: '14px 16px',
                    border: `1px solid ${color.line}`,
                    opacity: tableVisible ? 1 : 0,
                    transform: tableVisible ? 'none' : 'translateY(8px)',
                    transition: `opacity 0.5s ease-out ${i * 0.06}s, transform 0.5s ease-out ${i * 0.06}s`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: color.brand, letterSpacing: '0.06em', fontFamily: font.family }}>{code}</span>
                    <span style={{ fontSize: 12, color: color.inkMuted, fontFamily: font.family }}>{label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: color.brand, letterSpacing: '0.04em', fontFamily: font.family }}>{ur}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ background: color.bg, borderRadius: layout.rSm, padding: '8px 12px' }}>
                      <p style={{ fontSize: 10, fontWeight: 800, color: color.inkMuted, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 4px', fontFamily: font.family }}>BEFORE</p>
                      <p style={{ fontSize: 13, lineHeight: 1.5, color: color.inkMuted, margin: 0, fontFamily: font.family }}>{before}</p>
                    </div>
                    <div style={{ background: color.brandPale, borderRadius: layout.rSm, padding: '8px 12px' }}>
                      <p style={{ fontSize: 10, fontWeight: 800, color: color.brand, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 4px', fontFamily: font.family }}>AFTER</p>
                      <p style={{ fontSize: 13, lineHeight: 1.5, color: color.ink, fontWeight: 600, margin: 0, fontFamily: font.family }}>{after}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Desktop: grid table */
            <div style={{ overflowX: 'auto' }}>
            {/* Table header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '80px 96px 1fr 1fr 88px',
              gap: 0,
              borderBottom: `2px solid ${color.line}`,
              paddingBottom: 10,
              marginBottom: 0,
              minWidth: 600,
            }}>
              {['코드', '원칙', 'BEFORE', 'AFTER', 'UR(P0/P1)'].map((h) => (
                <div key={h} style={{
                  padding: '0 12px',
                  fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                  letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                  color: color.inkMuted, fontFamily: font.family,
                }}>
                  {h}
                </div>
              ))}
            </div>
            <div>
              {VIOLATIONS.map(({ code, label, before, after, ur }, i) => (
                <div
                  key={code}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 96px 1fr 1fr 88px',
                    gap: 0,
                    background: i % 2 === 0 ? color.white : 'transparent',
                    borderBottom: `1px solid ${color.line}`,
                    minWidth: 600,
                    opacity: tableVisible ? 1 : 0,
                    transform: tableVisible ? 'none' : 'translateY(8px)',
                    transition: `opacity 0.5s ease-out ${i * 0.06}s, transform 0.5s ease-out ${i * 0.06}s`,
                  }}
                >
                  <div style={{ padding: 'clamp(12px,1.5vw,16px) 12px', fontSize: 12, fontWeight: 800, letterSpacing: '0.06em', color: color.brand, fontFamily: font.family, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>{code}</div>
                  <div style={{ padding: 'clamp(12px,1.5vw,16px) 12px', fontSize: t.caption.size, lineHeight: t.caption.lh, color: color.inkMuted, fontFamily: font.family, display: 'flex', alignItems: 'center' }}>{label}</div>
                  <div style={{ padding: 'clamp(12px,1.5vw,16px) 12px', fontSize: t.caption.size, lineHeight: t.caption.lh, color: color.inkMuted, fontFamily: font.family }}>{before}</div>
                  <div style={{ padding: 'clamp(12px,1.5vw,16px) 12px', fontSize: t.caption.size, lineHeight: t.caption.lh, color: color.ink, fontFamily: font.family, fontWeight: 600 }}>{after}</div>
                  <div style={{ padding: 'clamp(12px,1.5vw,16px) 12px', fontSize: 13, fontWeight: 700, color: color.brand, fontFamily: font.family, display: 'flex', alignItems: 'center', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{ur}</div>
                </div>
              ))}
            </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
