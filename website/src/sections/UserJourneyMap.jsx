import { useState } from 'react';
import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';
import cjmSvg from '../assets/cjm.svg';

export default function UserJourneyMap() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [mapRef, mapVisible] = useReveal({ threshold: 0.03 });
  const { isMobile } = useBreakpoint();
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        id="journey"
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
              USER JOURNEY MAP
            </p>
            <h2 style={{
              fontSize: t.h1.size, fontWeight: t.h1.weight,
              lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
              color: color.ink, margin: 0,
              wordBreak: 'keep-all',
            }}>
              사용자가 겪는 5단계 여정과 마찰점.
            </h2>
          </div>

          <div
            ref={mapRef}
            style={{
              opacity: mapVisible ? 1 : 0,
              transform: mapVisible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            }}
          >
            {isMobile ? (
              <div>
                <div
                  onClick={() => setOpen(true)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={cjmSvg}
                    alt="강릉페이 사용자 여정 지도"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
                <p style={{
                  margin: '8px 0 0',
                  fontSize: 11, fontWeight: 700,
                  color: color.inkFaint,
                  textAlign: 'center',
                  letterSpacing: '0.04em',
                  fontFamily: font.family,
                }}>
                  탭하여 확대
                </p>
              </div>
            ) : (
              <img
                src={cjmSvg}
                alt="강릉페이 사용자 여정 지도"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            )}
          </div>

        </div>
      </section>

      {isMobile && open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.88)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 16, right: 16,
              width: 40, height: 40,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color.white,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
          <img
            src={cjmSvg}
            alt="강릉페이 사용자 여정 지도"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>
      )}
    </>
  );
}
