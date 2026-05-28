import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const TABLE = {
  headers: ['항목', '강릉페이', '삼성페이', '토스', '카카오페이'],
  rows: [
    ['결제방식', '실물카드(+바코드)', 'MST/NFC 탭', '앱 바코드', '앱 바코드'],
    ['캐시백', '10% (강력)', '카드사별', '일부', '일부'],
    ['사용범위', '강릉시 한정', '전국', '전국', '전국'],
    ['UI완성도', '공공앱 수준', '네이티브 최적화', '핀테크 최고', '핀테크 최고'],
  ],
};

const COL = '1.2fr 1.5fr 1fr 1fr 1fr';

export default function DeskResearch() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [tableRef, tableVisible] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="research"
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
            marginBottom: 'clamp(40px,5vw,64px)',
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
            Desk Research
          </p>
          <h2
            style={{
              fontSize: t.h1.size,
              fontWeight: t.h1.weight,
              lineHeight: t.h1.lh,
              letterSpacing: t.h1.ls,
              color: color.ink,
              margin: 0,
              wordBreak: 'keep-all',
            }}
          >
            10% 캐시백이라는 강력한 혜택, 그런데 왜 쓰지 않을까요?
          </h2>
        </div>

        {/* Comparison table */}
        <div
          ref={tableRef}
          style={{
            opacity: tableVisible ? 1 : 0,
            transform: tableVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 0,
          }}
        >
          <div
            style={{
              borderRadius: layout.rLg,
              border: `1px solid ${color.brand}`,
              overflow: 'hidden',
            }}
          >
            {/* Header row */}
            <div style={{ display: 'grid', gridTemplateColumns: COL }}>
              {TABLE.headers.map((h, i) => (
                <div
                  key={h}
                  style={{
                    padding: '14px 20px',
                    background: i === 1 ? color.brand : color.bg,
                    color: i === 1 ? color.white : color.inkMuted,
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: '0em',
                    textTransform: 'uppercase',
                    borderRight: i < TABLE.headers.length - 1 ? `1px solid ${color.line}` : 'none',
                    fontFamily: font.family,
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {TABLE.rows.map((row, ri) => (
              <div
                key={ri}
                style={{
                  display: 'grid',
                  gridTemplateColumns: COL,
                }}
              >
                {row.map((cell, ci) => (
                  <div
                    key={ci}
                    style={{
                      padding: '16px 20px',
                      background: ci === 1 ? color.brandPale : color.white,
                      color: ci === 0 ? color.inkMuted : ci === 1 ? color.brand : color.ink,
                      fontSize: ci === 0 ? 18 : 18,
                      fontWeight: ci === 0 ? 700 : ci === 1 ? 700 : 500,
                      letterSpacing: ci === 0 ? '0em' : '-0.01em',
                      textTransform: ci === 0 ? 'uppercase' : 'none',
                      borderRight: ci < row.length - 1 ? `1px solid ${color.line}` : 'none',
                      fontFamily: font.family,
                      lineHeight: 1.5,
                    }}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
