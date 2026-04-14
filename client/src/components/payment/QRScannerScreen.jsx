// QRScannerScreen.jsx — P01 (p.10)
// QR 스캔 전체 화면

import { useState } from 'react'
import { ArrowLeft, CreditCard, Zap, ZapOff } from 'lucide-react'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'

export default function QRScannerScreen({ onClose, balance = 120000 }) {
  const [flashOn, setFlashOn] = useState(false)

  const formattedBalance = balance.toLocaleString('ko-KR') + '원'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: typography.fontFamily,
        zIndex: 100,
      }}
    >
      {/* 상단 헤더 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: `${spacing[3]} ${layout.margin}`,
          paddingTop: '52px',
          gap: spacing[3],
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: spacing[1],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </button>
        <span
          style={{
            color: '#FFFFFF',
            fontSize: typography.size.md,
            fontWeight: typography.weight.semibold,
          }}
        >
          QR 결제하기
        </span>
      </div>

      {/* 중앙 카메라 영역 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ position: 'relative', width: '250px', height: '250px' }}>
          {/* 회색 placeholder 영역 */}
          <div
            style={{
              width: '250px',
              height: '250px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: layout.radiusSmall,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: typography.size.xs,
                fontWeight: typography.weight.medium,
              }}
            >
              카메라 준비 중
            </span>
          </div>

          {/* L자형 코너 브래킷 — 좌상단 */}
          <svg
            style={{ position: 'absolute', top: 0, left: 0 }}
            width="32" height="32" viewBox="0 0 32 32" fill="none"
          >
            <path d="M2 26 L2 2 L26 2" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>

          {/* L자형 코너 브래킷 — 우상단 */}
          <svg
            style={{ position: 'absolute', top: 0, right: 0 }}
            width="32" height="32" viewBox="0 0 32 32" fill="none"
          >
            <path d="M6 2 L30 2 L30 26" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>

          {/* L자형 코너 브래킷 — 좌하단 */}
          <svg
            style={{ position: 'absolute', bottom: 0, left: 0 }}
            width="32" height="32" viewBox="0 0 32 32" fill="none"
          >
            <path d="M2 6 L2 30 L26 30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>

          {/* L자형 코너 브래킷 — 우하단 */}
          <svg
            style={{ position: 'absolute', bottom: 0, right: 0 }}
            width="32" height="32" viewBox="0 0 32 32" fill="none"
          >
            <path d="M6 30 L30 30 L30 6" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
      </div>

      {/* 하단 흰색 카드 패널 */}
      <div
        style={{
          backgroundColor: colors.surface.card,
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          padding: spacing[5],
          boxShadow: shadow.modal,
        }}
      >
        {/* 현재 카드 정보 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: spacing[4],
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: colors.primary[700],
                borderRadius: layout.radiusSmall,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CreditCard size={20} color="#FFFFFF" />
            </div>
            <div>
              <div
                style={{
                  fontSize: typography.size.sm,
                  fontWeight: typography.weight.semibold,
                  color: colors.gray[900],
                }}
              >
                강릉페이(1)
              </div>
              <div
                style={{
                  fontSize: typography.size.xs,
                  color: colors.gray[500],
                  marginTop: '2px',
                }}
              >
                잔액 {formattedBalance}
              </div>
            </div>
          </div>

          <button
            style={{
              backgroundColor: 'transparent',
              border: `1px solid ${colors.gray[200]}`,
              borderRadius: layout.radiusButton,
              padding: `${spacing[1]} ${spacing[3]}`,
              fontSize: typography.size.xs,
              fontWeight: typography.weight.medium,
              color: colors.gray[700],
              cursor: 'pointer',
            }}
          >
            카드 변경
          </button>
        </div>

        {/* 구분선 */}
        <div
          style={{
            height: '1px',
            backgroundColor: colors.gray[100],
            marginBottom: spacing[4],
          }}
        />

        {/* 플래시 토글 버튼 */}
        <button
          onClick={() => setFlashOn((prev) => !prev)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing[2],
            backgroundColor: flashOn ? colors.primary[100] : colors.gray[100],
            border: 'none',
            borderRadius: layout.radiusButton,
            padding: spacing[3],
            fontSize: typography.size.sm,
            fontWeight: typography.weight.medium,
            color: flashOn ? colors.primary[700] : colors.gray[500],
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {flashOn ? <Zap size={18} /> : <ZapOff size={18} />}
          {flashOn ? '플래시 켜짐' : '플래시'}
        </button>
      </div>
    </div>
  )
}
