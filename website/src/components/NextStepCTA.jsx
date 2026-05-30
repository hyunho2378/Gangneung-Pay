import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { color, font, type as t, layout } from '../tokens/web.js';

export default function NextStepCTA({ label, to }) {
  return (
    <div
      style={{
        background: color.bg,
        fontFamily: font.family,
        padding: `clamp(32px,4vw,56px) clamp(20px,5vw,80px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <Link
          to={to}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: color.brand,
            borderRadius: layout.rLg,
            padding: 'clamp(28px,3.5vw,48px) clamp(28px,4vw,56px)',
            textDecoration: 'none',
            transition: 'opacity 0.18s, transform 0.18s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '0.88';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <div>
            <p style={{
              fontSize: t.eyebrow.size,
              fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls,
              textTransform: t.eyebrow.transform,
              color: color.whiteA60,
              margin: '0 0 10px',
              fontFamily: font.family,
            }}>
              다음
            </p>
            <p style={{
              fontSize: 'clamp(22px,2.8vw,40px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.18,
              color: color.white,
              margin: 0,
              fontFamily: font.family,
              wordBreak: 'keep-all',
            }}>
              {label}
            </p>
          </div>
          <ArrowRight
            size={32}
            color={color.white}
            strokeWidth={2.2}
            style={{ flexShrink: 0, marginLeft: 24 }}
          />
        </Link>
      </div>
    </div>
  );
}
