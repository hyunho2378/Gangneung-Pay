import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';

const GROUPS = [
  {
    priority: 'P0',
    label: 'MUST HAVE',
    items: [
      { code: 'UR-U01', desc: '앱 미실행 → 위젯/잠금화면 잔액 즉시 확인' },
      { code: 'UR-U02', desc: '충전 화면 진입 즉시 현재 잔액 상단 표시' },
      { code: 'UR-U03', desc: '메인에서 2탭 이내 환불 접근' },
      { code: 'UR-F01', desc: "충전잔액(내 돈) vs 캐시백(보상) 색상, 레이블 명확 구분" },
      { code: 'UR-F02', desc: 'B2C 화면에 B2B 기능 미노출' },
      { code: 'UR-N02', desc: "사용자 언어 기준 메뉴명 ('강릉머니' 제거)" },
    ],
  },
  {
    priority: 'P1',
    label: 'SHOULD HAVE',
    items: [
      { code: 'UR-U05', desc: '잔액 부족 예상 시 사전 알림' },
      { code: 'UR-U06', desc: '가맹점 지도 영업시간, 사진, 결제가능 단일 화면' },
      { code: 'UR-F03', desc: '월별 캐시백 이력, 잔여한도 조회' },
      { code: 'UR-N03', desc: '섹션 이동 시에도 색상, 폰트 일관' },
    ],
  },
];

function UrRow({ index, desc, priority, visible, delay }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(16px,2.5vw,32px)',
        padding: 'clamp(14px,1.8vw,20px) 0',
        borderBottom: `1px solid ${color.line}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(12px)',
        transition: `opacity 0.55s ease-out ${delay}s, transform 0.55s ease-out ${delay}s`,
      }}
    >
      {/* Index badge */}
      <span style={{ fontSize: 11, fontWeight: 800, color: color.brand, background: color.brandPale, padding: '3px 10px', borderRadius: 100, fontFamily: font.family, whiteSpace: 'nowrap', flexShrink: 0, minWidth: '2ch', textAlign: 'center' }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Description */}
      <span
        style={{
          flex: 1,
          fontSize: 13,
          fontWeight: 500,
          lineHeight: 1.55,
          color: color.ink,
          fontFamily: font.family,
        }}
      >
        {desc}
      </span>

    </div>
  );
}

export default function UserRequirements() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [p0Ref, p0Visible] = useReveal({ threshold: 0.03 });
  const [p1Ref, p1Visible] = useReveal({ threshold: 0.03 });
  const { isMobile } = useBreakpoint();

  const groupRefs = [[p0Ref, p0Visible], [p1Ref, p1Visible]];

  return (
    <section
      id="requirements"
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
            marginBottom: 'clamp(48px,6vw,80px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px',
          }}>
            USER REQUIREMENTS
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: 0,
            wordBreak: 'keep-all',
          }}>
            사용자 행동 데이터에서 도출한 요구사항.
          </h2>
        </div>

        {/* P0 + P1 groups, 2-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 'clamp(24px,3vw,48px)' }}>
        {GROUPS.map(({ priority, label, items }, gi) => {
          const [ref, visible] = groupRefs[gi];
          const isPrimary = priority === 'P0';

          return (
            <div
              key={priority}
              ref={ref}
            >
              {/* Group header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 16,
                  marginBottom: 'clamp(16px,2vw,24px)',
                  paddingBottom: 'clamp(16px,2vw,24px)',
                  borderBottom: `2px solid ${isPrimary ? color.brand : color.line}`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : 'translateY(20px)',
                  transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                }}
              >
                <span style={{
                  fontSize: 'clamp(40px,5.5vw,72px)',
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: isPrimary ? color.brand : color.inkMuted,
                  fontFamily: font.family,
                }}>
                  {priority}
                </span>
                <span style={{
                  fontSize: 13, fontWeight: t.eyebrow.weight,
                  letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                  color: isPrimary ? color.brand : color.inkFaint,
                  fontFamily: font.family,
                }}>
                  {label}
                </span>
                <span style={{
                  marginLeft: 'auto',
                  fontSize: 11, fontWeight: 600,
                  color: color.inkFaint,
                  fontFamily: font.family,
                }}>
                  {items.length}개 항목
                </span>
              </div>

              {/* Rows */}
              <div>
                {items.map((item, ri) => (
                  <UrRow
                    key={item.code}
                    index={ri}
                    desc={item.desc}
                    priority={priority}
                    visible={visible}
                    delay={ri * 0.05}
                  />
                ))}
              </div>
            </div>
          );
        })}
        </div>

      </div>
    </section>
  );
}
