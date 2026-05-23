import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const CARDS = [
  { label: '10% 캐시백' },
  { label: '지역 한정' },
  { label: '충전식 구조' },
];

export default function ServiceAnalysis() {
  const [headRef, headVisible] = useReveal({ threshold: 0.1 });
  const [cardsRef, cardsVisible] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="service"
      style={{
        background: color.bg,
        fontFamily: font.family,
      }}
    >
      <div
        style={{
          maxWidth: layout.container,
          margin: '0 auto',
          padding: `${layout.sectionY} clamp(20px,5vw,80px) clamp(40px,4vw,64px)`,
        }}
      >
        <div
          ref={headRef}
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <p
            style={{
              fontSize: t.eyebrow.size,
              fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls,
              textTransform: t.eyebrow.transform,
              color: color.brand,
              margin: '0 0 24px',
            }}
          >
            Service Analysis
          </p>
          <h2
            style={{
              fontSize: t.h1.size,
              fontWeight: t.h1.weight,
              lineHeight: t.h1.lh,
              letterSpacing: t.h1.ls,
              color: color.ink,
              margin: 0,
            }}
          >
            강릉페이, 써보셨나요?
          </h2>
        </div>
      </div>

      <div
        ref={cardsRef}
        style={{
          maxWidth: layout.container,
          margin: '0 auto',
          padding: `0 clamp(20px,5vw,80px) clamp(60px,8vw,120px)`,
          display: 'flex',
          gap: 12,
        }}
      >
        {CARDS.map(({ label }, i) => (
          <div
            key={label}
            style={{
              flex: 1,
              opacity: cardsVisible ? 1 : 0,
              transform: cardsVisible ? 'none' : 'translateY(32px)',
              transition: `opacity 0.7s ease-out ${i * 0.1}s, transform 0.7s ease-out ${i * 0.1}s`,
            }}
          >
            <div
              style={{
                background: color.line,
                borderRadius: layout.rLg,
                aspectRatio: '2/3',
                width: '100%',
                marginBottom: 16,
              }}
            />
            <p
              style={{
                fontSize: t.h3.size,
                fontWeight: t.h3.weight,
                lineHeight: t.h3.lh,
                letterSpacing: t.h3.ls,
                color: color.ink,
                margin: 0,
              }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
