import researchData from '../data/research.json';
import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';

export default function KeyInsights() {
  const [r0, v0] = useReveal({ threshold: 0.05 });
  const [r1, v1] = useReveal({ threshold: 0.05 });
  const [r2, v2] = useReveal({ threshold: 0.05 });
  const [r3, v3] = useReveal({ threshold: 0.05 });
  const [r4, v4] = useReveal({ threshold: 0.05 });
  const [r5, v5] = useReveal({ threshold: 0.05 });
  const { isMobile } = useBreakpoint();

  const revealPairs = [[r0, v0], [r1, v1], [r2, v2], [r3, v3], [r4, v4], [r5, v5]];

  return (
    <section id="insights" style={{ background: color.bg, fontFamily: font.family, padding: `${layout.sectionY} clamp(20px,5vw,80px)` }}>
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 'clamp(16px,2vw,24px)' }}>
          {researchData.insights.map(({ no, title, body }, i) => {
            const [ref, vis] = revealPairs[i] || [null, false];
            return (
              <div
                key={no}
                ref={ref}
                style={{
                  background: color.white,
                  borderRadius: layout.rMd,
                  padding: 'clamp(20px,2vw,28px)',
                  opacity: vis ? 1 : 0,
                  transform: vis ? 'none' : 'translateY(28px)',
                  transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                }}
              >
                <p style={{
                  fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                  letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                  color: color.brand, margin: '0 0 12px', fontFamily: font.family,
                }}>
                  KEY INSIGHT {no}
                </p>
                <h3 style={{
                  fontSize: t.h3.size, fontWeight: t.h3.weight,
                  lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
                  color: color.ink, margin: '0 0 16px', fontFamily: font.family,
                  wordBreak: 'keep-all',
                }}>
                  {title}
                </h3>
                <p style={{
                  fontSize: t.caption.size, lineHeight: t.caption.lh,
                  color: color.inkMuted,
                  margin: 0, fontFamily: font.family,
                }}>
                  {body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
