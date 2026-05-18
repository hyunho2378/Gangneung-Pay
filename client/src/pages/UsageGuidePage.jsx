import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors, layout, typography, shadow } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'

const chargeFaqs = [
  {
    id: 1,
    question: '어떻게 충전하나요?',
    answer: '앱 홈 화면에서 "충전" 버튼을 탭하세요. 충전 금액을 입력하거나 빠른 금액을 선택 후 결제수단(계좌이체)을 선택해 충전할 수 있습니다. 1회 최소 충전금액은 1,000원, 최대 50만원입니다.',
  },
  {
    id: 2,
    question: '충전 후 즉시 사용 가능한가요?',
    answer: '네, 충전 즉시 사용 가능합니다. 은행 점검 시간(매일 23:30~00:30)에는 충전이 지연될 수 있습니다.',
  },
  {
    id: 3,
    question: '충전 취소는 어떻게 하나요?',
    answer: '충전 직후 취소는 고객센터(1566-4335)로 연락하시거나 앱 내 "이용내역"에서 해당 거래를 찾아 취소를 요청하세요. 충전 후 사용이 시작된 금액은 취소가 불가합니다.',
  },
  {
    id: 4,
    question: '충전 한도가 있나요?',
    answer: '1회 최대 50만원, 1일 최대 100만원, 월 최대 300만원까지 충전 가능합니다. 잔액 한도는 100만원입니다.',
  },
  {
    id: 5,
    question: '충전 실패 시 어떻게 하나요?',
    answer: '충전 실패 시 결제 금액은 자동으로 환불됩니다. 환불은 1~3 영업일 소요됩니다. 문제가 지속되면 고객센터에 문의하세요.',
  },
]

const cardApplicationSteps = [
  {
    step: 1,
    title: '앱 설치 및 회원가입',
    desc: '강릉페이 앱을 설치하고 본인인증 후 회원가입을 완료하세요.',
  },
  {
    step: 2,
    title: '카드 신청',
    desc: '홈 화면에서 "카드 신청" 또는 전체메뉴 > 카드 신청을 선택하세요.',
  },
  {
    step: 3,
    title: '배송지 입력',
    desc: '카드를 받을 주소를 입력하세요. 강릉시 거주자만 신청 가능합니다.',
  },
  {
    step: 4,
    title: '신청 완료',
    desc: '신청 완료 후 영업일 기준 3~5일 내 배송됩니다.',
  },
  {
    step: 5,
    title: '카드 수령 및 활성화',
    desc: '카드 수령 후 앱에서 활성화하면 즉시 사용 가능합니다.',
  },
]

const etcFaqs = [
  {
    id: 1,
    question: '가맹점은 어디서 확인하나요?',
    answer: '앱 하단 탭에서 "매장" 탭을 선택하면 지도 또는 리스트로 강릉페이 사용 가능 가맹점을 확인할 수 있습니다.',
  },
  {
    id: 2,
    question: '캐시백은 언제 적립되나요?',
    answer: '결제 완료 시 즉시 캐시백이 적립됩니다. 캐시백 비율은 결제 금액의 1~3%이며 이벤트 기간에는 최대 10%까지 적립됩니다.',
  },
  {
    id: 3,
    question: '지원금은 어떻게 받나요?',
    answer: '"지원금" 탭에서 맞춤 지원금을 확인하고 신청하세요. 지원 기관에 따라 별도 신청 절차가 있을 수 있습니다.',
  },
  {
    id: 4,
    question: '비밀번호를 잊어버렸어요',
    answer: '로그인 화면에서 "비밀번호 찾기"를 선택하거나 고객센터(1566-4335)에 문의하세요.',
  },
]

function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
          <span
            style={{
              fontSize: typography.size.xs,
              fontWeight: typography.weight.bold,
              color: colors.primary[700],
              flexShrink: 0,
            }}
          >
            Q
          </span>
          <span
            style={{
              fontSize: typography.size.sm,
              fontWeight: typography.weight.medium,
              color: colors.gray[900],
            }}
          >
            {question}
          </span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            flexShrink: 0,
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        >
          <path d="M6 4l4 4-4 4" stroke={colors.gray[400]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            padding: '0 16px 14px 36px',
            backgroundColor: colors.gray[50],
          }}
        >
          <p
            style={{
              fontSize: typography.size.sm,
              color: colors.gray[600],
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}

const tabs = ['충전/충전취소', '카드 신청', '기타']

export default function UsageGuidePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <ScreenContainer statusBarBg={colors.surface.card}>
      <TopAppBarBack title="이용안내" onBack={() => navigate(-1)} />

      {/* 탭 바 */}
      <div
        style={{
          display: 'flex',
          backgroundColor: colors.surface.card,
          borderBottom: `1px solid ${colors.gray[200]}`,
          flexShrink: 0,
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              flex: 1,
              padding: '13px 0',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === index ? `2px solid ${colors.primary[700]}` : '2px solid transparent',
              color: activeTab === index ? colors.primary[700] : colors.gray[500],
              fontSize: typography.size.sm,
              fontWeight: activeTab === index ? typography.weight.semibold : typography.weight.medium,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: colors.surface.background,
          padding: `${layout.margin} ${layout.margin} 24px`,
        }}
      >
        {/* 충전/충전취소 탭 */}
        {activeTab === 0 && (
          <div
            style={{
              backgroundColor: colors.surface.card,
              borderRadius: layout.radiusCard,
              overflow: 'hidden',
              boxShadow: shadow.card,
            }}
          >
            {chargeFaqs.map((faq, index) => (
              <div key={faq.id}>
                <AccordionItem question={faq.question} answer={faq.answer} />
                {index < chargeFaqs.length - 1 && (
                  <div style={{ height: '1px', backgroundColor: colors.gray[100], margin: `0 ${layout.margin}` }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* 카드 신청 탭 */}
        {activeTab === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cardApplicationSteps.map((item) => (
              <div
                key={item.step}
                style={{
                  backgroundColor: colors.surface.card,
                  borderRadius: layout.radiusCard,
                  padding: layout.margin,
                  boxShadow: shadow.card,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: colors.primary[700],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: typography.size.xs,
                      fontWeight: typography.weight.bold,
                      color: colors.surface.card,
                    }}
                  >
                    {item.step}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: typography.size.sm,
                      fontWeight: typography.weight.semibold,
                      color: colors.gray[900],
                      margin: '0 0 4px',
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontSize: typography.size.xs,
                      color: colors.gray[500],
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* 카드 신청 주의사항 */}
            <div
              style={{
                backgroundColor: colors.gray[100],
                borderRadius: layout.radiusCard,
                padding: layout.margin,
              }}
            >
              <p style={{ fontSize: typography.size.xs, fontWeight: typography.weight.semibold, color: colors.gray[600], margin: '0 0 6px' }}>
                신청 전 확인사항
              </p>
              {[
                '강릉시 거주자만 신청 가능합니다',
                '1인 1카드만 발급됩니다',
                '카드 발급 수수료는 무료입니다',
              ].map((note, i) => (
                <p key={i} style={{ fontSize: typography.size.xs, color: colors.gray[500], margin: i > 0 ? '4px 0 0' : 0, lineHeight: 1.5 }}>
                  • {note}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* 기타 탭 */}
        {activeTab === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                backgroundColor: colors.surface.card,
                borderRadius: layout.radiusCard,
                overflow: 'hidden',
                boxShadow: shadow.card,
              }}
            >
              {etcFaqs.map((faq, index) => (
                <div key={faq.id}>
                  <AccordionItem question={faq.question} answer={faq.answer} />
                  {index < etcFaqs.length - 1 && (
                    <div style={{ height: '1px', backgroundColor: colors.gray[100], margin: `0 ${layout.margin}` }} />
                  )}
                </div>
              ))}
            </div>

            {/* 고객센터 안내 */}
            <div
              style={{
                backgroundColor: colors.primary[100],
                borderRadius: layout.radiusCard,
                padding: layout.margin,
              }}
            >
              <p style={{ fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: colors.primary[700], margin: '0 0 4px' }}>
                더 궁금한 점이 있으신가요?
              </p>
              <p style={{ fontSize: typography.size.xs, color: colors.primary[700], margin: 0, lineHeight: 1.5 }}>
                고객센터 1566-4335 (평일 09:00~18:00)
              </p>
            </div>
          </div>
        )}
      </div>
    </ScreenContainer>
  )
}
