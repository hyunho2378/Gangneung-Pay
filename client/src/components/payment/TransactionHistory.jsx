// TransactionHistory.jsx — P06 (p.13)
// 이용내역/카드관리 탭 화면

import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'

function EmptyHistoryState() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${spacing[10]} ${layout.margin}`,
        gap: spacing[3],
      }}
    >
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="28" fill={colors.gray[100]} />
        <rect x="16" y="18" width="24" height="20" rx="3" stroke={colors.gray[400]} strokeWidth="2" fill="none" />
        <path d="M20 24 L36 24 M20 28 L32 28 M20 32 L28 32" stroke={colors.gray[400]} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span
        style={{
          fontSize: typography.size.sm,
          color: colors.gray[400],
          fontWeight: typography.weight.medium,
        }}
      >
        이용 내역이 없습니다
      </span>
    </div>
  )
}

function CardManagement() {
  return (
    <div style={{ padding: layout.margin }}>
      {/* 미니 카드 */}
      <div
        style={{
          backgroundColor: colors.surface.darkCard,
          borderRadius: layout.radiusCard,
          padding: spacing[5],
          boxShadow: shadow.card,
          marginBottom: spacing[4],
          position: 'relative',
          overflow: 'hidden',
          height: '160px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* 장식 원형 */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.07)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-30px',
            right: '30px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.05)',
          }}
        />

        {/* 카드 상단 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              color: colors.onDark.primary,
              fontSize: typography.size.sm,
              fontWeight: typography.weight.semibold,
            }}
          >
            강릉페이
          </span>
          {/* 칩 아이콘 */}
          <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
            <rect x="1" y="1" width="26" height="20" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <rect x="8" y="5" width="12" height="12" rx="2" fill="rgba(255,255,255,0.25)" />
            <path d="M14 5 L14 17 M8 11 L20 11" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          </svg>
        </div>

        {/* 카드 번호 */}
        <div>
          <div
            style={{
              color: colors.onDark.secondary,
              fontSize: typography.size.xs,
              marginBottom: '4px',
            }}
          >
            강릉페이(1)
          </div>
          <div
            style={{
              color: colors.onDark.primary,
              fontSize: typography.size.sm,
              fontWeight: typography.weight.medium,
              letterSpacing: '2px',
            }}
          >
            **** **** **** 1234
          </div>
        </div>
      </div>

      {/* 카드 정보 행들 */}
      {[
        { label: '카드 종류', value: '체크카드' },
        { label: '발급일', value: '2024.01.15' },
        { label: '유효기간', value: '01 / 29' },
        { label: '상태', value: '정상' },
      ].map(({ label, value }) => (
        <div
          key={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${spacing[3]} 0`,
            borderBottom: `1px solid ${colors.gray[100]}`,
          }}
        >
          <span
            style={{
              fontSize: typography.size.sm,
              color: colors.gray[500],
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontSize: typography.size.sm,
              fontWeight: typography.weight.medium,
              color: colors.gray[900],
            }}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function TransactionHistory({ tab = 'history', onTabChange }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.surface.background,
        fontFamily: typography.fontFamily,
      }}
    >
      {/* 탭 바 */}
      <div
        style={{
          display: 'flex',
          backgroundColor: colors.surface.card,
          borderBottom: `1px solid ${colors.gray[100]}`,
        }}
      >
        {[
          { key: 'history', label: '이용내역' },
          { key: 'card', label: '카드관리' },
        ].map(({ key, label }) => {
          const isActive = tab === key
          return (
            <button
              key={key}
              onClick={() => onTabChange && onTabChange(key)}
              style={{
                flex: 1,
                height: '48px',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? `2px solid ${colors.primary[700]}` : '2px solid transparent',
                fontSize: typography.size.sm,
                fontWeight: isActive ? typography.weight.semibold : typography.weight.regular,
                color: isActive ? colors.primary[700] : colors.gray[500],
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* 탭 콘텐츠 */}
      <div style={{ flex: 1, backgroundColor: colors.surface.card, marginTop: spacing[2] }}>
        {tab === 'history' ? <EmptyHistoryState /> : <CardManagement />}
      </div>
    </div>
  )
}
