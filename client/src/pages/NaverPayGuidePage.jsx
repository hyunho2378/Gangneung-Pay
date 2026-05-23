import { useNavigate } from 'react-router-dom'
import { colors, layout, typography, shadow, spacing } from '../tokens/tokens'
import { usePlatform } from '../hooks/usePlatform'
import NaverLogo from '../assets/icons/Naver.svg'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'

const NAVER_GREEN = colors.success
const NAVER_GREEN_DARK = colors.explore.emeraldDark
const NAVER_BG = colors.greenBg

const steps = [
  { step: 1, title: '네이버 앱 실행', desc: '"Na.페이 > 결제 > 카드 관리"로 이동하세요' },
  { step: 2, title: '카드 등록', desc: '"카드 등록하기" 버튼을 탭하세요' },
  { step: 3, title: '강릉페이 카드 선택', desc: '제휴 카드 목록에서 "강릉페이"를 선택하세요' },
  { step: 4, title: '카드 정보 입력', desc: '카드 번호, 유효기간, CVC를 입력하세요' },
  { step: 5, title: '인증 완료', desc: 'SMS 또는 ARS 인증 후 사용 가능합니다' },
]

export default function NaverPayGuidePage() {
  const navigate = useNavigate()
  const isAndroid = usePlatform() === 'android'

  const openNaverApp = () => {
    const ua = navigator.userAgent
    if (/Android/i.test(ua)) {
      window.location.href =
        'intent://#Intent;scheme=naversearchapp;package=com.nhn.android.search;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.nhn.android.search;end'
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      window.location.href = 'naversearchapp://'
      setTimeout(() => {
        window.location.href = 'https://apps.apple.com/kr/app/id393499958'
      }, 1500)
    } else {
      window.open('https://pay.naver.com/', '_blank')
    }
  }

  return (
    <ScreenContainer statusBarBg={colors.surface.card}>
      <TopAppBarBack title="네이버페이 연동" onBack={() => navigate(-1)} />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '100px',
          backgroundColor: colors.surface.background,
        }}
      >
        {/* 헤더 배너 */}
        <div
          style={{
            backgroundColor: NAVER_BG,
            padding: '40px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={NaverLogo} alt="네이버페이" style={{ height: '36px', objectFit: 'contain', marginBottom: '16px' }} />
          <p
            style={{
              fontSize: typography.size.lg,
              fontWeight: typography.weight.bold,
              color: colors.gray[900],
              margin: '0 0 8px',
              textAlign: 'center',
            }}
          >
            강릉페이를 네이버페이로도 결제하세요
          </p>
          <p
            style={{
              fontSize: typography.size.sm,
              color: NAVER_GREEN_DARK,
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            네이버페이와 연동하면 네이버페이 결제 시{'\n'}강릉페이 잔액이 자동으로 사용됩니다
          </p>
        </div>

        <div style={{ padding: `20px ${layout.margin}` }}>
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3], marginBottom: spacing[6] }}>
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
                    backgroundColor: NAVER_GREEN,
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
                      color: 'white',
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
            <p style={{ fontSize: typography.size.xs, fontWeight: typography.weight.semibold, color: colors.gray[700], margin: '0 0 6px' }}>
              주의사항
            </p>
            {[
              '연동 후에도 강릉페이 잔액 부족 시 결제가 거절될 수 있습니다',
              '네이버페이 연동은 언제든지 해제할 수 있습니다',
            ].map((note, i) => (
              <p key={i} style={{ fontSize: typography.size.xs, color: colors.gray[500], margin: i > 0 ? '4px 0 0' : 0, lineHeight: 1.5 }}>
                • {note}
              </p>
            ))}
          </div>

          <p style={{ fontSize: typography.size.xs, color: colors.gray[400], marginTop: '12px', textAlign: 'center', lineHeight: 1.6 }}>
            본 가이드는 코나카드 공식 안내를 기반으로 합니다{'\n'}
            <a
              href="https://event.konacard.co.kr/guide/payment/naver.html"
              target="_blank"
              rel="noreferrer"
              style={{ color: colors.primary[700] }}
            >
              공식 안내 바로가기
            </a>
          </p>
        </div>
      </div>

      {/* 하단 네이버 앱 열기 버튼 */}
      <div
        style={{
          padding: `12px ${layout.margin} 24px`,
          backgroundColor: colors.surface.card,
          borderTop: `1px solid ${colors.gray[200]}`,
          flexShrink: 0,
        }}
      >
        <button
          onClick={openNaverApp}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: NAVER_GREEN,
            border: 'none',
            borderRadius: isAndroid ? layout.radiusPill : layout.radiusButton,
            color: 'white',
            fontSize: typography.size.md,
            fontWeight: typography.weight.bold,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontFamily: typography.fontFamily,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 3 L4 17 L7.5 17 L7.5 10.5 L12.5 17 L16 17 L16 3 L12.5 3 L12.5 9.5 L7.5 3 Z" fill="white" />
          </svg>
          네이버 앱 열기
        </button>
      </div>
    </ScreenContainer>
  )
}
