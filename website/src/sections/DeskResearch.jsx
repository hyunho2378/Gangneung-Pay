import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';
import testImg from '../assets/test-1.png';

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
  const [verifyRef, verifyVisible] = useReveal({ threshold: 0.05 });
  const { isMobile } = useBreakpoint();

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
          {isMobile ? (
            /* Mobile: each row → card */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {TABLE.rows.map((row, ri) => (
                <div
                  key={ri}
                  style={{
                    borderRadius: layout.rMd,
                    border: `1px solid ${color.line}`,
                    overflow: 'hidden',
                  }}
                >
                  {/* Row label */}
                  <div style={{
                    padding: '10px 16px',
                    background: color.bg,
                    fontSize: 12, fontWeight: 800,
                    color: color.inkMuted, textTransform: 'uppercase',
                    letterSpacing: '0.06em', fontFamily: font.family,
                  }}>
                    {row[0]}
                  </div>
                  {/* Service values */}
                  {TABLE.headers.slice(1).map((h, ci) => (
                    <div
                      key={ci}
                      style={{
                        padding: '11px 16px',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
                        background: ci === 0 ? color.brandPale : color.white,
                        borderTop: `1px solid ${color.line}`,
                      }}
                    >
                      <span style={{
                        fontSize: 13, fontWeight: 700,
                        color: ci === 0 ? color.brand : color.inkMuted,
                        flexShrink: 0, fontFamily: font.family,
                      }}>
                        {h}
                      </span>
                      <span style={{
                        fontSize: 14, fontWeight: ci === 0 ? 700 : 500,
                        color: ci === 0 ? color.brand : color.ink,
                        textAlign: 'right', fontFamily: font.family,
                      }}>
                        {row[ci + 1]}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            /* Desktop: grid table */
            <div
              style={{
                borderRadius: layout.rLg,
                border: `1px solid ${color.brand}`,
                overflow: 'hidden',
              }}
            >
              <div style={{ overflowX: 'auto' }}>
              {/* Header row */}
              <div style={{ display: 'grid', gridTemplateColumns: COL, minWidth: 560 }}>
                {TABLE.headers.map((h, i) => (
                  <div
                    key={h}
                    style={{
                      padding: '14px 20px',
                      background: i === 1 ? color.brand : color.bg,
                      color: i === 1 ? color.white : color.inkMuted,
                      fontSize: 15, fontWeight: 700,
                      letterSpacing: '0em', textTransform: 'uppercase',
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
                  style={{ display: 'grid', gridTemplateColumns: COL, minWidth: 560 }}
                >
                  {row.map((cell, ci) => (
                    <div
                      key={ci}
                      style={{
                        padding: '16px 20px',
                        background: ci === 1 ? color.brandPale : color.white,
                        color: ci === 0 ? color.inkMuted : ci === 1 ? color.brand : color.ink,
                        fontSize: 18,
                        fontWeight: ci === 0 ? 700 : ci === 1 ? 700 : 500,
                        letterSpacing: ci === 0 ? '0em' : '-0.01em',
                        textTransform: ci === 0 ? 'uppercase' : 'none',
                        borderRight: ci < row.length - 1 ? `1px solid ${color.line}` : 'none',
                        fontFamily: font.family, lineHeight: 1.5,
                      }}
                    >
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
              </div>
            </div>
          )}
        </div>

        {/* 실무 검증 */}
        <div
          ref={verifyRef}
          style={{
            opacity: verifyVisible ? 1 : 0,
            transform: verifyVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginTop: 'clamp(40px,5vw,64px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.inkMuted, margin: '0 0 12px', fontFamily: font.family,
          }}>
            실무 검증
          </p>
          <p style={{
            fontSize: t.body.size, fontWeight: 500,
            lineHeight: t.body.lh, color: color.inkMuted,
            margin: '0 0 clamp(20px,2.5vw,32px)', fontFamily: font.family,
            wordBreak: 'keep-all',
          }}>
            강릉시청 강릉페이 담당자와 운영대행사(코나아이) 실무 자문을 통해 개선 방향을 검증했습니다.
          </p>
          <div style={{ maxWidth: isMobile ? '100%' : 520 }}>
            <img
              src={testImg}
              alt="강릉시청 강릉페이 담당자 회신"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: layout.rMd }}
            />
            <p style={{
              fontSize: t.caption.size, lineHeight: t.caption.lh,
              color: color.inkMuted, margin: '8px 0 0', fontFamily: font.family,
            }}>
              강릉시청 강릉페이 담당자 회신
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
