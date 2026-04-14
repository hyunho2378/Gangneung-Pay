import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChargeScreen from '../components/payment/ChargeScreen'
import RefundGuideModal from '../components/common/RefundGuideModal'

export default function ChargePage() {
  const navigate = useNavigate()
  const [isRefundOpen, setIsRefundOpen] = useState(false)

  return (
    <>
      <ChargeScreen
        onClose={() => navigate(-1)}
        onRefundGuide={() => setIsRefundOpen(true)}
      />
      {isRefundOpen && (
        <RefundGuideModal onClose={() => setIsRefundOpen(false)} />
      )}
    </>
  )
}
