import { useNavigate } from 'react-router-dom'
import QRScannerScreen from '../components/payment/QRScannerScreen'

export default function QRPage() {
  const navigate = useNavigate()

  return (
    <QRScannerScreen
      onClose={() => navigate(-1)}
      balance={120000}
    />
  )
}
