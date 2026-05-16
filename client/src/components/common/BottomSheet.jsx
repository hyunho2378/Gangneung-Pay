// BottomSheet.jsx — S02 (p.12,37)
// 바텀시트 베이스 컴포넌트

import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'

export default function BottomSheet({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
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

      {/* 시트 */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: layout.viewport,
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: colors.surface.card,
          borderTopLeftRadius: layout.radiusModal,
          borderTopRightRadius: layout.radiusModal,
          boxShadow: shadow.modal,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: typography.fontFamily,
          animation: 'slideUp 0.28s cubic-bezier(0.32,0.72,0,1)',
        }}
      >
        {/* 핸들 바 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: spacing[3],
            paddingBottom: title ? spacing[2] : spacing[3],
          }}
        >
          <div
            style={{
              width: '32px',
              height: '4px',
              borderRadius: layout.radiusPill,
              backgroundColor: colors.gray[300],
            }}
          />
        </div>

        {/* 제목 */}
        {title && (
          <div
            style={{
              padding: `0 ${layout.margin} ${spacing[3]}`,
              borderBottom: `1px solid ${colors.gray[100]}`,
            }}
          >
            <span
              style={{
                fontSize: typography.size.md,
                fontWeight: typography.weight.semibold,
                color: colors.gray[900],
              }}
            >
              {title}
            </span>
          </div>
        )}

        {/* 콘텐츠 */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
