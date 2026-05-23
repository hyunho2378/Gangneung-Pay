import { useNavigate } from 'react-router-dom'
import { colors, layout, typography, shadow } from '../tokens/tokens'
import { usePlatform } from '../hooks/usePlatform'
import KakaoLogo from '../assets/icons/Kakao.svg'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'

const steps = [
  { step: 1, title: '카카오톡 앱 실행', desc: '"카카오페이 더보기 > 결제 > 결제카드"로 이동하세요' },
  { step: 2, title: '카드 추가', desc: '"결제카드 추가" 또는 "+" 버튼을 탭하세요' },
  { step: 3, title: '강릉페이 카드 선택', desc: '카드사 목록에서 "강릉페이"를 선택하세요' },
  { step: 4, title: '카드 정보 입력', desc: '카드 번호, 유효기간, CVC를 입력하세요' },
  { step: 5, title: '인증 완료', desc: 'SMS 또는 ARS 인증 후 등록이 완료됩니다' },
]

export default function KakaoPayGuidePage() {
  const navigate = useNavigate()
  const isAndroid = usePlatform() === 'android'

  return (
    <ScreenContainer statusBarBg={colors.surface.card}>
      <TopAppBarBack title="카카오페이 연동" onBack={() => navigate(-1)} />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '100px',
          backgroundColor: colors.surface.background,
        }}
      >
        {/* 카카오페이 로고 대체 박스 */}
        <div
          style={{
            backgroundColor: colors.kakaoBg,
            padding: '40px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={KakaoLogo} alt="카카오페이" style={{ height: '36px', objectFit: 'contain', marginBottom: '16px' }} />
          <p
            style={{
              fontSize: typography.size.lg,
              fontWeight: typography.weight.bold,
              color: colors.gray[900],
              margin: '0 0 8px',
              textAlign: 'center',
            }}
          >
            강릉페이를 카카오페이로도 결제하세요
          </p>
          <p
            style={{
              fontSize: typography.size.sm,
              color: colors.gray[600],
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            카카오페이와 연동하면 카카오페이 결제 시{'\n'}강릉페이 잔액이 자동으로 사용됩니다
          </p>
        </div>

        <div style={{ padding: `20px ${layout.margin}` }}>
          {/* 단계별 안내 */}
          <p
            style={{
              fontSize: typography.size.xs,
              fontWeight: typography.weight.semibold,
              color: colors.gray[500],
              margin: '0 0 12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            연동 방법
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {steps.map((item) => (
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
                    backgroundColor: colors.kakaoYellow,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: typography.size.sm,
                      fontWeight: typography.weight.bold,
                      color: colors.kakaoDark,
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
          </div>

          {/* 주의사항 */}
          <div
            style={{
              backgroundColor: colors.gray[100],
              borderRadius: layout.radiusCard,
              padding: layout.margin,
            }}
          >
            <p style={{ fontSize: typography.size.xs, fontWeight: typography.weight.semibold, color: colors.gray[600], margin: '0 0 6px' }}>
              주의사항
            </p>
            {[
              '연동 후에도 강릉페이 잔액 부족 시 결제가 거절될 수 있습니다',
              '카카오페이 연동은 언제든지 해제할 수 있습니다',
            ].map((note, i) => (
              <p key={i} style={{ fontSize: typography.size.xs, color: colors.gray[500], margin: i > 0 ? '4px 0 0' : 0, lineHeight: 1.5 }}>
                • {note}
              </p>
            ))}
          </div>

          <p style={{ fontSize: typography.size.xs, color: colors.gray[400], marginTop: '12px', textAlign: 'center', lineHeight: 1.6 }}>
            본 가이드는 코나카드 공식 안내를 기반으로 합니다{'\n'}
            <a
              href="https://event.konacard.co.kr/guide/payment/kakao.html"
              target="_blank"
              rel="noreferrer"
              style={{ color: colors.primary[700] }}
            >
              공식 안내 바로가기
            </a>
          </p>
        </div>
      </div>

      {/* 하단 카카오페이 앱 열기 버튼 (Task 10: 딥링크 + 3단 폴백) */}
      <div
        style={{
          padding: `12px ${layout.margin} 24px`,
          backgroundColor: colors.surface.card,
          borderTop: `1px solid ${colors.gray[200]}`,
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => {
            const ua = navigator.userAgent
            const isAndroid = /Android/i.test(ua)
            const isIOS = /iPhone|iPad|iPod/i.test(ua)
            if (isAndroid) {
              window.location.href =
                'intent://kakaopay/#Intent;scheme=kakaopay;package=com.kakaopay.app;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.kakaopay.app;end'
            } else if (isIOS) {
              window.location.href = 'kakaotalk://kakaopay/home'
              setTimeout(() => {
                window.location.href = 'https://apps.apple.com/kr/app/id1283454116'
              }, 1500)
            } else {
              window.open('https://www.kakaopay.com/', '_blank')
            }
          }}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: colors.kakaoYellow,
            border: 'none',
            borderRadius: isAndroid ? layout.radiusPill : layout.radiusButton,
            color: colors.kakaoDark,
            fontSize: typography.size.md,
            fontWeight: typography.weight.bold,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 3C6.1 3 3 5.9 3 9.5c0 2.3 1.4 4.3 3.5 5.5L5.5 17l3-1.2c.5.1 1 .2 1.5.2 3.9 0 7-2.9 7-6.5S13.9 3 10 3z" fill="#3C1E1E" />
          </svg>
          카카오페이 앱 열기
        </button>
      </div>
    </ScreenContainer>
  )
}
