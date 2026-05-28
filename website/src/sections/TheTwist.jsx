import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import bbeforeImg from '../assets/bbefore.png';
import beforeImg from '../assets/before.png';

export default function TheTwist() {
  const [ref, visible] = useReveal({ threshold: 0.1 });
  const [imgRef, imgVisible] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="twist"
      style={{
        background: color.white,
        fontFamily: font.family,
        padding: `${layout.sectionY} clamp(20px,5vw,80px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(28px)',
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
              lineHeight: t.eyebrow.lh,
              color: color.brand,
              margin: '0 0 24px',
            }}
          >
            The Twist
          </p>

          <h2
            style={{
              fontSize: t.h1.size,
              fontWeight: t.h1.weight,
              lineHeight: t.h1.lh,
              letterSpacing: t.h1.ls,
              color: color.ink,
              margin: '0 0 24px',
              wordBreak: 'keep-all',
            }}
          >
            프로젝트 시작 2주차 도중, 강릉페이 앱이 전면{' '}
            <em style={{ color: color.brand, fontStyle: 'normal' }}>리뉴얼</em>
            됐습니다.
          </h2>

          <p
            style={{
              fontSize: t.lead.size,
              fontWeight: t.lead.weight,
              lineHeight: t.lead.lh,
              color: color.inkMuted,
              margin: 0,
              wordBreak: 'keep-all',
            }}
          >
            1차적으로 해결하려던 문제들은 해결되었지만, 대규모 업데이트 이후에도 남아있는 진짜 문제들을 찾고, 사용자의 입장에서 생각할 수 있는 계기가 되었습니다.
          </p>
        </div>

        {/* Before/After 비교 비주얼 */}
        <div
          ref={imgRef}
          style={{
            opacity: imgVisible ? 1 : 0,
            transform: imgVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out 0.15s, transform 0.7s ease-out 0.15s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(16px,3vw,40px)',
          }}
        >
          <div style={{ flex: '0 0 clamp(160px,26%,320px)' }}>
            <p style={{
              fontSize: 11, fontWeight: 700, color: color.inkMuted,
              textTransform: 'uppercase', letterSpacing: '0.04em',
              margin: '0 0 12px',
            }}>
              프로젝트 시작 화면
            </p>
            <div style={{ aspectRatio: '9/16', borderRadius: '36px', overflow: 'hidden', background: color.line }}>
              <img
                src={bbeforeImg}
                alt="프로젝트 시작 시점 강릉페이 화면"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>

          {/* 화살표 */}
          <div style={{ flexShrink: 0, color: color.brand }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={{ flex: '0 0 clamp(160px,26%,320px)' }}>
            <p style={{
              fontSize: 11, fontWeight: 700, color: color.brand,
              textTransform: 'uppercase', letterSpacing: '0.04em',
              margin: '0 0 12px',
            }}>
              리뉴얼 후 화면
            </p>
            <div style={{ aspectRatio: '9/16', borderRadius: '36px', overflow: 'hidden', background: color.line }}>
              <img
                src={beforeImg}
                alt="중간 리뉴얼 시점 강릉페이 화면"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
