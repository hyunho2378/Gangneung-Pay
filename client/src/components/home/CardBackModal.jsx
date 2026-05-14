import { colors, typography, layout, spacing } from '../../tokens/tokens'

const CARD_INFO = [
  { label: '카드번호', value: '**** **** **** 1234' },
  { label: 'CVC', value: '123' },
  { label: '유효기간', value: '01 / 29' },
  { label: '카드 종류', value: '체크카드' },
]

export default function CardBackModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 오버레이 */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: colors.surface.overlay,
        }}
      />

      {/* 모달 카드 */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '320px',
          maxWidth: 'calc(100% - 32px)',
          backgroundColor: colors.primary[800],
          borderRadius: layout.radiusCard,
          padding: spacing[6],
        }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: spacing[4],
            right: spacing[4],
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: colors.onDark.secondary,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 5 L15 15 M15 5 L5 15"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* 인증 배지 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: spacing[4],
          }}
        >
          <div
            style={{
              backgroundColor: colors.successBg,
              border: `1px solid ${colors.successBorder}`,
              borderRadius: layout.radiusPill,
              padding: `${spacing[1]} ${spacing[3]}`,
              fontSize: typography.size.xxs,
              color: colors.success,
              fontWeight: typography.weight.semibold,
              fontFamily: typography.fontFamily,
            }}
          >
            생체인증으로 확인됨
          </div>
        </div>

        {/* FaceID SVG 아이콘 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: spacing[4],
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect
              x="2"
              y="2"
              width="44"
              height="44"
              rx="10"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M8 2 L2 2 L2 8"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M40 2 L46 2 L46 8"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 46 L2 46 L2 40"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M40 46 L46 46 L46 40"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="18" cy="20" r="2" fill="rgba(255,255,255,0.8)" />
            <circle cx="30" cy="20" r="2" fill="rgba(255,255,255,0.8)" />
            <path
              d="M18 30 Q24 34 30 30"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M24 14 L24 17"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* 구분선 */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.15)',
            marginBottom: spacing[4],
          }}
        />

        {/* 카드 정보 */}
        {CARD_INFO.map((row) => (
          <div
            key={row.label}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: spacing[3],
            }}
          >
            <span
              style={{
                color: colors.onDark.secondary,
                fontSize: typography.size.xs,
                fontFamily: typography.fontFamily,
              }}
            >
              {row.label}
            </span>
            <span
              style={{
                color: colors.onDark.primary,
                fontSize: typography.size.sm,
                fontWeight: typography.weight.medium,
                fontFamily: typography.fontFamily,
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
