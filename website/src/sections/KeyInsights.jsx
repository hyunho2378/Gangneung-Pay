import researchData from '../data/research.json';
import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

export default function KeyInsights() {
  const [r0, v0] = useReveal({ threshold: 0.05 });
  const [r1, v1] = useReveal({ threshold: 0.05 });
  const [r2, v2] = useReveal({ threshold: 0.05 });
  const [r3, v3] = useReveal({ threshold: 0.05 });

  const revealPairs = [[r0, v0], [r1, v1], [r2, v2], [r3, v3]];

  return (
    <section id="insights" style={{ background: color.bg, fontFamily: font.family, padding: `${layout.sectionY} clamp(20px,5vw,80px)` }}>
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,4vw,56px)' }}>
          {researchData.insights.map(({ no, title, body }, i) => {
            const [ref, vis] = revealPairs[i] || [null, false];
            return (
              <div
                key={no}
                ref={ref}
                style={{
                  background: i % 2 === 0 ? color.white : color.bg,
                  borderRadius: layout.rMd,
                  padding: 'clamp(32px,4vw,56px)',
                  opacity: vis ? 1 : 0,
                  transform: vis ? 'none' : 'translateY(28px)',
                  transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                }}
              >
                <p style={{
                  fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                  letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                  color: color.brand, margin: '0 0 24px', fontFamily: font.family,
                }}>
                  KEY INSIGHT {no}
                </p>
                <h2 style={{
                  fontSize: t.h2.size, fontWeight: t.h2.weight,
                  lineHeight: t.h2.lh, letterSpacing: t.h2.ls,
                  color: color.ink, margin: '0 0 28px', fontFamily: font.family,
                  wordBreak: 'keep-all',
                }}>
                  {title}
                </h2>
                <p style={{
                  fontSize: t.body.size, fontWeight: t.body.weight,
                  lineHeight: t.body.lh, color: color.inkMuted,
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
