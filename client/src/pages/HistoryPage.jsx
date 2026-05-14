import { useNavigate } from 'react-router-dom'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBar from '../components/layout/TopAppBar'
import TransactionHistory from '../components/payment/TransactionHistory'
import BottomNavBar from '../components/layout/BottomNavBar'

export default function HistoryPage() {
  const navigate = useNavigate()

  return (
    <ScreenContainer>
      <TopAppBar />

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '100px' }}>
        <TransactionHistory balance={120000} onRefund={() => navigate('/charge')} />
      </div>

      <BottomNavBar />
    </ScreenContainer>
  )
}
