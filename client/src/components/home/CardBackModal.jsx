/**
 * CardBackModal (R10)
 * dotLottie face-id.lottie + State Machine "face_unlock_1"
 * 인증 완료 후 0.3초 뒤 onAuthenticated 호출 → 카드 뒷면 노출
 */

import { useState, useEffect, useRef } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import faceIdLottie from '../../assets/lottie/face-id.lottie?url'
import { colors, typography, spacing } from '../../tokens/tokens'

export default function CardBackModal({ isOpen, onClose, onAuthenticated }) {
  const [phase, setPhase] = useState('authenticating')
  const dotLottieRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      setPhase('authenticating')
      return
    }
    setPhase('authenticating')
  }, [isOpen])

  const handleComplete = () => {
    setPhase('success')
    setTimeout(() => {
      onAuthenticated?.()
      onClose?.()
    }, 300)
  }

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
        flexDirection: 'column',
        gap: spacing[6],
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
        fontFamily: typography.fontFamily,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '430px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: spacing[6],
        }}
      >
        <div style={{ width: 240, height: 202 }}>
          <DotLottieReact
            src={faceIdLottie}
            autoplay
            loop={false}
            stateMachineId="face_unlock_1"
            onComplete={handleComplete}
            dotLottieRefCallback={(instance) => { dotLottieRef.current = instance }}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <span
          style={{
            color: colors.onDark.primary,
            fontSize: typography.size.md,
            fontWeight: typography.weight.medium,
          }}
        >
          {phase === 'success' ? '인증 완료' : 'Face ID로 인증'}
        </span>
      </div>
    </div>
  )
}
