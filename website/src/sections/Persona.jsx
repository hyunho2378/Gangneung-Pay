import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const PRIMARY_PAINS = [
  '글자 작고 충전 과정 복잡',
  '계산대 앞 잔액 확인 실패 → 민망',
  '앱 로딩 지연으로 삼성페이 전환',
];

const REFERENCES = [
  { label: 'REFERENCE A', name: '소상공인', desc: '가맹점 등록·정산 관리. B2B 기능 분리 요구.' },
  { label: 'REFERENCE B', name: '여행객', desc: '강릉 방문 단기 사용. 지역 가맹점 지도 탐색.' },
];

export default function Persona() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [primaryRef, primaryVisible] = useReveal({ threshold: 0.05 });
  const [secondaryRef, secondaryVisible] = useReveal({ threshold: 0.05 });
  const [refRef, refVisible] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="persona"
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
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px',
          }}>
            PERSONA
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: 0,
          }}>
            누가 강릉페이를 쓰는가
          </h2>
        </div>

        {/* Primary */}
        <div
          ref={primaryRef}
          style={{
            opacity: primaryVisible ? 1 : 0,
            transform: primaryVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            background: color.brandPale,
            borderRadius: layout.rLg,
            borderLeft: `4px solid ${color.brand}`,
            padding: 'clamp(32px,4vw,56px)',
            marginBottom: 'clamp(16px,2vw,24px)',
          }}
        >
          <span style={{
            display: 'inline-block',
            fontSize: 11, fontWeight: 800, letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: color.brand, color: color.white,
            padding: '4px 12px', borderRadius: 100,
            marginBottom: 20,
            fontFamily: font.family,
          }}>
            PRIMARY
          </span>

          <h3 style={{
            fontSize: 'clamp(24px,3vw,40px)', fontWeight: 800,
            lineHeight: 1.22, letterSpacing: '-0.03em',
            color: color.ink, margin: '0 0 10px',
            fontFamily: font.family,
          }}>
            시니어 5060 헤비유저
          </h3>
          <p style={{
            fontSize: t.lead.size, lineHeight: 1.65,
            color: color.inkMuted, margin: '0 0 32px',
            fontFamily: font.family,
          }}>
            경제적 혜택 민감. 실물카드 익숙, 스마트폰 결제 과도기.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(24px,3vw,40px)',
          }}>
            <div>
              <p style={{
                fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                color: color.brand, margin: '0 0 12px',
              }}>
                핵심 동기
              </p>
              <p style={{
                fontSize: t.h3.size, fontWeight: 700,
                lineHeight: t.h3.lh, color: color.ink,
                margin: '0 0 4px', fontFamily: font.family,
              }}>
                10% 캐시백
              </p>
              <p style={{
                fontSize: 13, color: color.inkMuted,
                margin: 0, fontFamily: font.family,
              }}>
                월 30만 한도 · 최대 3만원 · 소득공제 30%
              </p>
            </div>

            <div>
              <p style={{
                fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                color: color.brand, margin: '0 0 12px',
              }}>
                페인포인트
              </p>
              {PRIMARY_PAINS.map((pain) => (
                <div
                  key={pain}
                  style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}
                >
                  <span style={{
                    color: color.warn, fontWeight: 700, flexShrink: 0,
                    lineHeight: 1.5, fontFamily: font.family,
                  }}>
                    —
                  </span>
                  <span style={{
                    fontSize: 14, color: color.inkMuted,
                    lineHeight: 1.5, fontFamily: font.family,
                  }}>
                    {pain}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary */}
        <div
          ref={secondaryRef}
          style={{
            opacity: secondaryVisible ? 1 : 0,
            transform: secondaryVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            background: color.bg,
            borderRadius: layout.rLg,
            padding: 'clamp(24px,3vw,40px)',
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          <span style={{
            display: 'inline-block',
            fontSize: 11, fontWeight: 800, letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: color.inkFaint, color: color.white,
            padding: '4px 12px', borderRadius: 100,
            marginBottom: 20,
            fontFamily: font.family,
          }}>
            SECONDARY
          </span>

          <h3 style={{
            fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 800,
            lineHeight: 1.22, letterSpacing: '-0.02em',
            color: color.ink, margin: '0 0 10px',
            fontFamily: font.family,
          }}>
            2030 청년 이탈자 / 잠재 사용자
          </h3>
          <p style={{
            fontSize: t.lead.size, lineHeight: 1.65,
            color: color.inkMuted, margin: '0 0 28px',
            fontFamily: font.family,
          }}>
            편의성 최우선. 삼성페이 의존. UI 심미성 민감.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(24px,3vw,40px)',
          }}>
            <div>
              <p style={{
                fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                color: color.inkMuted, margin: '0 0 10px',
              }}>
                이탈 트리거
              </p>
              <p style={{
                fontSize: 14, fontWeight: 700,
                color: color.ink, margin: '0 0 4px',
                fontFamily: font.family,
              }}>
                삼성페이 미지원
              </p>
              <p style={{
                fontSize: 13, color: color.inkMuted,
                margin: 0, fontStyle: 'italic', fontFamily: font.family,
              }}>
                "혜택 때문에 억지로 쓰는 낡은 앱"
              </p>
            </div>

            <div>
              <p style={{
                fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                color: color.inkMuted, margin: '0 0 10px',
              }}>
                재유입 조건
              </p>
              <p style={{
                fontSize: 14, fontWeight: 700,
                color: color.ink, margin: '0 0 4px',
                fontFamily: font.family,
              }}>
                삼성페이 지원 + 네이티브 UI
              </p>
              <p style={{
                fontSize: 13, color: color.inkMuted,
                margin: 0, fontFamily: font.family,
              }}>
                카카오·네이버페이 동일 혜택 적용
              </p>
            </div>
          </div>
        </div>

        {/* Reference */}
        <div
          ref={refRef}
          style={{
            opacity: refVisible ? 1 : 0,
            transform: refVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            display: 'flex',
            gap: 'clamp(24px,4vw,56px)',
            flexWrap: 'wrap',
          }}
        >
          {REFERENCES.map(({ label, name, desc }) => (
            <div
              key={name}
              style={{
                flex: 1, minWidth: 200,
                borderTop: `2px solid ${color.line}`,
                paddingTop: 20,
              }}
            >
              <p style={{
                fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                color: color.inkFaint, margin: '0 0 8px',
              }}>
                {label}
              </p>
              <p style={{
                fontSize: t.h3.size, fontWeight: 700,
                lineHeight: t.h3.lh, color: color.ink,
                margin: '0 0 6px', fontFamily: font.family,
              }}>
                {name}
              </p>
              <p style={{
                fontSize: 13, color: color.inkMuted,
                margin: 0, fontFamily: font.family,
              }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
