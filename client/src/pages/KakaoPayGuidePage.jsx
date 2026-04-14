import { useNavigate } from 'react-router-dom'
import { colors, layout, typography, shadow } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'

const steps = [
  { step: 1, title: '카카오페이 앱 실행', desc: '카카오페이 앱을 실행하거나 카카오톡에서 카카오페이로 이동하세요' },
  { step: 2, title: '강릉페이 연동', desc: '카카오페이 설정 > 연결 서비스에서 강릉페이를 선택해 연동하세요' },
  { step: 3, title: '결제', desc: '강릉페이 가맹점에서 카카오페이로 결제하면 강릉페이 잔액이 자동 차감됩니다' },
]

export default function KakaoPayGuidePage() {
  const navigate = useNavigate()

  return (
    <ScreenContainer>
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
          <div
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: colors.kakaoYellow,
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}
          >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path
                d="M22 8C13.2 8 6 13.8 6 21c0 4.9 3 9.2 7.5 11.8L12 36l5.8-2.4c1.4.4 2.8.5 4.2.5 8.8 0 16-5.8 16-13s-7.2-13-16-13z"
                fill="#3C1E1E"
              />
              <circle cx="16" cy="21" r="2" fill="#FEF08A" />
              <circle cx="22" cy="21" r="2" fill="#FEF08A" />
              <circle cx="28" cy="21" r="2" fill="#FEF08A" />
            </svg>
          </div>
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
        </div>
      </div>

      {/* 하단 카카오페이 앱 열기 버튼 */}
      <div
        style={{
          padding: `12px ${layout.margin} 24px`,
          backgroundColor: colors.surface.card,
          borderTop: `1px solid ${colors.gray[200]}`,
          flexShrink: 0,
        }}
      >
        <button
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: colors.kakaoYellow,
            border: 'none',
            borderRadius: layout.radiusButton,
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
