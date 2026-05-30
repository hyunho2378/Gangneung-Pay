import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';
import testImg from '../assets/test-1.png';

const QUOTES = [
  {
    group: '5060',
    text: '"캐시백이랑 돈 쓴 내역, 환불 등을 다 여기저기 있어가지고 찾기 어려웠는데 새롭게 생긴 이용내역에서 한 눈에 확인할 수 있어서 너무 편리하다"',
  },
  {
    group: '5060',
    text: '"홈 화면에서 환불이 크게 잘 보여서 너무 좋다. 그 전에는 복잡해서 그냥 아까워도 다 쓴다는 생각으로 지냈었는데 이제는 마음 놓고 환불 할 수 있을 것 같다"',
  },
  {
    group: '2030',
    text: '"불필요한 것들이 사라지고 금액 숫자가 더 커져서 보기 편해졌다. 시청과 협업해서 진짜로 바뀌었으면 좋겠다"',
  },
  {
    group: '2030',
    text: '"처음에 들어갔을 때 안내가 뜨는게 친절해 보인다. 부모님과 노년층이 처음 쓰실 때 편하실 것 같다"',
  },
];

export default function UserTest() {
  const [ref, visible] = useReveal({ threshold: 0.05 });
  const [cardsRef, cardsVisible] = useReveal({ threshold: 0.03 });
  const [verifyRef, verifyVisible] = useReveal({ threshold: 0.05 });
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="user-test"
      style={{
        background: color.white,
        fontFamily: font.family,
        padding: `${layout.sectionY} clamp(20px,5vw,80px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 'clamp(32px,4vw,56px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px', fontFamily: font.family,
          }}>
            USER TEST
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: '0 0 16px', fontFamily: font.family,
            wordBreak: 'keep-all',
          }}>
            TO-BE 개선 후 사용자 반응
          </h2>
          <p style={{
            fontSize: t.lead.size, fontWeight: 500,
            lineHeight: t.lead.lh, color: color.inkMuted,
            margin: 0, fontFamily: font.family,
          }}>
            인터뷰 참여자 4명(5060 2명, 2030 2명)의 반응입니다.
          </p>
        </div>

        {/* Quote cards */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
            gap: 'clamp(16px,2vw,28px)',
          }}
        >
          {QUOTES.map((q, i) => (
            <div
              key={i}
              style={{
                background: color.bg,
                borderRadius: layout.rMd,
                padding: 'clamp(20px,2.5vw,32px)',
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? 'none' : 'translateY(16px)',
                transition: `opacity 0.6s ease-out ${i * 0.08}s, transform 0.6s ease-out ${i * 0.08}s`,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <p style={{
                fontSize: t.body.size, fontWeight: 500,
                lineHeight: t.body.lh, color: color.ink,
                margin: 0, fontFamily: font.family,
                wordBreak: 'keep-all',
              }}>
                {q.text}
              </p>
              <span style={{
                fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                letterSpacing: t.eyebrow.ls,
                color: color.brand, fontFamily: font.family,
              }}>
                {q.group}
              </span>
            </div>
          ))}
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
            강릉시청 강릉페이 담당자와 운영대행사(코나아이) 실무 자문을 통해 개선 방향을 검증 중에 있습니다.
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

            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
