import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import iaSvg from '../assets/ia.svg';

export default function InformationArchitecture() {
  const [headRef, headVisible] = useReveal({ threshold: 0.1 });
  const [imgRef, imgVisible] = useReveal({ threshold: 0.03 });

  return (
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
          margin: `0 0 clamp(40px,5vw,64px)`,
          textAlign: 'center',
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
          fontSize: t.lead.size, fontWeight: 400,
          lineHeight: t.lead.lh, color: color.brand,
          margin: 0,
        }}>
          햄버거 메뉴를 걷어내고 바텀 네비게이션 5개로 재편했습니다.
        </p>
      </div>

      {/* SVG — centered, responsive */}
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
        <img
          src={iaSvg}
          alt="강릉페이 정보 구조도"
          style={{ width: 1100, height: 351, display: 'block', margin: '0 auto' }}
        />
      </div>
    </section>
  );
}
