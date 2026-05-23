import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const TYPE_SCALE = [
  { label: 'Display',  token: t.display, sample: '강릉페이' },
  { label: 'H1',       token: t.h1,      sample: '다시 설계했습니다' },
  { label: 'H2',       token: t.h2,      sample: '7가지 전략' },
  { label: 'H3',       token: t.h3,      sample: '위젯 잔액 노출' },
  { label: 'Lead',     token: t.lead,    sample: '사용자 경험을 처음부터 다시' },
  { label: 'Body',     token: t.body,    sample: '메인 화면에서 2탭 이내 환불 접근' },
  { label: 'Caption',  token: t.caption, sample: '조사기간 2026.03.29 — 04.06' },
  { label: 'Eyebrow',  token: t.eyebrow, sample: 'USER RESEARCH' },
];

const PALETTE = [
  { name: 'Brand',      hex: '#1D4ED8', value: color.brand,    onDark: true  },
  { name: 'BrandPale',  hex: '#EEF2FF', value: color.brandPale, onDark: false },
  { name: 'BrandSky',   hex: '#F1F7FF', value: color.brandSky,  onDark: false },
  { name: 'Bg',         hex: '#F5F5F5', value: color.bg,        onDark: false },
  { name: 'White',      hex: '#FFFFFF', value: color.white,     onDark: false },
  { name: 'Ink',        hex: '#111111', value: color.ink,       onDark: true  },
  { name: 'InkMuted',   hex: '#5F6168', value: color.inkMuted,  onDark: true  },
  { name: 'Warn',       hex: '#E5484D', value: color.warn,      onDark: true  },
  { name: 'Ok',         hex: '#10B981', value: color.ok,        onDark: true  },
];

function typeSpec(token) {
  const parts = [token.size, `/${token.weight}`];
  if (token.ls) parts.push(token.ls);
  if (token.transform) parts.push(token.transform);
  return parts.join(' · ');
}

export default function DesignSystem() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [typeRef, typeVisible] = useReveal({ threshold: 0.03 });
  const [colorRef, colorVisible] = useReveal({ threshold: 0.03 });

  return (
    <section
      id="design-system"
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
            marginBottom: 'clamp(56px,7vw,96px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px',
          }}>
            DESIGN SYSTEM
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: 0,
          }}>
            타이포그래피와 컬러 시스템
          </h2>
        </div>

        {/* Typography scale */}
        <div
          ref={typeRef}
          style={{
            opacity: typeVisible ? 1 : 0,
            transform: typeVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 'clamp(64px,8vw,112px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.inkFaint, margin: '0 0 20px',
          }}>
            TYPOGRAPHY SCALE
          </p>

          <div style={{ borderTop: `1px solid ${color.line}` }}>
            {TYPE_SCALE.map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 'clamp(16px,2.5vw,40px)',
                  padding: 'clamp(20px,2.5vw,32px) 0',
                  borderBottom: `1px solid ${color.line}`,
                  opacity: typeVisible ? 1 : 0,
                  transform: typeVisible ? 'none' : 'translateY(12px)',
                  transition: `opacity 0.55s ease-out ${i * 0.06}s, transform 0.55s ease-out ${i * 0.06}s`,
                }}
              >
                {/* Label */}
                <span style={{
                  fontSize: 11, fontWeight: 800,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: color.inkFaint, width: '6ch', flexShrink: 0,
                  fontFamily: font.family,
                }}>
                  {row.label}
                </span>

                {/* Live sample */}
                <span style={{
                  flex: 1,
                  fontSize: row.token.size,
                  fontWeight: row.token.weight,
                  lineHeight: row.token.lh ?? 1.3,
                  letterSpacing: row.token.ls ?? 'normal',
                  textTransform: row.token.transform ?? 'none',
                  color: color.ink,
                  fontFamily: font.family,
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {row.sample}
                </span>

                {/* Spec */}
                <span style={{
                  fontSize: 12, fontWeight: 500,
                  color: color.inkFaint,
                  fontFamily: font.family,
                  flexShrink: 0,
                  textAlign: 'right',
                  letterSpacing: '0.01em',
                }}>
                  {typeSpec(row.token)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Color palette */}
        <div
          ref={colorRef}
          style={{
            opacity: colorVisible ? 1 : 0,
            transform: colorVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.inkFaint, margin: '0 0 20px',
          }}>
            COLOR PALETTE
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: 'clamp(8px,1.2vw,16px)',
          }}>
            {PALETTE.map((chip, i) => (
              <div
                key={chip.name}
                style={{
                  opacity: colorVisible ? 1 : 0,
                  transform: colorVisible ? 'none' : 'translateY(16px)',
                  transition: `opacity 0.5s ease-out ${i * 0.05}s, transform 0.5s ease-out ${i * 0.05}s`,
                }}
              >
                {/* Color swatch */}
                <div style={{
                  height: 'clamp(72px,9vw,120px)',
                  backgroundColor: chip.value,
                  borderRadius: layout.rMd,
                  border: chip.hex === '#FFFFFF' || chip.hex === '#F5F5F5' || chip.hex === '#F1F7FF' || chip.hex === '#EEF2FF'
                    ? `1px solid ${color.line}`
                    : 'none',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '10px',
                  marginBottom: '10px',
                }}>
                  <span style={{
                    fontSize: 10, fontWeight: 800,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: chip.onDark ? 'rgba(255,255,255,0.7)' : color.inkFaint,
                    fontFamily: font.family,
                  }}>
                    {chip.hex}
                  </span>
                </div>

                {/* Label */}
                <p style={{
                  margin: 0,
                  fontSize: 13, fontWeight: 700,
                  color: color.ink, fontFamily: font.family,
                  letterSpacing: '-0.01em',
                }}>
                  {chip.name}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
