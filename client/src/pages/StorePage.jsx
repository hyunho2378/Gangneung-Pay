import { useNavigate } from 'react-router-dom'
import { colors, layout, typography } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBar from '../components/layout/TopAppBar'
import BottomNavBar from '../components/layout/BottomNavBar'
import QRFloatingBar from '../components/layout/QRFloatingBar'
import StoreMapScreen from '../components/store/StoreMapScreen'

export default function StorePage() {
  const navigate = useNavigate()

  return (
    <ScreenContainer>
      <TopAppBar />

      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <StoreMapScreen />
      </div>

      <QRFloatingBar />
      <BottomNavBar />
    </ScreenContainer>
  )
}
