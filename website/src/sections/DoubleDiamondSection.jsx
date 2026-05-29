import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

// SVG coordinate space
// D1: left(0,350) top(243,105) right(486,350) bottom(243,595)
// D2: left(494,350) top(737,105) right(980,350) bottom(737,595)
const VW = 980;
const VH = 700;
const S = 245 / 243;

const CALLOUTS = [
  {
    id: 'D1', label: 'Discover',
    detail: '데스크 리서치, 서비스 사파리, 유저 리서치, 앱스토어 리뷰 분석',
    dotX: 121.5, dotY: 350 - S * 121.5,
    lineEndY: 58, side: 'top',
  },
  {
    id: 'D2', label: 'Define',
    detail: '어피니티 다이어그램, Key Insight, AS-IS 감사, 페르소나, 유저 저니맵',
    dotX: 364.6, dotY: 595 - S * (364.6 - 243),
    lineEndY: 648, side: 'bottom',
  },
  {
    id: 'D3', label: 'Develop',
    detail: '디자인 디렉션, UX 컨셉, 전략, 정보 위계 재설계, 듀얼 디자인 시스템',
    dotX: 615.4, dotY: 350 - S * (615.4 - 494),
    lineEndY: 58, side: 'top',
  },
  {
    id: 'D4', label: 'Deliver',
    detail: '핵심 화면, 유저 테스트, 프로토타입 배포',
    dotX: 858.5, dotY: 595 - S * (858.5 - 737),
    lineEndY: 648, side: 'bottom',
  },
];

// Fixed pixel dimensions — SVG block + label space above/below
const DIAG_W = 350;
const SVG_H_CSS = Math.round(DIAG_W * VH / VW); // 350 × 700/980 = 250px
const LABEL_TOP = 120; // px above SVG reserved for top labels
const LABEL_BOT = 130; // px below SVG reserved for bottom labels
const DIAG_H = LABEL_TOP + SVG_H_CSS + LABEL_BOT; // 500px total

// Convert SVG user-units to CSS px within the diagram wrapper
const cx = svgX => (svgX / VW) * DIAG_W;
const cy = svgY => LABEL_TOP + (svgY / VH) * SVG_H_CSS;

function DesktopDiagram() {
  return (
    <div style={{ position: 'relative', width: DIAG_W, height: DIAG_H, margin: '0 auto' }}>

      {/* SVG: polygons first, then vertical dashes on top of white fill, then callout lines/dots */}
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        style={{
          position: 'absolute',
          top: LABEL_TOP,
          left: 0,
          width: DIAG_W,
          height: SVG_H_CSS,
          display: 'block',
          overflow: 'visible',
        }}
        aria-hidden="true"
      >
        {/* Diamond 1 */}
        <polygon
          points="0,350 243,105 486,350 243,595"
          fill={color.white}
          stroke={color.brand}
          strokeWidth={3}
        />
        {/* Diamond 2 */}
        <polygon
          points="494,350 737,105 980,350 737,595"
          fill={color.white}
          stroke={color.brand}
          strokeWidth={3}
        />

        {/* Vertical center dashes — rendered AFTER polygons to appear over white fill */}
        {/* D1: top vertex (243,105) to bottom vertex (243,595) */}
        <line
          x1={243} y1={105} x2={243} y2={595}
          stroke={color.brandPale} strokeWidth={1.5} strokeDasharray="8 8"
        />
        {/* D2: top vertex (737,105) to bottom vertex (737,595) */}
        <line
          x1={737} y1={105} x2={737} y2={595}
          stroke={color.brandPale} strokeWidth={1.5} strokeDasharray="8 8"
        />

        {/* Callout lines + dots */}
        {CALLOUTS.map(c => (
          <g key={c.id}>
            <line
              x1={c.dotX} y1={c.dotY}
              x2={c.dotX} y2={c.lineEndY}
              stroke={color.brand} strokeWidth={1.5} strokeDasharray="4 4" opacity={0.45}
            />
            <circle cx={c.dotX} cy={c.dotY} r={5} fill={color.brand} />
          </g>
        ))}

        {/* URQ waist dot */}
        <circle cx={490} cy={350} r={6} fill={color.brand} />
      </svg>

      {/* Label overlays — positioned in CSS px, no overflow dependency */}
      {CALLOUTS.map(c => (
        <div
          key={c.id}
          style={{
            position: 'absolute',
            left: cx(c.dotX),
            top: cy(c.lineEndY),
            transform: c.side === 'top' ? 'translate(-50%, -100%)' : 'translate(-50%, 0%)',
            textAlign: 'center',
            maxWidth: 80,
            pointerEvents: 'none',
            paddingBottom: c.side === 'top' ? 6 : 0,
            paddingTop: c.side === 'bottom' ? 6 : 0,
          }}
        >
          <span style={{
            display: 'block',
            fontSize: t.eyebrow.size,
            fontWeight: 800,
            color: color.brand,
            lineHeight: 1.2,
            letterSpacing: '0.04em',
            fontFamily: font.family,
          }}>
            {c.id}
          </span>
          <span style={{
            display: 'block',
            fontSize: t.h3.size,
            fontWeight: 800,
            color: color.ink,
            lineHeight: 1.2,
            marginTop: 3,
            fontFamily: font.family,
          }}>
            {c.label}
          </span>
          <span style={{
            display: 'block',
            fontSize: 11,
            color: color.inkMuted,
            lineHeight: 1.55,
            marginTop: 5,
            wordBreak: 'keep-all',
            fontFamily: font.family,
          }}>
            {c.detail}
          </span>
        </div>
      ))}

      {/* URQ label below waist dot */}
      <div style={{
        position: 'absolute',
        left: cx(490),
        top: cy(435),
        transform: 'translate(-50%, 0%)',
        textAlign: 'center',
        maxWidth: 90,
        pointerEvents: 'none',
        paddingTop: 6,
      }}>
        <span style={{
          display: 'block',
          fontSize: 11,
          fontWeight: 800,
          color: color.brand,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          fontFamily: font.family,
          lineHeight: 1.2,
        }}>
          URQ
        </span>
        <span style={{
          display: 'block',
          fontSize: t.caption.size,
          fontWeight: 700,
          color: color.ink,
          marginTop: 3,
          fontFamily: font.family,
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
        }}>
          User Requirements
        </span>
        <span style={{
          display: 'block',
          fontSize: 10,
          color: color.inkMuted,
          lineHeight: 1.5,
          marginTop: 4,
          wordBreak: 'keep-all',
          fontFamily: font.family,
        }}>
          리서치를 요구사항으로 수렴한 지점
        </span>
      </div>

    </div>
  );
}


export default function DoubleDiamondSection() {
  const [headRef, headVisible] = useReveal({ threshold: 0.1 });
  const [diagramRef, diagramVisible] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="double-diamond"
      style={{
        background: color.bg,
        fontFamily: font.family,
        padding: `${layout.sectionY} clamp(20px,5vw,80px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>

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
            lineHeight: t.eyebrow.lh,
            color: color.brand, margin: '0 0 24px',
          }}>
            Double Diamond Process
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: '0 0 16px', wordBreak: 'keep-all',
          }}>
            더블 다이아몬드 프로세스
          </h2>
          <p style={{
            fontSize: t.lead.size, fontWeight: 500,
            lineHeight: t.lead.lh, color: color.inkMuted, margin: 0,
            wordBreak: 'keep-all',
          }}>
            더블 다이아몬드는 문제를 넓게 탐색해 정의하고, 해결안을 넓게 펼쳐 구현하는 디자인 프로세스입니다.
          </p>
        </div>

        <div
          ref={diagramRef}
          style={{
            opacity: diagramVisible ? 1 : 0,
            transform: diagramVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            paddingTop: 32,
          }}
        >
          <DesktopDiagram />
        </div>

      </div>
    </section>
  );
}
