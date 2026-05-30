import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { color, font, layout } from '../tokens/web.js';

export default function NextStepCTA({ label, to }) {
  return (
    <div
      style={{
        background: color.bg,
        fontFamily: font.family,
        padding: `clamp(24px,3vw,40px) clamp(20px,5vw,80px)`,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Link
        to={to}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          background: color.brand,
          borderRadius: layout.rLg,
          padding: 'clamp(14px,1.6vw,20px) clamp(20px,2.5vw,32px)',
          textDecoration: 'none',
          width: '100%',
          maxWidth: 'clamp(260px,26vw,380px)',
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
            fontSize: 'clamp(15px,1.4vw,20px)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            color: color.white,
            margin: 0,
            fontFamily: font.family,
            wordBreak: 'keep-all',
          }}>
            {label}
          </p>
        </div>
        <ArrowRight
          size={20}
          color={color.white}
          strokeWidth={2.2}
          style={{ flexShrink: 0 }}
        />
      </Link>
    </div>
  );
}
