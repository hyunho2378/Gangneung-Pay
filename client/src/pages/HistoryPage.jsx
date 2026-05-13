import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'
import TransactionHistory from '../components/payment/TransactionHistory'

export default function HistoryPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('history')

  return (
    <ScreenContainer>
      <TopAppBarBack title="이용내역" onBack={() => navigate(-1)} />

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '24px' }}>
        <TransactionHistory tab={tab} onTabChange={setTab} balance={120000} onRefund={() => navigate('/charge')} />
      </div>
    </ScreenContainer>
  )
}
