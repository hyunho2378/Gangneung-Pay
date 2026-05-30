import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';
import personaSvg from '../assets/persona.svg';

const PERSONA = {
  name: '김정숙',
  age: '53세',
  role: '주부',
  location: '강릉 거주 20년',
  tags: ['지역 경제 관심', '소상공인 지원'],
  quote: '내 돈이 어떻게 되는지 항상 알고 막힘없이 쓰고 싶다',
  personality: ['실용적', '관계 중심', '정보 탐색형', '지역 충성도 높음'],
  behaviors: [
    { label: '의사결정 방식', lo: '신중한 비교 검토', hi: '빠른 판단 실행', val: 22 },
    { label: '정보 처리 스타일', lo: '상세 정독형', hi: '핵심만 빠르게', val: 28 },
    { label: '앱 확인 패턴', lo: '필요시에만', hi: '매일 확인', val: 25 },
    { label: '소비 성향', lo: '보수적 신중', hi: '적극적 즉시', val: 20 },
    { label: '도움 요청 방식', lo: '도움 요청형', hi: '스스로 해결형', val: 32 },
    { label: '지역 상권 이용', lo: '낮음', hi: '높음', val: 90 },
  ],
  narrative: '강릉에서 오래 살며 동네 가게를 주로 이용합니다. 강릉페이로 지역 상권을 돕고 싶지만, 앱 조작이 어렵고 잔액 확인이 불편합니다.',
  pains: [
    '앱을 열어야만 잔액을 알 수 있어 계산대에서 당황함',
    '환불 메뉴를 찾는 데 시간이 너무 걸림',
    "'강릉머니'가 뭔지 몰라 기능을 포기",
  ],
  needs: [
    '앱 없이도 잔액을 즉시 확인할 수 있는 방법',
    '충전, 환불이 같은 자리에 있는 직관적인 메뉴',
    '쉬운 우리말로 된 메뉴 명칭',
  ],
};

function Slider({ label, lo, hi, val }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: color.ink, fontFamily: font.family }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, color: color.inkMuted, fontFamily: font.family, flexShrink: 0, minWidth: 'auto', maxWidth: 90, whiteSpace: 'nowrap', textAlign: 'right' }}>{lo}</span>
        <div style={{ flex: 1, height: 6, background: color.line, borderRadius: 99, position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: `${val}%`, background: color.brand, borderRadius: 99,
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: `${val}%`,
            transform: 'translate(-50%, -50%)',
            width: 14, height: 14, borderRadius: '50%',
            background: color.brand, border: `2px solid ${color.white}`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
          }} />
        </div>
        <span style={{ fontSize: 11, color: color.inkMuted, fontFamily: font.family, flexShrink: 0, minWidth: 'auto', maxWidth: 90, whiteSpace: 'nowrap' }}>{hi}</span>
      </div>
    </div>
  );
}

export default function Persona() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [cardRef, cardVisible] = useReveal({ threshold: 0.05 });
  const { isMobile, isTablet } = useBreakpoint();
  const isDesktop = !isMobile && !isTablet;

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
            color: color.brand, margin: '0 0 24px', fontFamily: font.family,
          }}>
            PERSONA
          </p>
          <p style={{
            fontSize: t.lead.size, fontWeight: 700,
            fontStyle: 'italic', lineHeight: t.lead.lh,
            color: color.brand, margin: 0,
            wordBreak: 'keep-all', fontFamily: font.family,
          }}>
            "{PERSONA.quote}"
          </p>
        </div>

        {/* Persona visual */}
        <div
          ref={cardRef}
          style={{
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
        {isDesktop ? (
          <img
            src={personaSvg}
            alt="강릉페이 페르소나 — 김정숙"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        ) : (
          <div style={{
            background: color.brandPale,
            borderRadius: layout.rLg,
            padding: 'clamp(28px,4vw,48px)',
          }}>
          <span style={{
            display: 'inline-block',
            fontSize: 13, fontWeight: 800, letterSpacing: '0em',
            textTransform: 'uppercase',
            background: color.brand, color: color.white,
            padding: '4px 12px', borderRadius: 100,
            marginBottom: 24, fontFamily: font.family,
          }}>
            PRIMARY
          </span>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'clamp(140px,20%,200px) 1fr',
            gap: 'clamp(24px,4vw,56px)',
            alignItems: 'flex-start',
          }}>

            {/* Left: profile */}
            <div>
              {/* Photo placeholder */}
              <div style={{
                width: '100%',
                aspectRatio: '1/1',
                background: color.brand,
                borderRadius: layout.rMd,
                marginBottom: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0.15,
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" fill={color.brand} />
                  <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" fill={color.brand} />
                </svg>
              </div>

              <p style={{
                fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 800,
                letterSpacing: '-0.02em', color: color.ink,
                margin: '0 0 4px', fontFamily: font.family, lineHeight: 1.2,
              }}>
                {PERSONA.name}
              </p>
              <p style={{
                fontSize: t.caption.size, color: color.inkMuted,
                margin: '0 0 12px', fontFamily: font.family,
              }}>
                {PERSONA.age}, {PERSONA.role}
              </p>
              <p style={{
                fontSize: t.caption.size, color: color.inkMuted,
                margin: '0 0 16px', fontFamily: font.family,
              }}>
                {PERSONA.location}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {PERSONA.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 11, fontWeight: 700,
                    color: color.brand, background: color.white,
                    padding: '3px 10px', borderRadius: 100,
                    fontFamily: font.family,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: content */}
            <div>
              {/* Quote */}
              <blockquote style={{
                margin: '0 0 28px',
                padding: '16px 20px',
                background: color.white,
                borderRadius: layout.rSm,
              }}>
                <p style={{
                  fontSize: t.lead.size, fontWeight: 600,
                  lineHeight: 1.6, color: color.ink,
                  margin: 0, fontFamily: font.family, wordBreak: 'keep-all',
                }}>
                  "{PERSONA.quote}"
                </p>
              </blockquote>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: 'clamp(20px,3vw,40px)',
                marginBottom: 28,
              }}>
                {/* Personality */}
                <div>
                  <p style={{
                    fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                    letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                    color: color.brand, margin: '0 0 12px', fontFamily: font.family,
                  }}>
                    Personality
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {PERSONA.personality.map(p => (
                      <span key={p} style={{
                        fontSize: 13, fontWeight: 600,
                        color: color.ink, background: color.white,
                        padding: '5px 12px', borderRadius: 100,
                        fontFamily: font.family,
                        border: `1px solid ${color.line}`,
                      }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Narrative */}
                <div>
                  <p style={{
                    fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                    letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                    color: color.brand, margin: '0 0 12px', fontFamily: font.family,
                  }}>
                    Context
                  </p>
                  <p style={{
                    fontSize: t.caption.size, lineHeight: 1.7,
                    color: color.inkMuted, margin: 0, fontFamily: font.family,
                    wordBreak: 'keep-all',
                  }}>
                    {PERSONA.narrative}
                  </p>
                </div>
              </div>

              {/* Behavior sliders */}
              <div style={{ marginBottom: 28 }}>
                <p style={{
                  fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                  letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                  color: color.brand, margin: '0 0 16px', fontFamily: font.family,
                }}>
                  Behavior Pattern
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '0 clamp(20px,3vw,40px)',
                }}>
                  {PERSONA.behaviors.map(b => (
                    <Slider key={b.label} {...b} />
                  ))}
                </div>
              </div>

              {/* Pain points + Needs */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 'clamp(20px,3vw,40px)' }}>
                <div>
                  <p style={{
                    fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                    letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                    color: color.warn, margin: '0 0 12px', fontFamily: font.family,
                  }}>
                    Pain Points
                  </p>
                  {PERSONA.pains.map((pain, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: color.inkMuted, fontWeight: 700, flexShrink: 0, lineHeight: 1.5, fontFamily: font.family }}>•</span>
                      <span style={{ fontSize: 13, color: color.inkMuted, lineHeight: 1.55, fontFamily: font.family, wordBreak: 'keep-all' }}>{pain}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{
                    fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                    letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                    color: color.brand, margin: '0 0 12px', fontFamily: font.family,
                  }}>
                    Needs
                  </p>
                  {PERSONA.needs.map((need, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: color.brand, fontWeight: 700, flexShrink: 0, lineHeight: 1.5, fontFamily: font.family }}>•</span>
                      <span style={{ fontSize: 13, color: color.inkMuted, lineHeight: 1.55, fontFamily: font.family, wordBreak: 'keep-all' }}>{need}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
        </div>

      </div>
    </section>
  );
}
