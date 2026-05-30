import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';

const MEMBERS = [
  { name: '김민경', role: 'PM, VISUAL DESIGNER' },
  { name: '주현호', role: 'UX/UI DESIGNER, DEVELOPER' },
  { name: '윤현아', role: 'UX/UI DESIGNER' },
  { name: '김성경', role: 'UX RESEARCHER' },
  { name: '조영은', role: 'UX RESEARCHER' },
  { name: '김호진', role: 'UX RESEARCHER' },
];

export default function Outro() {
  const { isMobile } = useBreakpoint();
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [creditsRef, creditsVisible] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="outro"
      style={{
        background: color.brand,
        fontFamily: font.family,
        padding: `clamp(20px,2.5vw,36px) clamp(20px,5vw,80px)`,
        minHeight: '28vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto', width: '100%' }}>

        {/* Main heading */}
        <div
          ref={headRef}
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            marginBottom: 'clamp(24px,3vw,40px)',
          }}
        >
          <h2 style={{
            fontSize: t.display.size,
            fontWeight: t.display.weight,
            lineHeight: t.display.lh,
            letterSpacing: t.display.ls,
            color: color.white,
            margin: '0 0 clamp(16px,2vw,28px)',
            fontFamily: font.family,
          }}>
            GANGNEUNG PAY
          </h2>
          <p style={{
            fontSize: t.lead.size, fontWeight: 600,
            lineHeight: t.lead.lh,
            color: 'rgba(255,255,255,0.72)',
            margin: 0, fontFamily: font.family,
            wordBreak: 'keep-all',
          }}>
            내 돈이 내 편인 앱, 강릉페이
          </p>
        </div>

        {/* Credits */}
        <div
          ref={creditsRef}
          style={{
            opacity: creditsVisible ? 1 : 0,
            transform: creditsVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: 'rgba(255,255,255,0.5)',
            margin: '0 0 24px', fontFamily: font.family,
          }}>
            Team 마카모예
          </p>

          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: 'nowrap',
            gap: isMobile ? 'clamp(4px,0.5vw,8px)' : 'clamp(4px,0.6vw,10px)',
            marginBottom: 'clamp(24px,3vw,40px)',
          }}>
            {MEMBERS.map((m, i) => (
              <div
                key={m.name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  padding: 'clamp(8px,1vw,12px) clamp(8px,1vw,14px)',
                  borderLeft: '2px solid rgba(255,255,255,0.18)',
                  opacity: creditsVisible ? 1 : 0,
                  transition: `opacity 0.5s ease-out ${i * 0.08}s`,
                  flex: isMobile ? 'none' : 1,
                  minWidth: 0,
                }}
              >
                <p style={{
                  fontSize: 'clamp(13px,1vw,15px)', fontWeight: 700,
                  color: color.white, margin: 0,
                  fontFamily: font.family, lineHeight: 1.2,
                }}>
                  {m.name}
                </p>
                {m.role ? (
                  <p style={{
                    fontSize: 'clamp(9px,0.7vw,11px)', lineHeight: 1.4,
                    color: 'rgba(255,255,255,0.55)',
                    margin: 0, fontFamily: font.family,
                    wordBreak: 'break-word',
                  }}>
                    {m.role}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          {/* Footer line */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: 'clamp(20px,2.5vw,32px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}>
            <p style={{
              fontSize: t.caption.size, lineHeight: t.caption.lh,
              color: 'rgba(255,255,255,0.5)',
              margin: 0, fontFamily: font.family,
            }}>
              한림대학교 디지털인문예술전공 UX 디자인
            </p>
            <p style={{
              fontSize: t.caption.size, lineHeight: t.caption.lh,
              color: 'rgba(255,255,255,0.35)',
              margin: 0, fontFamily: font.family,
            }}>
              2026 Gangeneung Pay Redesign UX Project
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
