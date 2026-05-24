import researchData from '../data/research.json';
import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const { primary, secondary, reference } = researchData.persona;

export default function Persona() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [primaryRef, primaryVisible] = useReveal({ threshold: 0.05 });
  const [secondaryRef, secondaryVisible] = useReveal({ threshold: 0.05 });
  const [refRef, refVisible] = useReveal({ threshold: 0.05 });

  const eyebrowStyle = {
    fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
    letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
    margin: '0 0 12px', fontFamily: font.family,
  };

  const painItem = (pain) => (
    <div
      key={pain}
      style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}
    >
      <span style={{ color: color.warn, fontWeight: 700, flexShrink: 0, lineHeight: 1.5, fontFamily: font.family }}>
        —
      </span>
      <span style={{ fontSize: 14, color: color.inkMuted, lineHeight: 1.5, fontFamily: font.family }}>
        {pain}
      </span>
    </div>
  );

  return (
    <section
      id="persona"
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
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          <p style={{ ...eyebrowStyle, color: color.brand, margin: '0 0 24px' }}>
            PERSONA
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: 0,
          }}>
            누가 강릉페이를 쓰는가
          </h2>
        </div>

        {/* Primary */}
        <div
          ref={primaryRef}
          style={{
            opacity: primaryVisible ? 1 : 0,
            transform: primaryVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            background: color.brandPale,
            borderRadius: layout.rLg,
            padding: 'clamp(32px,4vw,56px)',
            marginBottom: 'clamp(16px,2vw,24px)',
          }}
        >
          <span style={{
            display: 'inline-block',
            fontSize: 14, fontWeight: 800, letterSpacing: '0em',
            textTransform: 'uppercase',
            background: color.brand, color: color.white,
            padding: '4px 12px', borderRadius: 100,
            marginBottom: 20, fontFamily: font.family,
          }}>
            PRIMARY
          </span>

          <h3 style={{
            fontSize: 'clamp(24px,3vw,40px)', fontWeight: 800,
            lineHeight: 1.22, letterSpacing: '-0.03em',
            color: color.ink, margin: '0 0 10px', fontFamily: font.family,
          }}>
            {primary.name}
          </h3>
          <p style={{
            fontSize: t.lead.size, lineHeight: 1.65,
            color: color.inkMuted, margin: '0 0 32px', fontFamily: font.family,
          }}>
            {primary.trait} · {primary.habit}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(24px,3vw,40px)',
          }}>
            <div>
              <p style={{ ...eyebrowStyle, color: color.brand }}>핵심 동기</p>
              <p style={{
                fontSize: t.h3.size, fontWeight: 700,
                lineHeight: t.h3.lh, color: color.ink,
                margin: '0 0 6px', fontFamily: font.family,
              }}>
                {primary.motivation}
              </p>
            </div>

            <div>
              <p style={{ ...eyebrowStyle, color: color.brand }}>페인포인트</p>
              {primary.pains.map(painItem)}
            </div>
          </div>
        </div>

        {/* Secondary */}
        <div
          ref={secondaryRef}
          style={{
            opacity: secondaryVisible ? 1 : 0,
            transform: secondaryVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            background: color.bg,
            borderRadius: layout.rLg,
            padding: 'clamp(24px,3vw,40px)',
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          <span style={{
            display: 'inline-block',
            fontSize: 11, fontWeight: 800, letterSpacing: '0em',
            textTransform: 'uppercase',
            background: color.inkFaint, color: color.white,
            padding: '4px 12px', borderRadius: 100,
            marginBottom: 20, fontFamily: font.family,
          }}>
            SECONDARY
          </span>

          <h3 style={{
            fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 800,
            lineHeight: 1.22, letterSpacing: '-0.02em',
            color: color.ink, margin: '0 0 10px', fontFamily: font.family,
          }}>
            {secondary.name}
          </h3>
          <p style={{
            fontSize: t.lead.size, lineHeight: 1.65,
            color: color.inkMuted, margin: '0 0 28px', fontFamily: font.family,
          }}>
            {secondary.trait}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(24px,3vw,40px)',
          }}>
            <div>
              <p style={{ ...eyebrowStyle, color: color.inkMuted }}>이탈 트리거</p>
              <p style={{
                fontSize: 14, fontWeight: 700,
                color: color.ink, margin: '0 0 6px', fontFamily: font.family,
              }}>
                {secondary.trigger}
              </p>
              <p style={{
                fontSize: 13, color: color.inkMuted,
                margin: '0 0 12px', fontFamily: font.family,
              }}>
                주결제: {secondary.main_payment}
              </p>
              <p style={{
                fontSize: 13, color: color.inkMuted,
                margin: 0, fontStyle: 'italic', fontFamily: font.family,
              }}>
                &ldquo;{secondary.perception}&rdquo;
              </p>
            </div>

            <div>
              <p style={{ ...eyebrowStyle, color: color.inkMuted }}>페인포인트</p>
              {secondary.pains.map(painItem)}
            </div>
          </div>
        </div>

        {/* Reference */}
        <div
          ref={refRef}
          style={{
            opacity: refVisible ? 1 : 0,
            transform: refVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            display: 'flex',
            gap: 'clamp(24px,4vw,56px)',
            flexWrap: 'wrap',
          }}
        >
          {reference.map(({ name, note }) => (
            <div key={name} style={{ flex: 1, minWidth: 200, paddingTop: 20 }}>
              <p style={{ ...eyebrowStyle, color: color.inkFaint }}>
                REFERENCE
              </p>
              <p style={{
                fontSize: t.h3.size, fontWeight: 700,
                lineHeight: t.h3.lh, color: color.ink,
                margin: '0 0 6px', fontFamily: font.family,
              }}>
                {name}
              </p>
              <p style={{ fontSize: 13, color: color.inkMuted, margin: 0, fontFamily: font.family }}>
                {note}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
