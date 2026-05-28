import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

function Quote({ lines }) {
  return (
    <div style={{
      borderLeft: `3px solid ${color.brand}`,
      background: color.brandPale,
      padding: 'clamp(14px,1.8vw,20px) clamp(16px,2vw,24px)',
      borderRadius: `0 ${layout.rSm} ${layout.rSm} 0`,
      margin: 'clamp(12px,1.5vw,18px) 0',
    }}>
      {lines.map((line, i) => (
        <p key={i} style={{
          fontSize: t.body.size, lineHeight: t.body.lh,
          fontWeight: 500, color: color.ink,
          fontFamily: font.family, fontStyle: 'italic',
          margin: i < lines.length - 1 ? '0 0 8px' : 0,
          wordBreak: 'keep-all',
        }}>
          {line}
        </p>
      ))}
    </div>
  );
}

function SolutionBox({ children }) {
  return (
    <div style={{
      borderLeft: `3px solid ${color.brand}`,
      background: color.brandSky,
      padding: 'clamp(14px,1.8vw,20px) clamp(16px,2vw,24px)',
      borderRadius: `0 ${layout.rSm} ${layout.rSm} 0`,
      margin: 'clamp(16px,2vw,24px) 0',
    }}>
      <p style={{
        fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
        textTransform: 'uppercase', color: color.brand,
        fontFamily: font.family, margin: '0 0 10px',
      }}>
        구조적 해결 방향
      </p>
      <p style={{
        fontSize: t.body.size, lineHeight: t.body.lh,
        fontWeight: 500, color: color.ink,
        fontFamily: font.family, margin: 0, wordBreak: 'keep-all',
      }}>
        {children}
      </p>
    </div>
  );
}

function KeyBox({ title, children }) {
  return (
    <div style={{
      background: color.brandPale,
      border: `1.5px solid ${color.brand}`,
      borderRadius: layout.rMd,
      padding: 'clamp(16px,2vw,28px)',
      margin: 'clamp(14px,1.8vw,22px) 0',
    }}>
      {title && (
        <p style={{
          fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: color.brand,
          fontFamily: font.family, margin: '0 0 10px',
        }}>
          {title}
        </p>
      )}
      <div>{children}</div>
    </div>
  );
}

function ImprovBox({ children }) {
  return (
    <div style={{
      background: color.brandSky,
      border: `1px solid ${color.brand}`,
      borderRadius: layout.rMd,
      padding: 'clamp(14px,1.8vw,22px) clamp(16px,2vw,24px)',
      margin: 'clamp(14px,1.8vw,22px) 0',
    }}>
      <p style={{
        fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
        textTransform: 'uppercase', color: color.brand,
        fontFamily: font.family, margin: '0 0 10px',
      }}>
        개선 방향 제언
      </p>
      <p style={{
        fontSize: t.body.size, lineHeight: t.body.lh,
        fontWeight: 500, color: color.ink,
        fontFamily: font.family, margin: 0, wordBreak: 'keep-all',
      }}>
        {children}
      </p>
    </div>
  );
}

function QuestionBox({ children }) {
  return (
    <div style={{
      background: color.bg,
      border: `1px solid ${color.line}`,
      borderRadius: layout.rMd,
      padding: 'clamp(16px,2vw,24px)',
      margin: 'clamp(12px,1.5vw,18px) 0',
    }}>
      <p style={{
        fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
        textTransform: 'uppercase', color: color.brand,
        fontFamily: font.family, margin: '0 0 12px',
      }}>
        질문 설계
      </p>
      <div style={{
        fontSize: t.body.size, lineHeight: t.body.lh,
        fontWeight: 500, color: color.ink,
        fontFamily: font.family, wordBreak: 'keep-all',
      }}>
        {children}
      </div>
    </div>
  );
}

function CompareTable({ headers, rows }) {
  const colCount = headers.length;
  const colW = colCount === 2 ? '1fr 1fr' : colCount === 3 ? '1fr 1fr 1fr' : `repeat(${colCount}, 1fr)`;
  const minW = colCount * 220;
  return (
    <div style={{ overflowX: 'auto', margin: 'clamp(14px,1.8vw,22px) 0' }}>
      <div style={{ minWidth: minW }}>
        <div style={{
          display: 'grid', gridTemplateColumns: colW,
          background: color.brand,
          borderRadius: `${layout.rSm} ${layout.rSm} 0 0`,
        }}>
          {headers.map((h, i) => (
            <div key={i} style={{
              padding: 'clamp(10px,1.2vw,14px) clamp(12px,1.5vw,18px)',
              fontSize: 13, fontWeight: 800, color: color.white,
              fontFamily: font.family, wordBreak: 'keep-all', lineHeight: 1.4,
              borderRight: i < headers.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none',
            }}>
              {h}
            </div>
          ))}
        </div>
        {rows.map((row, ri) => (
          <div key={ri} style={{
            display: 'grid', gridTemplateColumns: colW,
            background: ri % 2 === 0 ? color.white : color.bg,
            borderBottom: `1px solid ${color.line}`,
            borderLeft: `1px solid ${color.line}`,
            borderRight: `1px solid ${color.line}`,
            borderRadius: ri === rows.length - 1 ? `0 0 ${layout.rSm} ${layout.rSm}` : 0,
          }}>
            {row.map((cell, ci) => (
              <div key={ci} style={{
                padding: 'clamp(10px,1.2vw,14px) clamp(12px,1.5vw,18px)',
                fontSize: t.caption.size, lineHeight: 1.65,
                fontWeight: ci === 0 ? 700 : 500,
                color: ci === 0 ? color.ink : color.inkMuted,
                fontFamily: font.family,
                borderRight: ci < row.length - 1 ? `1px solid ${color.line}` : 'none',
                wordBreak: 'keep-all',
              }}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepHeader({ step, title }) {
  return (
    <div style={{ marginBottom: 'clamp(20px,2.5vw,32px)' }}>
      <p style={{
        fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
        letterSpacing: t.eyebrow.ls, color: color.brand,
        fontFamily: font.family, margin: '0 0 10px',
        textTransform: 'none',
      }}>
        {step}
      </p>
      <h3 style={{
        fontSize: t.h2.size, fontWeight: t.h2.weight,
        lineHeight: t.h2.lh, letterSpacing: t.h2.ls,
        color: color.ink, fontFamily: font.family,
        margin: 0, wordBreak: 'keep-all',
      }}>
        {title}
      </h3>
    </div>
  );
}

function SubTitle({ children }) {
  return (
    <h4 style={{
      fontSize: t.h3.size, fontWeight: t.h3.weight,
      lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
      color: color.brand, fontFamily: font.family,
      margin: 'clamp(24px,3vw,40px) 0 clamp(12px,1.5vw,18px)',
      wordBreak: 'keep-all',
    }}>
      {children}
    </h4>
  );
}

function Body({ children, noMargin }) {
  return (
    <p style={{
      fontSize: t.body.size, lineHeight: t.body.lh,
      fontWeight: 500, color: color.ink,
      fontFamily: font.family,
      margin: noMargin ? 0 : '0 0 clamp(14px,1.8vw,22px)',
      wordBreak: 'keep-all',
    }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div style={{ height: 1, background: color.line, margin: 'clamp(40px,5vw,72px) 0' }} />;
}

const STEP1_A_ROWS = [
  ['결제 문해력', '스마트폰 결제로 전환 중인 과도기. 경험이 많을수록 강릉페이 진입장벽 낮음', "두 인터뷰이 모두 실물 카드 일변도. 앱은 충전/잔액 확인 창구로만 기능. 결제 시 앱을 여는 행동 자체가 부재"],
  ['캐시백 동기', '혜택이 강력한 유지 동인이지만 충전 피로도가 임계치 초과 시 이탈', "캐시백은 강력하지만 이탈보다 '앱 최소화 전략'으로 귀결. 이탈이 아닌 '앱 없는 강릉페이 사용' 패턴 형성"],
  ['신규 페이 도입 기대감', '카카오/네이버페이 연동 복잡성이 또 다른 진입장벽', "인터뷰이 1: '앱으로만 사용하면 편해질 것' 기대. 인터뷰이 2: '나는 아날로그형, 카드 두고 왔을 때나 유용할 것' - 기대감 격차 존재"],
  ['환불 기능 접근성', '환불 메뉴가 숨겨져 있으면 충전 자체를 꺼림', "가설보다 훨씬 심각. 인터뷰이 1: 환불 기능 존재 자체 인지 못함. 인터뷰이 2: '금시초문'이라는 표현. 기능이 숨겨진 게 아니라 아예 없는 것으로 인지"],
  ['가맹점 지도 활용', '오류 경험 후 지도 신뢰도 저하', "인터뷰이 1: 오류 후 지도 재이용. 인터뷰이 2: 오류 후 지도 재이용 안 함. 두 반응 모두 고객센터 문의 없이 '다른 카드로 대체' - 저항 없는 이탈"],
];

const STEP1_B_ROWS = [
  ['핵심 이탈 원인', '삼성 갤럭시 유저의 삼성페이 부재가 이탈의 핵심 원인', "갤럭시 유저 외 아이폰 유저의 '애플페이 도입' 요구가 동일한 강도로 존재. 삼성페이 해결만으로는 이탈을 막을 수 없음. 기기 생태계 전체 문제로 확장"],
  ['진입 채널', 'SNS, 유튜브 쇼츠 등 디지털 채널 중심 인지', '재난지원금(공공 채널), 어머니 추천(오프라인 구전). 예상보다 오프라인 채널 비중 높음. 디지털 네이티브라도 지역 서비스는 오프라인으로 처음 접촉'],
  ['UI 심미성', '낡은 앱이라는 인식 강함', "'40~60점 수준으로 정량화. '지역에서 만든 것 같다는 미감', '완전 파랬어요' - 가설보다 더 구체적이고 시각적인 거부반응 발화"],
  ['재유입 조건', '삼성페이 도입 또는 토스 수준 UI가 재유입 조건', "아이폰 사용자의 경우 삼성페이가 아닌 '애플페이 협업'이 유일한 재유입 조건. 실물 카드 선호 이유가 UI가 아닌 '배터리 방전 위험'이라는 예상 외 요인도 존재"],
  ['카카오/네이버페이 기대', '도입을 알아도 연동 완료 및 사용 방식이 기대에 부합하는지는 별개 문제', "인터뷰이 2: '너무 늦은 감이 있다'는 발화. 인터뷰이 1: 카카오페이 자체를 사용 안 해서 관심 없음. 도입 사실조차 인지 못한 경우 존재 - 홍보 채널 실패"],
];

const STEP1_C_ROWS = [
  ['사용자 에러 패턴', '고연령 손님은 앱 실행 자체를 어려워함', "맞음. 단, '앱 실행'이 아니라 '충전' 과정이 구체적 어려움. 영수증에 잔액이 표시되는 줄 아는 등, 강릉페이의 작동 방식 자체를 모름. 가맹점주가 앱 조작 대리 수행"],
  ['카카오/네이버페이 도입 효과', '도입 후 결제 전환율 상승 기대', "편의점 소상공인: '아닐 것 같다', '강릉페이만의 특성이 사라지는 것 같다' - 예상보다 회의적. 스크린 골프장: 손님 연령대가 높아 카카오/네이버페이 수요 자체가 없다고 판단"],
  ['가맹점 지도 인지', '가맹점 지도 오류가 현장 매출 손실로 연결', "두 소상공인 모두 가맹점 지도 기능의 존재 자체를 몰랐음. 가맹점 스티커/안내물도 없음. 손님이 '편의점은 강릉페이 안 된다'는 오해를 하고 있음 - 수요가 있는데 연결이 안 되는 구조"],
  ['비대면 주문 수용도', '혼자 운영하는 소규모 가게일수록 필요성 높음', "가맹점주 입장에서는 '별로'지만 손님에게는 좋을 수 있다는 분리된 시각. 고령 고객층에게는 QR 등록 과정 자체가 진입 장벽으로 작용 - 주요 고객층과의 미스매치"],
];

const STEP3_1_ROWS = [
  ['성격', "사용자가 직접 현금을 입금한 선불금. '내 돈'에 대한 소유 의식 강함", "결제 보상으로 적립된 금액. '공짜로 받은 돈'이라는 심리적 프레임"],
  ['사용자 인식', "교통카드 충전금과 동일하게 인식. 잔액 관리 의무감 존재. '내 돈이 앱 안에 묶여있다'는 통제 불안감", "'저금통에 동전 모으는 느낌'(2030 인터뷰이 1). '너무 좋다'(4050 인터뷰이 2). 감정적으로 긍정적인 프레임"],
  ['환불 인식', "인터뷰이 2: '금시초문', 인터뷰이 1: 환불 메뉴 찾다 포기. 충전금의 환금성 자체를 인지 못함", '소멸 여부, 이월 여부에 대한 불확실성. 한도 30만원 소비 후 남는 적립금 처리 불명확'],
  ['결제 여정 영향', '충전 전 잔액 확인 - 필요 금액 예측 - 충전 결정 - 보안 인증 - 충전 완료의 5단계 인지 부하 유발', '캐시백 한도 확인 후 소비 계획 수정(4050 인터뷰이 2 확인됨). 정보 접근이 쉬울수록 소비 행동에 긍정적 영향'],
];

const STEP4_1_ROWS = [
  ["잔액 확인, 충전, 결제 바코드를 원하는 단순한 금융 도구 기대", "정산 내역, 매출 확인, 가맹점 정보 수정이 필요한 비즈니스 관리 도구 필요"],
  ["메인 화면에 '가맹점 등록 신청', '가맹점 포탈' 버튼이 노출되어 혼란 유발", "가맹점 지도 기능, 정산 내역 접근 경로가 불분명하여 기본 관리 불가"],
  ["'사랑통', '강릉 관광' 등 비결제 콘텐츠가 핵심 기능을 잠음", "스크린 골프장, 편의점 모두 가맹점 지도 기능 존재 자체를 인지 못함"],
];

const STEP4_3_ROWS = [
  ["4050-1: '가맹점인 줄 알고 갔는데 실제로 결제가 안 됐던 경험 있다'", "편의점 소상공인: '가맹점 지도 기능이 있는 줄도 몰랐다'"],
  ["2030-1: '가게 들어가서 여기 강릉페이 돼요? 라고 물어봐야 하는 불편함'", "스크린 골프장: '등록만 하고 지도에 표시되는 줄은 몰랐다'"],
  ["소비자가 가맹점 스티커로 강릉페이 여부를 확인하길 원하나, 스티커 없는 가맹점 다수", "편의점: '그런 스티커가 붙여지면 소통의 오류가 줄어들지 않을까' - 가맹점주도 홍보물 원함"],
];

const APPENDIX_ROWS = [
  ['메인 화면 충전 잔액과 캐시백 분리 표시', '최상', '낮음', '인터뷰이 1: 충전금 과잉 혼동 / 전원 환불 기능 미인지'],
  ['앱 홈 화면 위젯 또는 잠금 화면 잔액 표시', '높음', '중간', "4050-2: '항상 잔액 신경 쓴다' / 민망함 방지 행동"],
  ['결제 전 잔액 부족 사전 알림 (푸시)', '높음', '낮음', "4050-2: '잔액 부족이라는 상황이 온다' 반복 발화"],
  ['가맹점 스티커/안내물 배포 체계화', '높음', '낮음', "편의점: 하루 5명이 '강릉페이 되나요?' 질문"],
  ['B2C 앱에서 B2B 메뉴 분리(또는 역할 분기)', '높음', '중간', "전원 '가맹점 등록, 가맹점 포탈'을 불필요 정보로 지목"],
  ['월별 캐시백 이용/잔액 내역 화면 구현', '중간', '낮음', "4050-2: '월별 이용 내역이 있으면 좋겠다' 직접 요청"],
  ['카카오/네이버페이 도입 인지도 향상 캠페인', '중간', '낮음', '다수: 도입 사실을 몰랐거나 캐시백 동일 적용 미인지'],
  ['충전 화면 내 현재 잔액 표시', '중간', '낮음', '4050-2: 충전 전 잔액 확인 후 충전 금액 결정 패턴'],
  ['삼성페이/애플페이 NFC 결제 도입', '최상', '높음', "2030-2: '애플페이 협업 해주시면 감사' / 2030-1: '삼성페이면 편할 텐데'"],
  ['고객센터 운영 시간 확대 및 채널 다양화', '중간', '중간', "2030-1: 'IC칩 오류 해결 위해 시청 직접 방문' 경험"],
];

export default function InDepthInterview() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [metaRef, metaVisible] = useReveal({ threshold: 0.05 });
  const [execRef, execVisible] = useReveal({ threshold: 0.03 });
  const [step1Ref, step1Visible] = useReveal({ threshold: 0.03 });
  const [step2Ref, step2Visible] = useReveal({ threshold: 0.03 });
  const [step3Ref, step3Visible] = useReveal({ threshold: 0.03 });
  const [step4Ref, step4Visible] = useReveal({ threshold: 0.03 });
  const [step5Ref, step5Visible] = useReveal({ threshold: 0.03 });
  const [appendixRef, appendixVisible] = useReveal({ threshold: 0.03 });

  const revealStyle = (visible, delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(24px)',
    transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
  });

  return (
    <section
      id="in-depth-interview"
      style={{
        background: color.white,
        fontFamily: font.family,
        padding: `${layout.sectionY} clamp(20px,5vw,80px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>

        {/* Header */}
        <div ref={headRef} style={{
          ...revealStyle(headVisible),
          marginBottom: 'clamp(40px,5vw,64px)',
        }}>
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px', fontFamily: font.family,
          }}>
            CONFIDENTIAL · UX RESEARCH REPORT
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: '0 0 16px', wordBreak: 'keep-all',
            fontFamily: font.family,
          }}>
            강릉페이 사용자 인뎁스 인터뷰
          </h2>
          <p style={{
            fontSize: t.lead.size, fontWeight: 500,
            lineHeight: t.lead.lh, color: color.inkMuted,
            margin: 0, fontFamily: font.family, wordBreak: 'keep-all',
          }}>
            행간(行間) 분석 보고서 - 진짜 문제를 찾아서
          </p>
        </div>

        {/* Meta 4-box */}
        <div ref={metaRef} style={{
          ...revealStyle(metaVisible),
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(12px,1.5vw,24px)',
          marginBottom: 'clamp(48px,6vw,80px)',
        }}>
          {[
            { label: '조사 그룹', value: '3개 그룹' },
            { label: '인터뷰이', value: '6인' },
            { label: '분석 질문', value: '70+ 문항' },
            { label: '핵심 인사이트', value: '5개 영역' },
          ].map((m, i) => (
            <div key={i} style={{
              background: color.bg,
              borderRadius: layout.rMd,
              padding: 'clamp(20px,2.5vw,32px)',
              textAlign: 'center',
              opacity: metaVisible ? 1 : 0,
              transition: `opacity 0.5s ease-out ${i * 0.08}s`,
            }}>
              <p style={{
                fontSize: t.caption.size, fontWeight: 600,
                color: color.inkMuted, fontFamily: font.family, margin: '0 0 8px',
              }}>
                {m.label}
              </p>
              <p style={{
                fontSize: t.h2.size, fontWeight: 800,
                color: color.brand, fontFamily: font.family,
                margin: 0, lineHeight: 1.2,
              }}>
                {m.value}
              </p>
            </div>
          ))}
        </div>

        {/* Executive Summary */}
        <div ref={execRef} style={{
          ...revealStyle(execVisible),
          marginBottom: 'clamp(40px,5vw,64px)',
        }}>
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.inkMuted, fontFamily: font.family, margin: '0 0 20px',
          }}>
            Executive Summary
          </p>
          <Body>
            이 보고서는 강릉페이 사용자 8인(Group A: 4050 사용자 2인, Group B: 2030 사용자 2인, Group C: 소상공인 2인)을 대상으로 실시한 인뎁스 인터뷰 데이터를 기반으로 작성되었다. 분석의 핵심 목표는 단순한 UX 불편 목록 작성이 아니라, 사용자가 '말하지 못한 것'과 서비스가 '플랫폼으로 성장하지 못하는 구조적 이유'를 규명하는 데 있다.
          </Body>
          <KeyBox title="핵심 결론 (One-Liner)">
            <p style={{
              fontSize: t.body.size, lineHeight: t.body.lh,
              fontWeight: 600, color: color.ink, margin: 0, wordBreak: 'keep-all',
              fontFamily: font.family,
            }}>
              강릉페이는 현재 10% 캐시백이라는 단일 동인에 의해 생명을 유지하는 '혜택 의존형 충전 도구'다. 앱은 결제 수단이 아니라 캐시백 잔액 확인 창구로 기능 축소되어 있으며, 이 구조가 유지되는 한 어떠한 기능 추가도 근본적 성장을 담보하지 못한다.
            </p>
          </KeyBox>
        </div>

        <Divider />

        {/* Step 1 */}
        <div ref={step1Ref} style={{
          ...revealStyle(step1Visible),
          marginBottom: 'clamp(40px,5vw,64px)',
        }}>
          <StepHeader step="1단계" title="가설 검증 (Hypothesis vs. Reality Gap)" />
          <Body>
            인터뷰 가이드에서 설정된 '예상 인사이트'와 실제 발화 데이터 사이의 간극을 그룹별로 대조한다. 가설이 맞은 경우보다 빗나간 경우에서 더 중요한 인사이트가 도출된다.
          </Body>

          <SubTitle>1-1. Group A (4050 사용자) - 가설 검증</SubTitle>
          <CompareTable
            headers={['검증 항목', '예상 인사이트 (가설)', '실제 발화 데이터 (현실)']}
            rows={STEP1_A_ROWS}
          />

          <SubTitle>1-2. Group B (2030 사용자) - 가설 검증</SubTitle>
          <CompareTable
            headers={['검증 항목', '예상 인사이트 (가설)', '실제 발화 데이터 (현실)']}
            rows={STEP1_B_ROWS}
          />

          <SubTitle>1-3. Group C (소상공인) - 가설 검증</SubTitle>
          <CompareTable
            headers={['검증 항목', '예상 인사이트 (가설)', '실제 발화 데이터 (현실)']}
            rows={STEP1_C_ROWS}
          />
        </div>

        <Divider />

        {/* Step 2 */}
        <div ref={step2Ref} style={{
          ...revealStyle(step2Visible),
          marginBottom: 'clamp(40px,5vw,64px)',
        }}>
          <StepHeader step="2단계" title="숨은 의도 (Unmet Needs) 파악" />
          <Body>
            사용자들이 '불편하다'고 발화한 지점을 액면 그대로 받아들이는 것은 리서치의 실패다. 불편 발화 너머에 있는 심리적 원형(Fear, Anxiety, Habit, Pride)을 해독해야 진짜 개선 방향이 보인다.
          </Body>

          <SubTitle>2-1. 계산대 민망함 증후군 (Social Anxiety at POS)</SubTitle>
          <p style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: color.inkMuted,
            fontFamily: font.family, margin: '0 0 8px',
          }}>
            발화 데이터
          </p>
          <Quote lines={[
            "4050 인터뷰이 2: '민망한 사건이 있었기 때문에 식당 자리에서 먼저 확인하고 들고 이제 이렇게 본 다음에 안심하고 갑니다.'",
            "4050 인터뷰이 2: '계산기 앞에서 하려니까 민망했었습니다. 그래서 그 경험 이후에는 계산대에 나가기 전에 얼마 있나 그때 확인해 보고 없으면 충전을 해서 갑니다.'",
            "4050 인터뷰이 1: '늦어서 삼성페이로 한 경험이 있습니다.' (로딩 지연으로 타 결제 수단으로 전환)",
          ]} />

          <p style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: color.inkMuted,
            fontFamily: font.family, margin: 'clamp(16px,2vw,24px) 0 8px',
          }}>
            심리적 원형 분석
          </p>
          <Body>
            잔액 부족 또는 로딩 지연으로 인해 계산대 앞에서 시간이 지체되는 경험은 단순한 기술적 불편이 아니다. 이는 타인의 시선을 의식하는 사회적 수치심(Social Embarrassment)으로 증폭된다. 이 경험이 한 번이라도 발생하면 사용자는 두 가지 방어적 행동 중 하나를 선택한다.
          </Body>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(12px,1.5vw,20px)',
            margin: 'clamp(14px,1.8vw,22px) 0',
          }}>
            {[
              {
                title: '방어 전략 A - 사전 확인 루틴',
                body: '계산대 앞에 나가기 전 자리에서 잔액 미리 확인. 앱 열기를 결제 직전이 아닌 5~10분 전으로 당김. 이 루틴이 정착되면 앱 사용 빈도는 올라가나 결제 경험은 분리됨',
              },
              {
                title: '방어 전략 B - 대체 수단 전환',
                body: '로딩 또는 잔액 부족 시 즉각 삼성페이/실물 카드로 전환. 이후 강릉페이 사용 빈도 감소. 단, 공개적 탈퇴 없이 조용히 이탈하는 패턴. 재유입 계기 없음',
              },
            ].map((card, i) => (
              <div key={i} style={{
                background: color.bg,
                borderRadius: layout.rMd,
                padding: 'clamp(16px,2vw,24px)',
              }}>
                <p style={{
                  fontSize: t.caption.size, fontWeight: 800,
                  color: color.brand, fontFamily: font.family,
                  margin: '0 0 10px', wordBreak: 'keep-all',
                }}>
                  {card.title}
                </p>
                <p style={{
                  fontSize: t.caption.size, lineHeight: 1.65,
                  fontWeight: 500, color: color.inkMuted,
                  fontFamily: font.family, margin: 0, wordBreak: 'keep-all',
                }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          <p style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: color.inkMuted,
            fontFamily: font.family, margin: 'clamp(16px,2vw,24px) 0 8px',
          }}>
            설계적 시사점
          </p>
          <Body>
            계산대 앞 민망함은 앱의 성능 문제이기 이전에 '잔액 가시성' 문제다. 사용자가 언제든 현재 잔액을 즉각 인지할 수 있는 위젯 또는 홈 화면 뱃지가 없는 구조가 이 불안을 구조화한다. 잔액이 보이지 않으면 사용자는 항상 불안하고, 불안한 사용자는 결국 가장 확실한 수단(실물 카드)으로 이탈한다.
          </Body>

          <SubTitle>2-2. 충전의 심리적 비용 (Cognitive Load of Top-Up)</SubTitle>
          <p style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: color.inkMuted,
            fontFamily: font.family, margin: '0 0 8px',
          }}>
            발화 데이터
          </p>
          <Quote lines={[
            "4050 인터뷰이 2: '항상 저는 교통카드를 충전해서 쓸 때처럼, 잔액을 좀 생각해 줘야 합니다. 반대로 신용카드는 막 써도 되니까 편하다고 생각합니다.'",
            "2030 인터뷰이 1: '충전해야 하는 방식이 가장 귀찮습니다. 바로바로 빠져나갈 수 있게 만들었으면 어땠을까 합니다.'",
            "2030 인터뷰이 2: '충전해야 한다고 해줬습니다' (친구에게 단점으로 소개)",
          ]} />

          <p style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: color.inkMuted,
            fontFamily: font.family, margin: 'clamp(16px,2vw,24px) 0 8px',
          }}>
            심리적 원형 분석
          </p>
          <Body>
            선불 충전 구조는 사용자에게 '관리 의무'를 부과한다. 신용카드나 체크카드는 구매 행동만 하면 되지만, 강릉페이는 구매 전에 잔액을 예측하고 충전량을 결정하는 인지적 작업이 선행된다. 이는 단순한 불편이 아니라 '이 서비스를 사용하기 위한 세금'으로 인식되며, 캐시백 혜택이 이 세금을 정당화해주는 구조다.
          </Body>
          <Body>
            결정적으로, 충전 과정에서 보안 비밀번호 추가 입력은 이 인지 부하를 정점으로 끌어올린다. 인터뷰이 2의 발화(비밀번호를 한 번 더 눌러서 좀 하는 게 불편할 때가 있습니다)는 보안과 편의성 간 균형이 사용자 측에 지나치게 치우쳐 있음을 보여준다.
          </Body>

          <SubTitle>2-3. 고착된 실물 카드 습관 (Entrenched Physical Card Habit)</SubTitle>
          <p style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: color.inkMuted,
            fontFamily: font.family, margin: '0 0 8px',
          }}>
            발화 데이터
          </p>
          <Quote lines={[
            "4050 인터뷰이 1: '결제할 때 전혀 앱을 사용하지 않습니다. 뭔가 앱에서 뭘 할 수 있으면 들어가는데 오로지 실물 카드로만 가능해서 직접적으로 들어가지는 않습니다.'",
            "4050 인터뷰이 2: '일단 광고를 얼른 X를 지워버리고 바로 여기 그 충전 이용 내역 거기만 딱 봅니다. 내 돈이 얼마 있나 보고 싶습니다.'",
            "2030 인터뷰이 2: '핸드폰 배터리가 빨리 닳아 꺼지는데 그런 위급한 상황이 많아서 저는 실물 카드를 가장 선호합니다.'",
          ]} />

          <p style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: color.inkMuted,
            fontFamily: font.family, margin: 'clamp(16px,2vw,24px) 0 8px',
          }}>
            심리적 원형 분석
          </p>
          <Body>
            실물 카드 선호는 단순한 '디지털 낙후성'이 아니다. 4050에게는 '카드를 긁으면 된다'는 근육 기억(Muscle Memory)이 20년 이상 형성되어 있으며, 이를 바꾸는 것은 혜택만으로 해결되지 않는다. 2030조차 배터리 불안, 앱 실행 마찰 등 다양한 현실적 이유로 실물 카드를 선호한다. 이들에게 강릉페이 앱은 '결제 도구'가 아닌 '캐시백 대시보드'다.
          </Body>
        </div>

        <Divider />

        {/* Step 3 */}
        <div ref={step3Ref} style={{
          ...revealStyle(step3Visible),
          marginBottom: 'clamp(40px,5vw,64px)',
        }}>
          <StepHeader step="3단계" title="강릉머니 vs 캐시백 - 멘탈 모델 혼선 분석" />
          <Body>
            사용자들은 강릉페이 앱 내에서 두 가지 다른 개념의 화폐를 동시에 다루고 있다. 그러나 이 두 개념이 앱 내에서 명확히 분리되지 않아 사용자의 금융 멘탈 모델과 충돌한다.
          </Body>

          <SubTitle>3-1. 두 가지 화폐의 충돌 구조</SubTitle>
          <CompareTable
            headers={['구분', '충전 잔액 (강릉머니)', '캐시백 적립금']}
            rows={STEP3_1_ROWS}
          />

          <SubTitle>3-2. 멘탈 모델 혼선이 User Journey에 미치는 영향</SubTitle>
          <KeyBox title="핵심 문제: 두 화폐가 시각적으로 동일하게 표시됨">
            <p style={{
              fontSize: t.body.size, lineHeight: t.body.lh,
              fontWeight: 500, color: color.ink, margin: 0,
              fontFamily: font.family, wordBreak: 'keep-all',
            }}>
              강릉페이 앱의 메인 화면에는 '사용 가능 금액'이라는 단일 숫자가 표시된다. 그러나 이 숫자가 '내가 충전한 금액'인지, '캐시백으로 적립된 금액'인지, 혹은 '둘의 합산'인지 사용자는 직관적으로 알 수 없다. 이로 인해 다음과 같은 구체적 여정 마찰이 발생한다.
            </p>
          </KeyBox>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1vw,14px)', margin: 'clamp(14px,1.8vw,22px) 0' }}>
            {[
              "충전 과잉 발생: '예상보다 많이 충전이 돼서 그 부분을 옮겼으면 하는데'(4050 인터뷰이 1) - 충전 화면에서 현재 잔액이 명확히 보이지 않아 중복 충전 유발",
              "환불 기능 비인지: 충전 잔액과 적립 잔액의 개념이 분리되지 않으면, 환불의 대상이 무엇인지 사용자가 판단할 수 없음. 기능이 존재해도 멘탈 모델과 맞지 않아 찾지 않음",
              "소비 계획 왜곡: 4050 인터뷰이 2의 경우 30만원 캐시백 한도를 채우기 위해 다른 카드보다 강릉페이 사용을 의도적으로 우선시. 이는 긍정적 소비 행동이나, 한도 정보가 불명확하면 이 전략적 소비가 불가능해짐",
              "신규 페이 캐시백 동일 적용 미인지: 카카오/네이버페이로 결제 시에도 10% 캐시백이 동일 적용된다는 사실을 다수 인터뷰이가 몰랐음('몰랐습니다' 복수 발화). 이는 결제 화폐 구조에 대한 이해 자체가 없음을 의미",
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: color.brand, flexShrink: 0, marginTop: 8,
                }} />
                <p style={{
                  fontSize: t.body.size, lineHeight: t.body.lh,
                  fontWeight: 500, color: color.ink,
                  fontFamily: font.family, margin: 0, wordBreak: 'keep-all',
                }}>
                  {item}
                </p>
              </div>
            ))}
          </div>

          <ImprovBox>
            메인 화면에서 '충전 잔액'과 '적립 캐시백'을 색상과 레이블로 명확히 구분하여 표시해야 한다. 이 단순한 시각적 분리만으로도 환불 기능 인지율 상승, 충전 과잉 감소, 신규 페이 연동 활성화의 세 가지 효과를 동시에 기대할 수 있다.
          </ImprovBox>
        </div>

        <Divider />

        {/* Step 4 */}
        <div ref={step4Ref} style={{
          ...revealStyle(step4Visible),
          marginBottom: 'clamp(40px,5vw,64px)',
        }}>
          <StepHeader step="4단계" title="진짜 문제 규명 - 플랫폼 성장을 가로막는 3가지 구조적 결함" />
          <Body>
            인터뷰 데이터에서 도출된 표면적 불편(로딩 지연, 글자 크기, 배너 노이즈)은 증상이다. 아래에 정의하는 세 가지는 그 증상을 유발하는 원인 구조다. 이 구조가 바뀌지 않으면 어떤 버전 업데이트도 성장이 아닌 유지보수에 그친다.
          </Body>

          <SubTitle>구조적 결함 1. B2C와 B2B의 위험한 동거 - 인터페이스 정체성 위기</SubTitle>
          <CompareTable
            headers={['소비자(B2C)가 경험하는 앱', '가맹점주(B2B)가 경험하는 앱']}
            rows={STEP4_1_ROWS}
          />
          <Body>
            두 인터뷰이(4050-1, 4050-2 모두)가 '가맹점 등록/신청, 가맹점 포탈, 사랑통, 강릉 관광' 등을 가장 쓸모없는 정보로 지목했다. 이는 소비자용 앱에 B2B 기능이 혼재되어 있어 정보 위계가 붕괴된 상태다. 더 심각한 것은 가맹점주 입장에서도 B2B 전용 기능에 접근하기 어렵다는 점이다. 결과적으로 B2C 사용자도, B2B 사용자도 각자 필요한 기능을 찾지 못하는 이중 실패 구조가 존재한다.
          </Body>
          <SolutionBox>
            소비자용 앱과 가맹점주용 앱을 분리하거나, 로그인 단계에서 역할 기반 화면을 분기해야 한다. 현재처럼 단일 앱에 모든 역할을 욱여넣는 구조는 양쪽 모두에게 최악의 경험을 제공한다.
          </SolutionBox>

          <SubTitle>구조적 결함 2. 캐시백에 종속된 단일 생존 의존 구조</SubTitle>
          <Body>
            인터뷰 전반에서 가장 일관되게 나타난 패턴은 모든 사용 동기가 캐시백 단 하나에 귀결된다는 것이다.
          </Body>
          <Quote lines={[
            "4050 인터뷰이 2: '그게 아니었다면 강릉페이를 굳이 쓰지 않았을 것'",
            "4050 인터뷰이 1: '앱을 할인을 받기 위해서 사용하지만 앱은 잘 안 볼 것 같습니다'",
            "2030 인터뷰이 1: '캐시백이 좋아서'(추천 이유 전부)",
            "2030 인터뷰이 2: '강릉페이는 충전식이라서 그런지 불편했습니다' (다른 기능은 평가 대상 외)",
          ]} />
          <Body>
            이 구조의 문제는 캐시백 비율이 조정되거나 경쟁 서비스(혜택 좋은 캐시백 카드)가 등장할 경우 사용자 이탈을 막을 구조적 방어선이 없다는 것이다. 2030 인터뷰이 1의 발화(요즘은 혜택 좋은 캐시백 카드들이 나와서 강릉페이가 좀 더 묻히는 것 같습니다)는 이미 경쟁 압력이 현실화되고 있음을 보여준다.
          </Body>
          <Body>
            플랫폼이 성장하려면 캐시백 이외의 잔류 동기(Network Effect, Switching Cost, Community Value)가 형성되어야 한다. 현재 강릉페이에는 이 중 어느 것도 없다. 앱 내 지역 커뮤니티 기능(사랑통 등)이 존재하지만 인터뷰이 누구도 활용하지 않는다는 사실은, 콘텐츠의 존재만으로는 잔류 동기가 형성되지 않음을 증명한다.
          </Body>
          <SolutionBox>
            지역 상권 발견(가맹점 추천, 리뷰), 지인 간 캐시백 선물, 스탬프 미션 등 캐시백 소비를 위한 '이유 있는 방문' 구조를 앱 안에 설계해야 한다. 지역 화폐의 본질은 지역 내 소비 순환인데, 이를 위한 발견 경험(Discovery UX)이 현재 완전히 부재하다.
          </SolutionBox>

          <SubTitle>구조적 결함 3. 가맹점 생태계의 정보 단절 - 공급자와 수요자가 서로 보이지 않는 구조</SubTitle>
          <Body>
            강릉페이의 네트워크 가치는 가맹점 수에 달려 있다. 그러나 인터뷰 데이터는 이 네트워크가 극도로 불투명하게 운영되고 있음을 보여준다.
          </Body>
          <CompareTable
            headers={['소비자 측면의 정보 단절', '가맹점주 측면의 정보 단절']}
            rows={STEP4_3_ROWS}
          />
          <Body>
            편의점 소상공인의 발화에서 충격적인 사실이 드러났다. 하루에 10명 중 5명이 '강릉페이 되나요?'라고 물어보는데, 그 이유가 편의점은 강릉페이가 안 된다는 오해 때문이라는 것이다. 즉, 실제 가맹점에서조차 고객에게 강릉페이를 이용시키지 못하는 정보 단절이 현재 진행 중이다. 가맹점 지도가 있어도 가맹점주가 자기 가게가 지도에 표시되는 줄 모른다면, 그 지도는 가치가 없다.
          </Body>
          <SolutionBox>
            가맹점주 온보딩 프로세스에 '가맹점 지도 등록 및 관리' 교육을 의무화해야 한다. 가맹점 스티커 배포를 적극적으로 진행하고, 앱 내에서 가맹점주가 직접 영업시간과 위치를 수정할 수 있는 셀프 관리 기능이 구축되어야 한다. 네트워크 가치는 가맹점 수가 아니라 활성화된 가맹점 수로 결정된다.
          </SolutionBox>
        </div>

        <Divider />

        {/* Step 5 */}
        <div ref={step5Ref} style={{
          ...revealStyle(step5Visible),
          marginBottom: 'clamp(40px,5vw,64px)',
        }}>
          <StepHeader step="5단계" title="설문조사 수정 제안 - 인사이트를 정량화할 3가지 핵심 질문" />
          <Body>
            인뎁스 인터뷰에서 도출된 가설을 대규모 표본으로 검증하기 위해, 현행 설문조사에 반드시 추가해야 할 질문 3가지를 제안한다. 각 질문은 단일 인사이트가 아닌 특정 의사결정을 위한 임계치 데이터를 수집하는 것을 목적으로 한다.
          </Body>

          <SubTitle>추가 질문 1. 불편함 인내의 임계치 측정 (Frustration Threshold Scale)</SubTitle>
          <QuestionBox>
            <p style={{ margin: '0 0 10px', fontSize: t.body.size, lineHeight: t.body.lh, fontWeight: 500, color: color.ink, fontFamily: font.family, wordBreak: 'keep-all' }}>
              강릉페이 앱을 이용할 때 다음 상황이 발생할 경우 어떻게 하시겠습니까? (결제를 위해 기다린다 / 다른 결제 수단으로 전환한다 중 선택)
            </p>
            {[
              'A. 앱 실행 후 메인 화면 로딩에 3초 이상 걸린다',
              'B. 앱 실행 후 메인 화면 로딩에 5초 이상 걸린다',
              'C. 충전 완료까지 10초 이상 걸린다',
              'D. 계산대 앞에서 잔액이 부족하여 즉시 충전이 필요한 상황이다',
            ].map((opt, i) => (
              <p key={i} style={{ margin: i < 3 ? '0 0 6px' : 0, fontSize: t.caption.size, lineHeight: 1.6, fontWeight: 600, color: color.brand, fontFamily: font.family }}>
                {opt}
              </p>
            ))}
          </QuestionBox>
          <p style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: color.inkMuted,
            fontFamily: font.family, margin: '0 0 8px',
          }}>
            이 질문이 필요한 이유
          </p>
          <Body>
            현재 인터뷰 데이터는 '로딩이 길어서 삼성페이로 전환했다'는 정성적 사실을 보여주지만, 몇 초의 로딩이 전환을 유발하는지는 알 수 없다. 이 질문을 통해 전환 임계치 시간을 정량화하면, 앱 성능 개선의 우선순위와 SLA(Service Level Agreement)를 구체적으로 설정할 수 있다. 동시에 D번 시나리오의 응답 분포는 '계산대 민망함 증후군'의 실질적 이탈 규모를 추정하는 데 활용된다.
          </Body>

          <SubTitle>추가 질문 2. 캐시백 의존도 vs 서비스 자립도 측정 (Lock-in Test)</SubTitle>
          <QuestionBox>
            <p style={{ margin: '0 0 10px', fontSize: t.body.size, lineHeight: t.body.lh, fontWeight: 500, color: color.ink, fontFamily: font.family, wordBreak: 'keep-all' }}>
              현재 강릉페이 10% 캐시백 혜택이 아래와 같이 변경된다면 강릉페이 사용 빈도가 어떻게 달라질 것 같습니까? (매우 감소 / 약간 감소 / 변화 없음 / 약간 증가 / 매우 증가 중 선택)
            </p>
            {[
              'A. 캐시백이 7%로 조정된다',
              'B. 캐시백이 5%로 조정된다',
              'C. 캐시백이 3%로 조정된다',
              'D. 캐시백이 완전히 폐지되고 강릉 내 독점 할인 혜택(특정 가맹점 추가 할인 등)으로 대체된다',
              'E. 캐시백은 유지되지만 앱에 지역 맛집 추천, 이벤트 티켓 구매 기능이 추가된다',
            ].map((opt, i) => (
              <p key={i} style={{ margin: i < 4 ? '0 0 6px' : 0, fontSize: t.caption.size, lineHeight: 1.6, fontWeight: 600, color: color.brand, fontFamily: font.family }}>
                {opt}
              </p>
            ))}
          </QuestionBox>
          <p style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: color.inkMuted,
            fontFamily: font.family, margin: '0 0 8px',
          }}>
            이 질문이 필요한 이유
          </p>
          <Body>
            4050 인터뷰이 2의 경우 5%까지 사용 의향이 있다고 발화했지만, 이것이 일반적인 패턴인지 알 수 없다. E번 선택지에 대한 응답은 캐시백 이외의 기능이 사용자 잔류 동기로 작동할 수 있는지를 측정한다. 만약 D나 E번에 대해 '변화 없음' 또는 '증가' 응답이 유의미하게 나온다면, 이는 플랫폼 확장 투자의 근거가 된다. 반대로 A번 조건에서도 다수가 '매우 감소'를 선택한다면, 서비스는 현재 혜택에 완전히 종속되어 있음이 증명된다.
          </Body>

          <SubTitle>추가 질문 3. 결제 방식 수용 의향 정밀 측정 (Payment Method Adoption Matrix)</SubTitle>
          <QuestionBox>
            <p style={{ margin: '0 0 10px', fontSize: t.body.size, lineHeight: t.body.lh, fontWeight: 500, color: color.ink, fontFamily: font.family, wordBreak: 'keep-all' }}>
              다음 각 결제 방식이 강릉페이에 도입된다면 사용 의향이 있으십니까? (각 항목에 대해 적극 사용 / 가끔 사용 / 사용 안 함 중 선택, 스마트폰 기기 종류 응답 필수)
            </p>
            {[
              'A. 카카오페이 연동 바코드 결제 (현재 시행 중)',
              'B. 네이버페이 연동 바코드 결제 (4월 도입 예정)',
              'C. 삼성페이 NFC 결제 (실물 카드 불필요)',
              'D. 애플페이 NFC 결제 (실물 카드 불필요)',
              'E. 앱 없이 실물 카드만으로 NFC 결제',
            ].map((opt, i) => (
              <p key={i} style={{ margin: i < 4 ? '0 0 6px' : 0, fontSize: t.caption.size, lineHeight: 1.6, fontWeight: 600, color: color.brand, fontFamily: font.family }}>
                {opt}
              </p>
            ))}
          </QuestionBox>
          <p style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: color.inkMuted,
            fontFamily: font.family, margin: '0 0 8px',
          }}>
            이 질문이 필요한 이유
          </p>
          <Body>
            인터뷰에서 애플페이 수요가 삼성페이 수요만큼 강하게 드러났지만, 이는 소수 표본의 발화다. 이 질문에 스마트폰 기기 종류(갤럭시/아이폰/기타)를 크로스탭으로 분석하면, 기기별 결제 방식 수요를 정량화할 수 있다. 이를 통해 삼성페이와 애플페이 중 어느 것을 먼저 도입해야 더 큰 이탈 방지 효과를 거둘 수 있는지 데이터 기반으로 결정 가능해진다.
          </Body>
        </div>

        <Divider />

        {/* Appendix */}
        <div ref={appendixRef} style={{
          ...revealStyle(appendixVisible),
        }}>
          <StepHeader step="부록" title="발화 기반 개선 우선순위 매트릭스" />
          <Body>
            인터뷰에서 도출된 개선 과제를 '사용자 영향도'와 '구현 복잡도' 기준으로 분류한 매트릭스다. 단기 로드맵 수립의 출발점으로 활용할 것을 권고한다.
          </Body>

          <CompareTable
            headers={['개선 과제', '사용자 영향도', '구현 복잡도', '근거 발화']}
            rows={APPENDIX_ROWS}
          />

          <Body noMargin>
            본 보고서는 8인 인터뷰이의 발화 데이터만을 기반으로 작성되었으며, 정량적 대표성은 후속 설문조사를 통해 검증되어야 한다. 특히 Group B 내 아이폰 사용자 비율에 따라 애플페이 도입의 우선순위가 삼성페이와 역전될 수 있으므로, 기기 분포 조사가 선행되어야 한다.
          </Body>
        </div>

      </div>
    </section>
  );
}
