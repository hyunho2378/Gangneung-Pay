import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';

const FLOWS = [
  {
    num: '①',
    label: '신규 사용자 온보딩',
    nodes: [
      '스플래시',
      '홈\n(카드신청 스포트라이트)',
      '카드신청',
      '신청완료',
      '배송알림',
      '카드등록',
      '등록완료\n(충전 코치마크)',
    ],
  },
  {
    num: '②',
    label: 'QR결제 (바텀탭 중앙)',
    nodes: ['홈', 'QR결제', '카메라 스캔', '결제완료'],
    tag: { index: 3, text: '캐시백 자동적립' },
  },
  {
    num: '③',
    label: '충전, 잔액확인, 환불',
    nodes: ['홈\n(잔액카드)', '충전', '금액선택', '충전완료\n(잔액반영)'],
    branch: [
      '환불',
      '환불가능\n충전내역',
      '환불 확인\n다이얼로그',
      '환불완료',
    ],
  },
];

function Node({ text, dashed = false }) {
  return (
    <div
      style={{
        padding: '10px 18px',
        borderRadius: 12,
        background: color.white,
        border: `2px ${dashed ? 'dashed' : 'solid'} ${color.brand}`,
        fontSize: t.body.size,
        fontWeight: 600,
        color: dashed ? color.inkMuted : color.ink,
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
        minWidth: 96,
        maxWidth: 200,
        lineHeight: 1.4,
        flexShrink: 0,
        wordBreak: 'keep-all',
      }}
    >
      {text}
    </div>
  );
}

function SolidArrow() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        width: 36,
      }}
    >
      <div
        style={{
          flex: 1,
          height: 2,
          background: color.brand,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -1,
            top: -4,
            width: 0,
            height: 0,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft: `7px solid ${color.brand}`,
          }}
        />
      </div>
    </div>
  );
}

function DashedArrow() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        width: 36,
      }}
    >
      <div
        style={{
          flex: 1,
          height: 2,
          background: `repeating-linear-gradient(to right, ${color.brand} 0, ${color.brand} 4px, transparent 4px, transparent 8px)`,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -1,
            top: -4,
            width: 0,
            height: 0,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft: `7px solid ${color.brand}`,
          }}
        />
      </div>
    </div>
  );
}

function DownArrow({ dashed = false }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: 28, alignItems: 'center' }}>
      <div style={{
        width: 2,
        height: 18,
        background: dashed ? 'transparent' : color.brand,
        borderLeft: dashed ? `2px dashed ${color.brand}` : 'none',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          bottom: -1,
          left: -4,
          width: 0,
          height: 0,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: `7px solid ${color.brand}`,
        }} />
      </div>
    </div>
  );
}

function FlowRow({ flow, visible, delay, isMobile }) {
  const label = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
      <span style={{ fontSize: t.caption.size, fontWeight: 800, color: color.brand, letterSpacing: '0.02em' }}>
        {flow.num}
      </span>
      <span style={{ fontSize: t.caption.size, fontWeight: 700, color: color.inkMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {flow.label}
      </span>
    </div>
  );

  if (isMobile) {
    return (
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
        marginBottom: 'clamp(24px,3vw,40px)',
      }}>
        {label}
        {/* Main flow: vertical */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {flow.nodes.map((node, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              {flow.tag?.index === i && (
                <div style={{
                  background: color.brand, color: color.white,
                  fontSize: 10, fontWeight: 700, padding: '2px 8px',
                  borderRadius: 4, whiteSpace: 'nowrap', marginBottom: 4,
                }}>
                  {flow.tag.text}
                </div>
              )}
              <Node text={node} />
              {i < flow.nodes.length - 1 && <DownArrow />}
            </div>
          ))}
        </div>
        {/* Branch: vertical below main */}
        {flow.branch && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
            <DownArrow dashed />
            {flow.branch.map((node, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Node text={node} dashed />
                {i < flow.branch.length - 1 && <DownArrow dashed />}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
        marginBottom: 'clamp(24px,3vw,40px)',
      }}
    >
      {label}

      {/* Main flow nodes */}
      <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', paddingBottom: flow.branch ? 0 : 4 }}>
        {flow.nodes.map((node, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <Node text={node} />
              {flow.tag?.index === i && (
                <div style={{
                  position: 'absolute', top: -22, left: '50%',
                  transform: 'translateX(-50%)',
                  background: color.brand, color: color.white,
                  fontSize: '10px', fontWeight: 700, padding: '2px 8px',
                  borderRadius: 4, whiteSpace: 'nowrap',
                }}>
                  {flow.tag.text}
                </div>
              )}
            </div>
            {i < flow.nodes.length - 1 && <SolidArrow />}
          </div>
        ))}
      </div>

      {/* Branch */}
      {flow.branch && (
        <div style={{ position: 'relative', marginTop: 20 }}>
          <div style={{
            position: 'absolute',
            top: -20,
            left: 48,
            height: 20,
            borderLeft: `2px dashed ${color.brand}`,
          }} />
          <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', paddingBottom: 4 }}>
            {flow.branch.map((node, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <Node text={node} dashed />
                {i < flow.branch.length - 1 && <DashedArrow />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function UserFlow() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [flowRef, flowVisible] = useReveal({ threshold: 0.03 });
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="user-flow"
      style={{
        background: color.white,
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
            marginBottom: 'clamp(48px,6vw,80px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px',
          }}>
            USER FLOW
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: '0 0 16px', wordBreak: 'keep-all',
          }}>
            세 갈래의 핵심 흐름을 다시 그렸습니다.
          </h2>
          <p style={{
            fontSize: t.lead.size, fontWeight: 500,
            lineHeight: t.lead.lh, color: color.inkMuted,
            margin: 0,
          }}>
            온보딩과 QR결제, 충전, 잔액확인, 환불 등 사용자가 실제로 거치는 경로를 재설계했습니다.
          </p>
        </div>

        <div ref={flowRef}>
          {FLOWS.map((flow, i) => (
            <FlowRow
              key={flow.num}
              flow={flow}
              visible={flowVisible}
              delay={i * 0.12}
              isMobile={isMobile}
            />
          ))}
        </div>


      </div>
    </section>
  );
}
