import { useState } from 'react';
import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';

const STRATEGIES = [
  {
    id: 'S1', num: 'S1',
    title: '금융앱은 금융에 집중합니다',
    summary: '과하게 들어간 비금융 기능을 덜어내 금융 본질로 돌아갑니다.',
    insight: '비금융 기능 과부하(I6), B2C·B2B 기능 혼재(I2)',
    actions: [
      '생활편의 탭 삭제',
      '소통참여 탭 삭제',
      '인플루언서 챗봇 삭제',
      '메인 서비스 바로가기 삭제',
      '메인 최근 결제 삭제',
      '메인 지원금 캐러셀 삭제',
      '상단 햄버거바 삭제, MY 페이지로 이관',
    ],
  },
  {
    id: 'S2', num: 'S2',
    title: '숨겨진 권리를 동등하게 드러냅니다',
    summary: '특정 모드에서만 보이던 기능을 누구에게나 같은 위계로 보여줍니다.',
    insight: '환불 기능 큰글씨 전용 다크패턴(I5)',
    actions: [
      '환불을 충전, QR결제와 동등한 3슬롯으로 배치',
      '강릉페이 이용안내를 일반 글씨 모드에서도 노출',
      'QR결제를 바텀탭 중앙으로 이동',
      '내부 시스템 용어를 사용자 언어로 교체',
    ],
  },
  {
    id: 'S3', num: 'S3',
    title: '내 돈의 흐름을 투명하게 보여줍니다',
    summary: '잔액, 캐시백, 결제 수단별 사용을 한눈에, 월별로 추적할 수 있게 했습니다.',
    insight: '캐시백 정보 가시성과 충성도 상관(I3), 계산대 앞 잔액 불안(I4), 캐시백 단일 동인(I1)',
    actions: [
      '이용내역 탭 신설: 잔액, 캐시백, 페이별 사용 구분, 월별 칩 필터',
      '캐시백 내역 페이지 신설: 적립, 사용, 소멸 예정 월별 추적',
      '메인 캐시백 섹션에 자동, 수동 사용 통합',
      '충전 화면에서 현재 잔액 동시 노출',
    ],
  },
  {
    id: 'S4', num: 'S4',
    title: '헤매지 않는 직진 동선을 만듭니다',
    summary: '찾기 쉬운 구조와 또렷한 안내로 목적지까지 바로 갑니다.',
    insight: '계산대 앞 잔액 불안(I4), B2C·B2B 기능 혼재(I2)',
    actions: [
      '바텀 네비게이션 재편, primary 가시성 확보',
      '가맹점 페이지 신설: 카테고리 클릭 노출, 선택 시 위치 이동',
      '카카오, 네이버페이 앱 내 안내 후 하단 이동 버튼 하나로 통합',
      '코치마크로 카드 신청, 충전, 환불 단계별 안내',
      '큰글씨 모드 구현',
      '전 화면 블루 primary 통일',
    ],
  },
];

export default function UxStrategy() {
  const [openId, setOpenId] = useState(null);
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [listRef, listVisible] = useReveal({ threshold: 0.02 });
  const { isMobile } = useBreakpoint();

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
                    {s.summary && (
                      <p style={{
                        fontSize: 14, fontWeight: 500,
                        lineHeight: 1.5, color: color.inkMuted,
                        margin: 0, fontFamily: font.family,
                      }}>
                        {s.summary}
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
                    paddingLeft: isMobile ? 'clamp(20px,5vw,40px)' : 'clamp(64px,8vw,120px)',
                    paddingBottom: 'clamp(28px,3.5vw,48px)',
                  }}>

                    {/* Insight connection */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 20,
                      background: color.brandPale,
                      borderRadius: layout.rSm,
                      padding: '8px 14px',
                    }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700,
                        letterSpacing: '0.06em', textTransform: 'uppercase',
                        color: color.brand, fontFamily: font.family,
                        flexShrink: 0,
                      }}>
                        리서치 인사이트
                      </span>
                      <span style={{
                        fontSize: 13, fontWeight: 500,
                        color: color.inkMuted, fontFamily: font.family,
                      }}>
                        {s.insight}
                      </span>
                    </div>

                    {/* Actions list */}
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                      {s.actions.map((action, j) => (
                        <li key={j} style={{
                          display: 'flex', alignItems: 'flex-start', gap: 10,
                          marginBottom: j < s.actions.length - 1 ? 10 : 0,
                        }}>
                          <div style={{
                            width: 5, height: 5, borderRadius: '50%',
                            background: color.brand, flexShrink: 0, marginTop: 7,
                          }} />
                          <span style={{
                            fontSize: t.body.size, lineHeight: t.body.lh,
                            fontWeight: 500, color: color.inkMuted,
                            fontFamily: font.family,
                          }}>
                            {action}
                          </span>
                        </li>
                      ))}
                    </ul>

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
