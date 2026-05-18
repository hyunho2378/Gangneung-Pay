import { useNavigate } from 'react-router-dom'
import { colors, layout, typography, shadow } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'

const usageSteps = [
  { step: 1, title: '강릉페이 카드 발급', desc: '앱에서 강릉페이 카드를 발급받으세요. 신규 발급 시 교통카드 기능이 자동으로 포함됩니다.' },
  { step: 2, title: '잔액 충전', desc: '강릉페이 앱에서 카드에 잔액을 충전하세요. 충전된 잔액으로 교통카드를 이용할 수 있습니다.' },
  { step: 3, title: '단말기에 태그', desc: '버스·지하철 단말기에 카드를 가볍게 태그하면 결제됩니다. 후불은 지원되지 않습니다.' },
]

export default function TransportCardPage() {
  const navigate = useNavigate()

  return (
    <ScreenContainer statusBarBg={colors.surface.card}>
      <TopAppBarBack title="교통카드 기능" onBack={() => navigate(-1)} />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '24px',
          backgroundColor: colors.surface.background,
        }}
      >
        {/* 상단 안내 배너 */}
        <div
          style={{
            backgroundColor: colors.primary[700],
            padding: '32px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {/* 버스/지하철 SVG */}
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* 버스 아이콘 */}
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <rect x="8" y="10" width="36" height="26" rx="4" fill="white" opacity="0.9" />
              <rect x="12" y="14" width="12" height="10" rx="2" fill={colors.primary[700]} opacity="0.8" />
              <rect x="28" y="14" width="12" height="10" rx="2" fill={colors.primary[700]} opacity="0.8" />
              <rect x="8" y="32" width="36" height="6" rx="2" fill="white" opacity="0.7" />
              <circle cx="16" cy="42" r="4" fill="white" opacity="0.9" />
              <circle cx="36" cy="42" r="4" fill="white" opacity="0.9" />
            </svg>
            {/* 지하철 아이콘 */}
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <rect x="10" y="8" width="32" height="28" rx="6" fill="white" opacity="0.9" />
              <rect x="16" y="14" width="8" height="10" rx="2" fill={colors.primary[700]} opacity="0.8" />
              <rect x="28" y="14" width="8" height="10" rx="2" fill={colors.primary[700]} opacity="0.8" />
              <path d="M16 36l-4 6M36 36l4 6" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
              <path d="M12 36h28" stroke="white" strokeWidth="1.5" opacity="0.5" />
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                color: colors.surface.card,
                fontSize: typography.size.lg,
                fontWeight: typography.weight.bold,
                margin: '0 0 6px',
              }}
            >
              강릉페이 카드로 교통도 편리하게
            </p>
            <p
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: typography.size.sm,
                margin: 0,
              }}
            >
              버스, 지하철 어디서나 사용 가능
            </p>
          </div>
        </div>

        <div style={{ padding: `20px ${layout.margin}` }}>
          {/* 안내 카드 */}
          <div
            style={{
              backgroundColor: colors.surface.card,
              borderRadius: layout.radiusCard,
              padding: layout.margin,
              boxShadow: shadow.card,
              marginBottom: '16px',
            }}
          >
            <p
              style={{
                fontSize: typography.size.sm,
                fontWeight: typography.weight.semibold,
                color: colors.gray[900],
                margin: '0 0 8px',
              }}
            >
              강릉페이 카드는 교통카드로도 사용 가능합니다
            </p>
            <p
              style={{
                fontSize: typography.size.sm,
                color: colors.gray[600],
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              강릉페이 카드에 내장된 교통카드 기능으로 강릉 시내버스 및 전국 대중교통에서 편리하게 이용하세요.
            </p>
          </div>

          {/* 주의사항 */}
          <div
            style={{
              backgroundColor: colors.alertBg,
              borderRadius: layout.radiusCard,
              padding: layout.margin,
              marginBottom: '20px',
              border: `1px solid ${colors.alertBorder}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke={colors.error} strokeWidth="1.3" />
                <path d="M8 4.5V8.5" stroke={colors.error} strokeWidth="1.3" strokeLinecap="round" />
                <circle cx="8" cy="11" r="0.8" fill={colors.error} />
              </svg>
              <p style={{ fontSize: typography.size.xs, fontWeight: typography.weight.semibold, color: colors.error, margin: 0 }}>
                주의사항
              </p>
            </div>
            {[
              '후불 결제는 지원되지 않습니다',
              '선불 충전 후 사용 가능합니다',
              '잔액 부족 시 교통카드 이용이 거부될 수 있습니다',
            ].map((note, i) => (
              <p
                key={i}
                style={{
                  fontSize: typography.size.xs,
                  color: colors.errorDark,
                  margin: i > 0 ? '4px 0 0' : 0,
                  lineHeight: 1.5,
                }}
              >
                • {note}
              </p>
            ))}
          </div>

          {/* 사용 방법 */}
          <p
            style={{
              fontSize: typography.size.xs,
              fontWeight: typography.weight.semibold,
              color: colors.gray[500],
              margin: '0 0 10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            사용 방법
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {usageSteps.map((item) => (
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
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: colors.primary[100],
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
                      color: colors.primary[700],
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
        </div>
      </div>
    </ScreenContainer>
  )
}
