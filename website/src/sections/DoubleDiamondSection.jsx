import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const PHASES = [
  {
    id: 'D1',
    label: 'Discover',
    detail: '데스크 리서치, 서비스 사파리, 심층 인터뷰, 설문',
  },
  {
    id: 'D2',
    label: 'Define',
    detail: '어피니티, Key Insight, AS-IS 감사, 페르소나, 저니맵',
  },
  {
    id: 'D3',
    label: 'Develop',
    detail: '디자인 디렉션, UX 컨셉, 전략, IA 재설계, 디자인 시스템',
  },
  {
    id: 'D4',
    label: 'Deliver',
    detail: '핵심 화면, 유저 플로우, 프로토타입, 유저 테스트',
  },
];

function DiagramBlock() {
  return (
    <div style={{ maxWidth: 560, margin: '0 auto' }}>
      <img
        src="/ddp.svg"
        alt="더블 다이아몬드 프로세스"
        style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto clamp(10px,1.5vw,16px)' }}
      />
      <p style={{
        textAlign: 'center',
        fontSize: 11, fontWeight: 800,
        color: color.brand, letterSpacing: '0.06em', textTransform: 'uppercase',
        margin: '0 0 clamp(12px,1.5vw,18px)',
        fontFamily: font.family,
      }}>
        URQ : 리서치를 요구사항으로 수렴한 지점
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'clamp(6px,1.2vw,16px)',
      }}>
        {PHASES.map(p => (
          <div key={p.id} style={{ textAlign: 'center' }}>
            <span style={{
              display: 'block',
              fontSize: t.eyebrow.size, fontWeight: 800,
              color: color.brand, letterSpacing: '0.04em',
              fontFamily: font.family, lineHeight: 1.2,
            }}>
              {p.id}
            </span>
            <span style={{
              display: 'block',
              fontSize: 13, fontWeight: 700,
              color: color.ink, margin: '3px 0 5px',
              fontFamily: font.family,
            }}>
              {p.label}
            </span>
            <span style={{
              display: 'block',
              fontSize: 11, color: color.inkMuted,
              lineHeight: 1.55, wordBreak: 'keep-all',
              fontFamily: font.family,
            }}>
              {p.detail}
            </span>
          </div>
        ))}
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
          <DiagramBlock />
        </div>

      </div>
    </section>
  );
}
