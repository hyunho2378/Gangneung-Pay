import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';
import asIsHome from '../assets/before-1.png';
import toBeHome from '../assets/tobe-home.png';
import asIsHistory from '../assets/asis-history.png';
import toBeHistory from '../assets/tobe-history.png';
import asIsRefund from '../assets/asis-refund.png';
import toBeRefund from '../assets/tobe-refund.png';
import asIsCashback from '../assets/asis-cashback.png';
import toBeCashback from '../assets/tobe-cashback.png';
import asIsStore from '../assets/asis-store.png';
import toBeStore from '../assets/tobe-store.png';
import coachCard from '../assets/coach-card.png';
import coachCharge from '../assets/coach-charge.png';

const SCREEN_IMGS = {
  'home-asis': asIsHome,
  'home-tobe': toBeHome,
  'history-asis': asIsHistory,
  'history-tobe': toBeHistory,
  'refund-asis': asIsRefund,
  'refund-tobe': toBeRefund,
  'cashback-asis': asIsCashback,
  'cashback-tobe': toBeCashback,
  'store-asis': asIsStore,
  'store-tobe': toBeStore,
  'coach-tobe1': coachCard,
  'coach-tobe2': coachCharge,
};

const STRATEGY_LABELS = {
  S1: 'S1 덜어내기',
  S2: 'S2 다크패턴 해소',
  S3: 'S3 투명성',
  S4: 'S4 길찾기',
};

const SCREENS = [
  {
    id: 'home',
    num: '01',
    name: '메인 홈',
    badge: null,
    asIs: '서비스 바로가기, 최근 결제, 지원금 캐러셀 등 비금융 정보가 메인을 차지합니다. 상단 캐러셀에 빨간색 등 잡색이 섞이고 캐시백 설정이 사라져 있습니다. 환불 메뉴가 큰글씨 모드에서만 노출되는 다크패턴이었습니다. 관찰 참여자 4인 전원이 환불 메뉴 탐색에 실패했습니다.',
    toBe: '비금융 정보를 삭제해 금융 핵심만 남깁니다. 블루 primary로 통일하고 캐시백 자동, 수동 사용을 복원합니다. 잔액카드에 충전, 환불, QR결제를 3슬롯으로 동등 배치했습니다.',
    annotations: [
      '비금융 정보 3종 삭제(서비스 바로가기, 최근 결제, 지원금 캐러셀)',
      '잡색 제거, 블루 primary 통일',
      '캐시백 자동, 수동 사용 복원',
      '내부 용어의 사용자 언어 전환',
      '큰글씨 전용 다크패턴 해소, 환불 동등 위계',
    ],
    proves: ['S1', 'S3', 'S4'],
    big: true,
  },
  {
    id: 'coach',
    num: '02',
    name: '코치마크',
    badge: '신설',
    asIs: '첫 사용자를 위한 안내가 없어 기능을 스스로 더듬어 찾아야 했습니다. (발견성 부재)',
    toBe: '주요 동작마다 단계별 코치마크를 제공해 처음 쓰는 사용자도 막힘없이 따라오게 했습니다. (단계별 온보딩 가이드)',
    annotations: [
      '발견성(Discoverability) 부재 해결',
      '단계별 온보딩 가이드',
    ],
    proves: ['S4'],
    big: false,
    dualTobe: true,
  },
  {
    id: 'history',
    num: '03',
    name: '이용내역 탭',
    badge: '신설',
    asIs: '결제 위주로만 나열되고 잔액, 캐시백, 페이별 사용이 뒤섞이거나 보이지 않습니다.',
    toBe: '잔액, 캐시백, 페이별 사용을 구분해 표시합니다. 월별 칩으로 충전, 환불, 결제를 필터합니다.',
    annotations: [
      '잔액, 캐시백, 페이별 사용 분리',
      '월별 칩 필터(충전, 환불, 결제)',
      '정보 깊이 축소로 시니어 직관성 확보',
    ],
    proves: ['S3'],
    big: false,
  },
  {
    id: 'refund',
    num: '04',
    name: '환불내역',
    badge: '동등 위계, 신설',
    asIs: '환불 가능 여부와 조건을 한곳에서 확인할 수 없어, 무엇을 환불할 수 있는지 파악하기 어려웠습니다.',
    toBe: '환불 가능한 충전내역과 가능 조건을 함께 보여주고, 조건을 충족한 항목만 환불하도록 했습니다.',
    annotations: [
      '환불 가능 충전내역, 가능 조건 표시',
      '조건 충족 항목 한정 환불',
    ],
    proves: ['S2', 'S3'],
    big: false,
  },
  {
    id: 'cashback',
    num: '05',
    name: '캐시백 내역',
    badge: '신설',
    asIs: "'얼마 받았어요' 모달만 있었습니다. 적립, 사용, 소멸 추적이 불가능합니다.",
    toBe: '캐시백 내역 전용 페이지를 신설합니다. 적립, 사용, 소멸 예정을 월별로 추적합니다.',
    annotations: [
      '모달에서 전용 페이지로 전환',
      '적립, 사용, 소멸 예정 월별 추적',
    ],
    proves: ['S3', 'S1'],
    big: false,
  },
  {
    id: 'store',
    num: '06',
    name: '결제매장',
    badge: '신설, 개선',
    asIs: '아래에서 드래그해야 올라오는 모달이라 접근성이 낮습니다. 상세 정보가 부족합니다.',
    toBe: '결제매장 페이지를 신설합니다. 카테고리 클릭 시 노출하고 선택 시 해당 위치로 이동합니다. 상세에 사진 자리를 마련합니다.',
    annotations: [
      '카테고리 클릭 노출, 선택 시 위치 이동',
      '드래그 모달 접근성 개선',
      '상세 사진 영역 제공',
    ],
    proves: ['S4'],
    big: false,
  },
];

function PhoneSlot({ variant = 'tobe', screenId, label }) {
  const isAsis = variant === 'asis';
  const imgSrc = SCREEN_IMGS[`${screenId}-${variant}`];
  const displayLabel = label ?? (isAsis ? 'AS-IS' : 'TO-BE');
  return (
    <div>
      {imgSrc ? (
        <img
          src={imgSrc}
          alt=""
          aria-hidden="true"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: layout.rMd,
          }}
        />
      ) : (
        <div style={{
          width: '100%',
          aspectRatio: '9/19.5',
          border: `1px dashed ${color.line}`,
          borderRadius: layout.rMd,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} />
      )}
      <p style={{
        textAlign: 'center',
        fontSize: 20, fontWeight: 800,
        letterSpacing: '0.08em', textTransform: 'uppercase',
        color: isAsis ? color.inkMuted : color.brand,
        margin: '8px 0 0',
        fontFamily: font.family,
      }}>
        {displayLabel}
      </p>
    </div>
  );
}

function ProvesTags({ proves }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {proves.map(p => (
        <span key={p} style={{
          fontSize: 11, fontWeight: 700,
          letterSpacing: '0.04em', textTransform: 'uppercase',
          color: color.brand, background: color.brandPale,
          padding: '4px 10px', borderRadius: 100,
          fontFamily: font.family,
        }}>
          {STRATEGY_LABELS[p]}
        </span>
      ))}
    </div>
  );
}

function AnnotationList({ annotations }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {annotations.map((ann, i) => (
        <li key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: i < annotations.length - 1 ? 14 : 0,
        }}>
          <span style={{
            fontSize: t.body.size, fontWeight: 800,
            color: color.brand, fontFamily: font.family,
            flexShrink: 0,
            width: '1.6em', textAlign: 'right',
          }}>
            {i + 1}
          </span>
          <span style={{
            fontSize: t.body.size, fontWeight: 500, lineHeight: 1.65,
            color: color.ink, fontFamily: font.family,
            wordBreak: 'keep-all',
          }}>
            {ann}
          </span>
        </li>
      ))}
    </ul>
  );
}

function BigScreenBlock({ screen, visible, isMobile }) {
  const sid = screen.id;
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(32px)',
      transition: 'opacity 0.65s ease-out, transform 0.65s ease-out',
      paddingBottom: 'clamp(48px,6vw,80px)',
      borderBottom: `1px solid ${color.line}`,
      marginBottom: 'clamp(48px,6vw,80px)',
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 'clamp(32px,4vw,48px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px,1.5vw,20px)' }}>
          <span style={{
            fontSize: 'clamp(56px,6vw,88px)',
            fontWeight: 800, lineHeight: 1,
            letterSpacing: '-0.04em',
            color: color.brand, fontFamily: font.family,
          }}>
            {screen.num}
          </span>
          <h3 style={{
            fontSize: t.h2.size, fontWeight: t.h2.weight,
            lineHeight: t.h2.lh, letterSpacing: t.h2.ls,
            color: color.ink, margin: 0,
            fontFamily: font.family, wordBreak: 'keep-all',
          }}>
            {screen.name}
          </h3>
        </div>
        <ProvesTags proves={screen.proves} />
      </div>

      {/* AS-IS / TO-BE phone pair — centered, large */}
      <div style={{ marginBottom: 'clamp(32px,4vw,48px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: 'clamp(16px,4vw,56px)',
          maxWidth: isMobile ? 220 : 560,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <PhoneSlot variant="asis" screenId={sid} />
          <PhoneSlot variant="tobe" screenId={sid} />
        </div>
      </div>

      {/* AS-IS / TO-BE text */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: 'clamp(16px,2.5vw,40px)',
        marginBottom: 'clamp(24px,3vw,36px)',
      }}>
        <div>
          <p style={{
            fontSize: 11, fontWeight: 800,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: color.inkFaint, margin: '0 0 8px', fontFamily: font.family,
          }}>
            AS-IS
          </p>
          <p style={{
            fontSize: t.caption.size, lineHeight: t.caption.lh,
            fontWeight: 500, color: color.inkMuted, margin: 0,
            fontFamily: font.family, wordBreak: 'keep-all',
          }}>
            {screen.asIs}
          </p>
        </div>
        <div>
          <p style={{
            fontSize: 11, fontWeight: 800,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: color.brand, margin: '0 0 8px', fontFamily: font.family,
          }}>
            TO-BE
          </p>
          <p style={{
            fontSize: t.caption.size, lineHeight: t.caption.lh,
            fontWeight: 500, color: color.ink, margin: 0,
            fontFamily: font.family, wordBreak: 'keep-all',
          }}>
            {screen.toBe}
          </p>
        </div>
      </div>

      <AnnotationList annotations={screen.annotations} />
    </div>
  );
}

function ScreenBlock({ screen, visible, delay, isMobile, isLast }) {
  const sid = screen.id;
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(24px)',
      transition: `opacity 0.65s ease-out ${delay}s, transform 0.65s ease-out ${delay}s`,
      paddingBottom: isLast ? 0 : 'clamp(48px,6vw,80px)',
      borderBottom: isLast ? 'none' : `1px solid ${color.line}`,
      marginBottom: isLast ? 0 : 'clamp(48px,6vw,80px)',
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 'clamp(24px,3vw,40px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px,1.2vw,16px)' }}>
          <span style={{
            fontSize: 'clamp(40px,4.5vw,64px)',
            fontWeight: 800, lineHeight: 1,
            letterSpacing: '-0.04em',
            color: color.brand, fontFamily: font.family,
          }}>
            {screen.num}
          </span>
          <div>
            <h3 style={{
              fontSize: t.h3.size, fontWeight: t.h3.weight,
              lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
              color: color.ink,
              margin: screen.badge ? '0 0 6px' : 0,
              fontFamily: font.family, wordBreak: 'keep-all',
            }}>
              {screen.name}
            </h3>
            {screen.badge && (
              <span style={{
                fontSize: 11, fontWeight: 700,
                color: color.brand, background: color.brandPale,
                padding: '2px 8px', borderRadius: 100,
                fontFamily: font.family,
              }}>
                {screen.badge}
              </span>
            )}
          </div>
        </div>
        <ProvesTags proves={screen.proves} />
      </div>

      {/* Phone pair + text */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'clamp(240px,28vw,380px) 1fr',
        gap: 'clamp(24px,4vw,56px)',
        alignItems: 'start',
      }}>

        {/* Phones */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: 'clamp(16px,2vw,32px)',
          maxWidth: isMobile ? 220 : undefined,
          margin: isMobile ? '0 auto' : undefined,
        }}>
          {screen.dualTobe ? (
            <>
              <PhoneSlot variant="tobe1" screenId={sid} label="카드 신청 단계 안내" />
              <PhoneSlot variant="tobe2" screenId={sid} label="충전 단계 안내" />
            </>
          ) : (
            <>
              <PhoneSlot variant="asis" screenId={sid} />
              <PhoneSlot variant="tobe" screenId={sid} />
            </>
          )}
        </div>

        {/* AS-IS / TO-BE text + divider + annotations */}
        <div>
          <div style={{ marginBottom: 12 }}>
            <p style={{
              fontSize: 11, fontWeight: 800,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: color.inkFaint, margin: '0 0 6px', fontFamily: font.family,
            }}>
              AS-IS
            </p>
            <p style={{
              fontSize: t.caption.size, lineHeight: t.caption.lh,
              fontWeight: 500, color: color.inkMuted, margin: 0,
              fontFamily: font.family, wordBreak: 'keep-all',
            }}>
              {screen.asIs}
            </p>
          </div>
          <div style={{ marginBottom: 'clamp(16px,2vw,24px)' }}>
            <p style={{
              fontSize: 11, fontWeight: 800,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: color.brand, margin: '0 0 6px', fontFamily: font.family,
            }}>
              TO-BE
            </p>
            <p style={{
              fontSize: t.caption.size, lineHeight: t.caption.lh,
              fontWeight: 500, color: color.ink, margin: 0,
              fontFamily: font.family, wordBreak: 'keep-all',
            }}>
              {screen.toBe}
            </p>
          </div>
          <div style={{ height: 1, background: color.line, marginBottom: 'clamp(16px,2vw,24px)' }} />
          <AnnotationList annotations={screen.annotations} />
        </div>
      </div>
    </div>
  );
}

export default function TheBuild() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [bodyRef, bodyVisible] = useReveal({ threshold: 0.02 });
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="key-screens"
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
            marginBottom: 'clamp(56px,7vw,96px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px', fontFamily: font.family,
          }}>
            KEY SCREENS
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: 0,
            fontFamily: font.family, wordBreak: 'keep-all',
          }}>
            전략이 실제 화면으로 이어집니다.
          </h2>
        </div>

        {/* Screen blocks */}
        <div ref={bodyRef}>
          {SCREENS.map((screen, i) =>
            screen.big ? (
              <BigScreenBlock
                key={screen.id}
                screen={screen}
                visible={bodyVisible}
                isMobile={isMobile}
              />
            ) : (
              <ScreenBlock
                key={screen.id}
                screen={screen}
                visible={bodyVisible}
                delay={i * 0.06}
                isMobile={isMobile}
                isLast={i === SCREENS.length - 1}
              />
            )
          )}
        </div>

      </div>
    </section>
  );
}
