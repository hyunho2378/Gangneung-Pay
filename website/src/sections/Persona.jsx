import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';
import personaSvg from '../assets/persona-1.svg';
import personaMobileImg from '../assets/persona-mobile.png';

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
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="persona"
      style={{
        background: color.white,
        fontFamily: font.family,
        padding: `${layout.sectionY} clamp(20px,5vw,80px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto', overflow: 'hidden' }}>

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
            fontSize: t.h2.size, fontWeight: 800,
            lineHeight: t.h2.lh, letterSpacing: t.h2.ls,
            color: color.ink, margin: 0,
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
          {!isMobile ? (
            <img
              src={personaSvg}
              alt="강릉페이 페르소나 — 김정숙"
              style={{ width: '100%', maxWidth: '100%', height: 'auto', display: 'block' }}
            />
          ) : (
            <div>
              {/* 프로필 사진 */}
              <img
                src={personaMobileImg}
                alt="강릉페이 페르소나 — 김정숙"
                style={{ width: '100%', maxWidth: 280, height: 'auto', display: 'block', margin: '0 auto', borderRadius: layout.rMd }}
              />
              {/* 기본 정보 */}
              <div style={{ marginTop: 24, marginBottom: 12 }}>
                <p style={{ fontSize: t.h3.size, fontWeight: 800, color: color.ink, margin: '0 0 4px', fontFamily: font.family }}>
                  {PERSONA.name} · {PERSONA.age} · {PERSONA.role}
                </p>
                <p style={{ fontSize: t.caption.size, color: color.inkMuted, margin: 0, fontFamily: font.family }}>
                  {PERSONA.location}
                </p>
              </div>
              {/* 태그 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {PERSONA.tags.map(tag => (
                  <span key={tag} style={{
                    background: color.brandPale, color: color.brand,
                    fontSize: 12, fontWeight: 700,
                    padding: '4px 10px', borderRadius: 99,
                    fontFamily: font.family,
                  }}>{tag}</span>
                ))}
              </div>
              {/* 내러티브 */}
              <p style={{
                fontSize: t.body.size, color: color.inkMuted,
                lineHeight: t.body.lh, margin: '0 0 24px',
                wordBreak: 'keep-all', fontFamily: font.family,
              }}>
                {PERSONA.narrative}
              </p>
              {/* Pain Points */}
              <div style={{ marginBottom: 20 }}>
                <p style={{
                  fontSize: t.eyebrow.size, fontWeight: 800,
                  color: color.brand, letterSpacing: '0.04em', textTransform: 'uppercase',
                  margin: '0 0 10px', fontFamily: font.family,
                }}>Pain Points</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {PERSONA.pains.map((p, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                      <span style={{ color: color.brand, fontWeight: 800, flexShrink: 0, fontFamily: font.family }}>!</span>
                      <span style={{ fontSize: t.body.size, color: color.ink, lineHeight: t.body.lh, fontFamily: font.family }}>
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Needs */}
              <div>
                <p style={{
                  fontSize: t.eyebrow.size, fontWeight: 800,
                  color: color.brand, letterSpacing: '0.04em', textTransform: 'uppercase',
                  margin: '0 0 10px', fontFamily: font.family,
                }}>Needs</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {PERSONA.needs.map((n, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                      <span style={{ color: color.brand, fontWeight: 800, flexShrink: 0, fontFamily: font.family }}>+</span>
                      <span style={{ fontSize: t.body.size, color: color.ink, lineHeight: t.body.lh, fontFamily: font.family }}>
                        {n}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
