import { useState } from 'react';
import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';
import iaSvg from '../assets/ia.svg';

export default function InformationArchitecture() {
  const [headRef, headVisible] = useReveal({ threshold: 0.1 });
  const [imgRef, imgVisible] = useReveal({ threshold: 0.03 });
  const { isMobile } = useBreakpoint();
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        id="ia"
        style={{
          background: color.bg,
          fontFamily: font.family,
          padding: `${layout.sectionY} 0`,
        }}
      >
        {/* Header */}
        <div
          ref={headRef}
          style={{
            padding: `0 clamp(20px,5vw,80px)`,
            maxWidth: layout.container,
            margin: `0 auto clamp(40px,5vw,64px)`,
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px',
          }}>
            INFORMATION ARCHITECTURE
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.brand, margin: '0 0 16px', wordBreak: 'keep-all',
          }}>
            정보를 다시 배열했습니다.
          </h2>
          <p style={{
            fontSize: t.lead.size, fontWeight: 500,
            lineHeight: t.lead.lh, color: color.brand,
            margin: 0,
          }}>
            햄버거 메뉴를 걷어내고 바텀 네비게이션 5개로 재편했습니다.
          </p>
        </div>

        {/* SVG */}
        <div
          ref={imgRef}
          style={{
            paddingLeft: 'clamp(20px,5vw,80px)',
            paddingRight: 'clamp(20px,5vw,80px)',
            paddingBottom: 8,
            opacity: imgVisible ? 1 : 0,
            transform: imgVisible ? 'none' : 'translateY(24px)',
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
                  src={iaSvg}
                  alt="강릉페이 정보 구조도"
                  style={{ width: '100%', maxWidth: 1100, height: 'auto', display: 'block', margin: '0 auto' }}
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
              src={iaSvg}
              alt="강릉페이 정보 구조도"
              style={{ width: '100%', maxWidth: 1100, height: 'auto', display: 'block', margin: '0 auto' }}
            />
          )}
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
            src={iaSvg}
            alt="강릉페이 정보 구조도"
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
