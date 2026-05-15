/**
 * MonthlyCashbackModal (B5)
 * 5월 캐시백 안내 바텀시트 — 슬라이드업/다운 애니메이션
 * prop: open (bool), onClose, monthlyCashback (number)
 */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'

export default function MonthlyCashbackModal({ open, onClose, monthlyCashback = 0 }) {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
      // 더블 rAF: mount 후 CSS 트랜지션 신뢰성 확보
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    } else {
      setVisible(false)
      const t = setTimeout(() => setMounted(false), 350)
      return () => clearTimeout(t)
    }
  }, [open])

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => onClose?.(), 350)
  }

  if (!mounted) return null

  const sheetTranslate = visible ? '0' : '100%'
  const dimOpacity = visible ? 1 : 0

  return (
    <>
      {/* 딤 */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          opacity: dimOpacity,
          transition: 'opacity 350ms cubic-bezier(0.32, 0.72, 0, 1)',
          zIndex: 400,
        }}
      />

      {/* 바텀시트 */}
      <div
        style={{
          position: 'fixed',
          left: '50%',
          bottom: 0,
          transform: `translate(-50%, ${sheetTranslate})`,
          transition: 'transform 350ms cubic-bezier(0.32, 0.72, 0, 1)',
          width: '100%',
          maxWidth: '390px',
          backgroundColor: colors.surface.card,
          borderTopLeftRadius: layout.radiusModal,
          borderTopRightRadius: layout.radiusModal,
          paddingBottom: 'max(env(safe-area-inset-bottom), 24px)',
          boxShadow: shadow.modal,
          zIndex: 401,
          fontFamily: typography.fontFamily,
        }}
      >
        {/* 핸들 */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: spacing[3] }}>
          <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: colors.gray[300] }} />
        </div>

        {/* 메가폰 SVG */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: spacing[4] }}>
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="36" cy="36" r="32" fill={colors.primary[50]} />
            <path d="M20 28 L20 44 L30 44 L46 52 L46 20 L30 28 Z" fill={colors.primary[700]} />
            <path d="M50 26 Q56 32 56 36 Q56 40 50 46" stroke={colors.primary[500]} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M53 23 Q61 31 61 36 Q61 41 53 49" stroke={colors.primary[300]} strokeWidth="2" strokeLinecap="round" fill="none" />
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

          {/* 이번 달 캐시백 행 */}
          <button
            onClick={() => { handleClose(); setTimeout(() => navigate('/cashback'), 350) }}
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
              {monthlyCashback.toLocaleString('ko-KR')}원 &gt;
            </span>
          </button>

          {/* CTA */}
          <button
            onClick={handleClose}
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
    </>
  )
}
