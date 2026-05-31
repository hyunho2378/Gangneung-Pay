import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';
import testImg from '../assets/test-1.png';

const METHOD_ITEMS = [
  'Moderated UT, Think Aloud 기법 적용',
  '프로토타입 직접 조작, 행동 관찰',
  '개선 핵심(이용내역, 환불, 캐시백) 도달성 확인',
];

const TARGET_ITEMS = [
  '심층 인터뷰 참여자 4명(5060 2명, 2030 2명)',
  '기존 사용 경험 보유, 개선 전후 비교 가능',
];

const TASKS = [
  { num: 'T1', text: '이번 달 캐시백 적립과 소멸 예정 확인' },
  { num: 'T2', text: '충전 내역 중 환불 가능 항목 환불' },
  { num: 'T3', text: '잔액, 캐시백, 결제 수단별 사용을 한 화면에서 확인' },
];

const BEFORE_ITEMS = [
  '환불 메뉴 탐색 실패',
  '이번 달 캐시백 한도 확인 불가',
  '흩어지고 작게 표시된 정보, 낮은 도달성',
];

const AFTER_ITEMS = [
  '참여자 4명 전원 세 과업 완료',
  '한 화면에서 즉시 확인',
  '환불 어려움 없이 완료',
  '실제 앱 수준의 자연스러움',
];

const QUOTES = [
  {
    label: '5060 A',
    text: '"이게 진짜 앱인지 얼핏 보면 헷갈린다. 캐시백이랑 돈 쓴 내역, 환불 등을 다 여기저기 있어가지고 찾기 어려웠는데 새롭게 생긴 이용내역에서 한 눈에 확인할 수 있어서 너무 편리하다"',
  },
  {
    label: '5060 B',
    text: '"홈 화면에서 환불이 크게 잘 보여서 너무 좋다. 그 전에는 복잡해서 그냥 아까워도 다 쓴다는 생각으로 지냈었는데 이제는 마음 놓고 환불 할 수 있을 것 같다"',
  },
  {
    label: '2030 A',
    text: '"불필요한 것들이 사라지고 금액 숫자가 더 커져서 보기 편해졌다. 시청과 협업해서 진짜로 바뀌었으면 좋겠다"',
  },
  {
    label: '2030 B',
    text: '"처음에 들어갔을 때 안내가 뜨는게 친절해 보인다. 부모님과 노년층이 처음 쓰실 때 편하실 것 같다"',
  },
];

function BulletList({ items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <span style={{
            width: 7, height: 7,
            borderRadius: '50%',
            background: color.brand,
            flexShrink: 0,
            marginTop: 7,
          }} />
          <span style={{
            fontSize: t.body.size, fontWeight: 500,
            lineHeight: 1.6, color: color.ink,
            fontFamily: font.family, wordBreak: 'keep-all',
          }}>
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function UserTest() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [designRef, designVisible] = useReveal({ threshold: 0.05 });
  const [tasksRef, tasksVisible] = useReveal({ threshold: 0.03 });
  const [resultsRef, resultsVisible] = useReveal({ threshold: 0.05 });
  const [verifyRef, verifyVisible] = useReveal({ threshold: 0.05 });
  const { isMobile } = useBreakpoint();

  const subLabelStyle = {
    fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
    letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
    color: color.inkMuted, margin: '0 0 20px', fontFamily: font.family,
    display: 'block',
  };

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
          ref={headRef}
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px', fontFamily: font.family,
          }}>
            07. USABILITY TESTING
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: 0, fontFamily: font.family,
            wordBreak: 'keep-all',
          }}>
            실제 사용자에게 개선 효과를 확인하고, 실무 검증 중에 있습니다.
          </h2>
        </div>

        {/* [1] UT 설계 */}
        <div
          ref={designRef}
          style={{
            opacity: designVisible ? 1 : 0,
            transform: designVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          <p style={subLabelStyle}>01 UT 설계</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
            gap: 'clamp(16px,2vw,24px)',
          }}>
            <div style={{ background: color.bg, borderRadius: layout.rMd, padding: 'clamp(20px,2.5vw,32px)' }}>
              <p style={{
                fontSize: 'clamp(15px,1.2vw,18px)', fontWeight: 700,
                color: color.ink, margin: '0 0 16px', fontFamily: font.family,
              }}>
                방법
              </p>
              <BulletList items={METHOD_ITEMS} />
            </div>
            <div style={{ background: color.bg, borderRadius: layout.rMd, padding: 'clamp(20px,2.5vw,32px)' }}>
              <p style={{
                fontSize: 'clamp(15px,1.2vw,18px)', fontWeight: 700,
                color: color.ink, margin: '0 0 16px', fontFamily: font.family,
              }}>
                대상
              </p>
              <BulletList items={TARGET_ITEMS} />
            </div>
          </div>
        </div>

        {/* [2] 핵심 과업 */}
        <div
          ref={tasksRef}
          style={{
            opacity: tasksVisible ? 1 : 0,
            transform: tasksVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          <p style={subLabelStyle}>02 핵심 과업</p>
          <p style={{
            fontSize: t.body.size, fontWeight: 500,
            lineHeight: 1.7, color: color.inkMuted,
            margin: '0 0 clamp(16px,2vw,24px)', fontFamily: font.family,
            wordBreak: 'keep-all',
          }}>
            리서치 단계의 맥락적 관찰 미션과 같은 과업으로, 개선 전 발견한 문제가 해소되었는지 동일 기준에서 확인했습니다.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
            gap: 'clamp(12px,1.5vw,20px)',
          }}>
            {TASKS.map((task) => (
              <div
                key={task.num}
                style={{
                  background: color.brandPale,
                  borderRadius: layout.rMd,
                  padding: 'clamp(20px,2.5vw,28px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 12,
                }}
              >
                <span style={{
                  fontSize: 'clamp(28px,3vw,40px)', fontWeight: 800,
                  letterSpacing: '-0.03em', color: color.brand,
                  lineHeight: 1, fontFamily: font.family,
                }}>
                  {task.num}
                </span>
                <p style={{
                  fontSize: t.body.size, fontWeight: 500,
                  lineHeight: 1.6, color: color.ink,
                  margin: 0, fontFamily: font.family, wordBreak: 'keep-all',
                }}>
                  {task.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* [3] 결과 */}
        <div
          ref={resultsRef}
          style={{
            opacity: resultsVisible ? 1 : 0,
            transform: resultsVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          <p style={subLabelStyle}>03 결과</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
            gap: 'clamp(16px,2vw,24px)',
            marginBottom: 'clamp(24px,3vw,40px)',
          }}>
            <div style={{ background: color.bg, borderRadius: layout.rMd, padding: 'clamp(20px,2.5vw,32px)' }}>
              <p style={{
                fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                color: color.inkMuted, margin: '0 0 16px', fontFamily: font.family,
              }}>
                개선 전
              </p>
              <BulletList items={BEFORE_ITEMS} />
            </div>
            <div style={{ background: color.brandPale, borderRadius: layout.rMd, padding: 'clamp(20px,2.5vw,32px)' }}>
              <p style={{
                fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                color: color.brand, margin: '0 0 16px', fontFamily: font.family,
              }}>
                개선 후
              </p>
              <BulletList items={AFTER_ITEMS} />
            </div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
            gap: 'clamp(16px,2vw,28px)',
          }}>
            {QUOTES.map((q, i) => (
              <div
                key={i}
                style={{
                  background: color.bg,
                  borderRadius: layout.rMd,
                  padding: 'clamp(20px,2.5vw,32px)',
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
                  {q.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* [4] 실무 검증 */}
        <div
          ref={verifyRef}
          style={{
            opacity: verifyVisible ? 1 : 0,
            transform: verifyVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <p style={subLabelStyle}>04 실무 검증</p>
          <p style={{
            fontSize: t.body.size, fontWeight: 500,
            lineHeight: t.body.lh, color: color.inkMuted,
            margin: '0 0 clamp(20px,2.5vw,32px)', fontFamily: font.family,
            wordBreak: 'keep-all',
          }}>
            강릉시청 강릉페이 담당자와 운영대행사(코나아이) 실무 자문을 통해 개선 방향을 검증 중에 있습니다.
          </p>
          <div style={{ maxWidth: '100%' }}>
            <img
              src={testImg}
              alt="강릉시청 강릉페이 담당자 회신"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: layout.rMd }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
