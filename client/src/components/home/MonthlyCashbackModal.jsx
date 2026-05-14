/**
 * MonthlyCashbackModal (Task 7)
 * Strategy: S3
 * Nielsen: #1 visibility, #10 help
 * Shneiderman: #3 informative feedback
 * 5월 캐시백 안내 바텀시트 모달
 */

import { useNavigate } from 'react-router-dom'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'

export default function MonthlyCashbackModal({ isOpen, onClose }) {
  const navigate = useNavigate()

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 400,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        fontFamily: typography.fontFamily,
      }}
    >
      {/* 오버레이 */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />

      {/* 바텀시트 카드 */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '430px',
          backgroundColor: colors.surface.card,
          borderRadius: `${layout.radiusModal} ${layout.radiusModal} 0 0`,
          paddingBottom: 'max(env(safe-area-inset-bottom), 24px)',
          boxShadow: shadow.modal,
        }}
      >
        {/* 핸들 */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: spacing[3] }}>
          <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: colors.gray[300] }} />
        </div>

        {/* 메가폰 SVG — 파란색 announcement 스타일 */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: spacing[4] }}>
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 배경 원 */}
            <circle cx="36" cy="36" r="32" fill={colors.primary[50]} />
            {/* 메가폰 몸체 */}
            <path d="M20 28 L20 44 L30 44 L46 52 L46 20 L30 28 Z" fill={colors.primary[700]} />
            {/* 음파 */}
            <path d="M50 26 Q56 32 56 36 Q56 40 50 46" stroke={colors.primary[500]} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M53 23 Q61 31 61 36 Q61 41 53 49" stroke={colors.primary[300]} strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* 손잡이 */}
            <rect x="18" y="37" width="6" height="10" rx="3" fill={colors.primary[600]} />
          </svg>
        </div>

        <div style={{ padding: `${spacing[3]} ${layout.margin} 0` }}>
          {/* 타이틀 */}
          <p style={{
            margin: `0 0 ${spacing[3]}`,
            fontSize: typography.size.xl,
            fontWeight: typography.weight.bold,
            color: colors.gray[900],
            textAlign: 'center',
          }}>
            5월 캐시백 안내
          </p>

          {/* 본문 박스 */}
          <div style={{
            backgroundColor: colors.gray[50],
            borderRadius: layout.radiusCard,
            padding: spacing[4],
            marginBottom: spacing[3],
          }}>
            <p style={{ margin: 0, fontSize: typography.size.sm, color: colors.gray[700], lineHeight: 1.6 }}>
              <span style={{ color: colors.primary[700], fontWeight: typography.weight.bold }}>30만원</span>{' '}
              결제까지{' '}
              <span style={{ color: colors.primary[700], fontWeight: typography.weight.bold }}>10%</span>{' '}
              캐시백으로{' '}
              <span style={{ color: colors.primary[700], fontWeight: typography.weight.bold }}>최대 3만원</span>{' '}
              돌려받을 수 있어요
            </p>
          </div>

          <p style={{
            margin: `0 0 ${spacing[4]}`,
            fontSize: typography.size.xs,
            color: colors.gray[500],
            textAlign: 'center',
          }}>
            예산이 떨어지면 조기 종료되니 알뜰히 받아봐요!
          </p>

          {/* 구분선 */}
          <div style={{ height: '1px', backgroundColor: colors.gray[200], marginBottom: spacing[3] }} />

          {/* 이번 달 받은 캐시백 행 */}
          <button
            onClick={() => { onClose(); navigate('/cashback') }}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: `${spacing[2]} 0`,
              marginBottom: spacing[3],
              fontFamily: typography.fontFamily,
            }}
          >
            <span style={{ fontSize: typography.size.sm, color: colors.gray[700], fontWeight: typography.weight.medium }}>
              이번 달 받은 캐시백
            </span>
            <span style={{ fontSize: typography.size.sm, color: colors.primary[700], fontWeight: typography.weight.semibold }}>
              0원 &gt;
            </span>
          </button>

          {/* CTA */}
          <button
            onClick={onClose}
            style={{
              width: '100%',
              height: '52px',
              backgroundColor: colors.primary[700],
              border: 'none',
              borderRadius: layout.radiusButton,
              color: colors.onDark.primary,
              fontSize: typography.size.md,
              fontWeight: typography.weight.bold,
              cursor: 'pointer',
              fontFamily: typography.fontFamily,
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
