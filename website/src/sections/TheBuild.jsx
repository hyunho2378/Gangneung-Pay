import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';
import HomeCoachMini from '../mini/HomeCoachMini.jsx';
import RefundMini from '../mini/RefundMini.jsx';
import iphone14Pro from '../assets/iPhone 14 Pro.svg';

const SEC_PAD = `clamp(40px,6vw,80px) clamp(20px,5vw,80px)`;

// iPhone 14 Pro.svg를 프레임으로 사용하는 AS-IS 플레이스홀더
function IPhoneAsIs({ width = 200 }) {
  return (
    <div style={{ position: 'relative', width, margin: '0 auto', flexShrink: 0 }}>
      <img src={iphone14Pro} alt="" style={{ width: '100%', height: 'auto', display: 'block', filter: 'grayscale(1)', opacity: 0.55 }} />
      <div style={{
        position: 'absolute',
        left: '3.9%', top: '8.8%',
        width: '92.2%', height: '88.7%',
        overflow: 'hidden',
        borderRadius: '8%',
        background: color.line,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 6,
      }}>
        <span style={{ fontSize: 9, fontWeight: 800, color: 'rgba(0,0,0,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: font.family }}>AS-IS</span>
        <span style={{ fontSize: 8, color: 'rgba(0,0,0,0.25)', textAlign: 'center', padding: '0 12px', lineHeight: 1.4, fontFamily: font.family }}>스크린샷 삽입 예정</span>
      </div>
    </div>
  );
}

// iPhone 14 Pro.svg 프레임 안에 TO-BE 미니렌더 (scale fit)
function IPhoneToBe({ children, width = 200 }) {
  return (
    <div style={{ position: 'relative', width, margin: '0 auto', flexShrink: 0 }}>
      <img src={iphone14Pro} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
      <div style={{
        position: 'absolute',
        left: '3.9%', top: '8.8%',
        width: '92.2%', height: '88.7%',
        overflow: 'hidden',
        borderRadius: '8%',
        background: color.brandSky,
      }}>
        <div style={{ width: 390, transform: 'scale(0.47)', transformOrigin: 'top left' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function AsIsToBeRow({ asIs, toBe }) {
  const { isMobile } = useBreakpoint();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 'clamp(24px,4vw,64px)', alignItems: 'start' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: color.inkMuted, fontFamily: font.family }}>AS-IS</span>
          <div style={{ flex: 1, height: 1, background: color.line }} />
        </div>
        {asIs}
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: color.brand, fontFamily: font.family }}>TO-BE</span>
          <div style={{ flex: 1, height: 1, background: color.brand, opacity: 0.3 }} />
        </div>
        {toBe}
      </div>
    </div>
  );
}

function ScreenBlock({ visible, bg, eyebrow, title, sub, flowProblem, flowSolution, body, implBadges, urBadge, toBeContent, delay = 0 }) {
  return (
    <div style={{
      background: bg,
      padding: SEC_PAD,
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(32px)',
      transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
    }}>
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(32px,4vw,56px)' }}>
          <p style={{ margin: '0 0 8px', fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight, letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform, color: color.brand, fontFamily: font.family }}>
            {eyebrow}
          </p>
          <h3 style={{ margin: '0 0 8px', fontSize: t.h2.size, fontWeight: t.h2.weight, lineHeight: t.h2.lh, letterSpacing: t.h2.ls, color: color.ink, fontFamily: font.family, wordBreak: 'keep-all' }}>
            {title}
          </h3>
          <p style={{ margin: '0 0 8px', fontSize: t.lead.size, fontWeight: 500, lineHeight: t.lead.lh, color: color.inkMuted, fontFamily: font.family }}>
            {sub}
          </p>
          {flowProblem && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap', margin: 'clamp(16px,2vw,24px) 0' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: color.warn, background: 'rgba(229,72,77,0.08)', padding: '5px 12px', borderRadius: 100, fontFamily: font.family, lineHeight: 1.5 }}>AS-IS: {flowProblem}</span>
              <span style={{ color: color.inkMuted, fontSize: 14, marginTop: 4 }}>→</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: color.brand, background: color.brandPale, padding: '5px 12px', borderRadius: 100, fontFamily: font.family, lineHeight: 1.5 }}>TO-BE: {flowSolution}</span>
            </div>
          )}
          {body && <p style={{ margin: '0 0 16px', fontSize: t.body.size, lineHeight: t.body.lh, color: color.inkMuted, fontFamily: font.family }}>{body}</p>}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {implBadges && implBadges.map(label => (
              <span key={label} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: color.inkMuted, background: color.brandSky, padding: '4px 10px', borderRadius: 100, fontFamily: font.family }}>{label}</span>
            ))}
            {urBadge && <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: color.brand, background: color.brandPale, padding: '4px 10px', borderRadius: 100, fontFamily: font.family }}>{urBadge}</span>}
          </div>
        </div>
        <AsIsToBeRow
          asIs={<IPhoneAsIs />}
          toBe={toBeContent || <IPhoneAsIs />}
        />
      </div>
    </div>
  );
}

export default function TheBuild() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [s1Ref, s1Visible] = useReveal({ threshold: 0.04 });
  const [s2Ref, s2Visible] = useReveal({ threshold: 0.04 });
  const [s3Ref, s3Visible] = useReveal({ threshold: 0.04 });
  const [s4Ref, s4Visible] = useReveal({ threshold: 0.04 });

  return (
    <section id="key-screens" style={{ background: color.bg, fontFamily: font.family }}>
      <div
        ref={headRef}
        style={{
          padding: `${layout.sectionY} clamp(20px,5vw,80px) clamp(48px,6vw,80px)`,
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? 'none' : 'translateY(28px)',
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
        }}
      >
        <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
          <p style={{ fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight, letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform, color: color.brand, margin: '0 0 24px', fontFamily: font.family }}>
            KEY SCREENS
          </p>
          <h2 style={{ fontSize: t.h1.size, fontWeight: t.h1.weight, lineHeight: t.h1.lh, letterSpacing: t.h1.ls, color: color.ink, margin: 0, fontFamily: font.family, wordBreak: 'keep-all' }}>
            4개의 전략이 화면이 됩니다.
          </h2>
        </div>
      </div>

      {/* S1: 위젯 잔액 노출 */}
      <div ref={s1Ref}>
        <ScreenBlock
          visible={s1Visible}
          bg={color.bg}
          eyebrow="KEY SCREENS 01"
          title="위젯 잔액 노출"
          sub="앱을 열지 않아도 잔액이 보입니다."
          flowProblem="앱 실행해야만 잔액 확인"
          flowSolution="홈 위젯, 잠금화면 즉시 노출"
          implBadges={['HomeCoachMini, BalanceCardExpanded']}
          urBadge="UR-U01"
          toBeContent={
            <IPhoneToBe><HomeCoachMini variant="charge" /></IPhoneToBe>
          }
        />
      </div>

      {/* S2: 환불 동등 위계 */}
      <div ref={s2Ref}>
        <ScreenBlock
          visible={s2Visible}
          bg={color.white}
          eyebrow="KEY SCREENS 02"
          title="환불 동등 위계"
          sub="충전과 환불을 같은 자리에 뒀습니다."
          flowProblem="관찰 4인 전원 환불 메뉴 탐색 실패"
          flowSolution="잔액 카드 3슬롯 동일 크기"
          body="잔액 카드에 [충전 / 환불 / QR결제] 3슬롯을 동일 크기로 배치합니다."
          implBadges={['RefundMini, BalanceCardExpanded']}
          urBadge="UR-U03"
          toBeContent={
            <IPhoneToBe><RefundMini step="list" /></IPhoneToBe>
          }
        />
      </div>

      {/* S4(코치마크): 직전 지시에 따라 S3 위치 */}
      <div ref={s3Ref}>
        <ScreenBlock
          visible={s3Visible}
          bg={color.bg}
          eyebrow="KEY SCREENS 03"
          title="코치마크 단계 안내"
          sub="첫 사용자도 혼자 완주할 수 있습니다."
          flowProblem="카드 신청 과정 복잡해 포기"
          flowSolution="카드 등록 직후 충전→환불 자동 안내"
          body="ScreenContainer.getBoundingClientRect() 절대좌표 기반. 실제 버튼 위치에 말풍선이 정확히 얹힙니다."
          implBadges={['CoachMarkOverlay, getBoundingClientRect']}
          urBadge="UR-U03"
          toBeContent={
            <IPhoneToBe><HomeCoachMini variant="cardApply" /></IPhoneToBe>
          }
        />
      </div>

      {/* S3(지도): 직전 지시에 따라 S4 위치 */}
      <div ref={s4Ref}>
        <ScreenBlock
          visible={s4Visible}
          bg={color.white}
          eyebrow="KEY SCREENS 04"
          title="가맹점 실시간 신뢰"
          sub="지도에서 실시간으로 확인할 수 있습니다."
          flowProblem="가게 가서 직접 물어봐야 했던 불편"
          flowSolution="13,021개 전수 등록 + 12카테고리 필터"
          implBadges={['StoreMapScreen, MarkerClusterer']}
          urBadge="UR-U06"
        />
      </div>
    </section>
  );
}
