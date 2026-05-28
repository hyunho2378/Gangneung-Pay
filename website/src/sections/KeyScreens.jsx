import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import PhoneFrame from '../mini/PhoneFrame.jsx';
import RefundMini from '../mini/RefundMini.jsx';

const SCREENS = [
  {
    id: 'S2',
    strategy: 'S2',
    title: '환불 동등 위계',
    problem: '환불 메뉴를 찾지 못해 탐색 실패',
    solution: '잔액 카드에 충전, 환불, QR결제 3슬롯 동일 위계 배치',
    tobeLabel: '환불 화면: 잔액 카드 + 환불 내역',
  },
];

function AsIsPlaceholder({ scale = 0.62, screenHeight = 600 }) {
  const LOGICAL_WIDTH = 390;
  const frameW = LOGICAL_WIDTH * scale;
  const frameH = screenHeight * scale;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: `20px 0` }}>
      <div style={{
        width: `${frameW + 16}px`,
        borderRadius: '36px',
        backgroundColor: color.line,
        padding: '8px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        border: `1px solid ${color.line}`,
      }}>
        <div style={{
          width: `${frameW}px`,
          height: `${frameH}px`,
          borderRadius: '28px',
          overflow: 'hidden',
          backgroundColor: '#D1D5DB',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
          <span style={{
            fontSize: 10, color: 'rgba(0,0,0,0.25)',
            fontFamily: font.family, textAlign: 'center',
            padding: '0 16px',
          }}>
            스크린샷 교체 예정
          </span>
        </div>
      </div>
    </div>
  );
}

function ToBe({ id }) {
  if (id === 'S2') return <PhoneFrame scale={0.62} screenHeight={640}><RefundMini step="list" /></PhoneFrame>;
  return null;
}

function ScreenPair({ screen, visible, delay }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(32px)',
        transition: `opacity 0.65s ease-out ${delay}s, transform 0.65s ease-out ${delay}s`,
        marginBottom: 'clamp(48px,6vw,80px)',
      }}
    >
      {/* Section label */}
      <div style={{ marginBottom: 'clamp(24px,3vw,40px)' }}>
        <h3 style={{
          fontSize: t.h2.size, fontWeight: t.h2.weight,
          lineHeight: t.h2.lh, letterSpacing: t.h2.ls,
          color: color.ink, margin: 0, fontFamily: font.family,
          wordBreak: 'keep-all',
        }}>
          {screen.title}
        </h3>
      </div>

      {/* AS-IS / TO-BE pair */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(24px,4vw,64px)',
        alignItems: 'start',
      }}>

        {/* AS-IS */}
        <div>
          <div style={{ filter: 'grayscale(1)', opacity: 0.7, transform: 'scale(0.9)', transformOrigin: 'top center' }}>
            <AsIsPlaceholder scale={0.62} screenHeight={640} />
          </div>
          <p style={{
            fontSize: t.caption.size, fontWeight: t.caption.weight,
            lineHeight: t.caption.lh, color: color.inkMuted,
            margin: '12px auto 0', textAlign: 'center',
            fontFamily: font.family,
          }}>
            {screen.problem}
          </p>
        </div>

        {/* TO-BE */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 16,
          }}>
            <span style={{
              fontSize: 11, fontWeight: 800,
              letterSpacing: '0em', textTransform: 'uppercase',
              color: color.brand, fontFamily: font.family,
            }}>TO-BE</span>
            <div style={{ flex: 1, height: 1, background: color.brand, opacity: 0.3 }} />
          </div>
          <ToBe id={screen.id} />
          <p style={{
            fontSize: t.caption.size, fontWeight: t.caption.weight,
            lineHeight: t.caption.lh, color: color.inkMuted,
            margin: '12px auto 0', textAlign: 'center',
            fontFamily: font.family,
          }}>
            {screen.solution}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function KeyScreens() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [bodyRef, bodyVisible] = useReveal({ threshold: 0.02 });

  return (
    <section
      id="key-screens"
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
            marginBottom: 'clamp(56px,7vw,96px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px',
          }}>
            KEY SCREENS
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: 0,
            wordBreak: 'keep-all',
          }}>
            4개의 전략이 화면이 됩니다.
          </h2>
        </div>

        {/* Screen pairs */}
        <div ref={bodyRef}>
          {SCREENS.map((screen, i) => (
            <ScreenPair
              key={screen.id}
              screen={screen}
              visible={bodyVisible}
              delay={i * 0.1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
