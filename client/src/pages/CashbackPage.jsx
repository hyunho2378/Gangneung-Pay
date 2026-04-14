import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'
import CashbackDetail from '../components/payment/CashbackDetail'
import MonthPickerSheet from '../components/common/MonthPickerSheet'

const mockCashbackItems = [
  { id: '1', storeName: '초당순두부', date: '2025.04.10 12:30', amount: 12000, cashback: 120, type: 'earn' },
  { id: '2', storeName: '보헤미안커피', date: '2025.04.08 09:15', amount: 7500, cashback: 75, type: 'earn' },
  { id: '3', storeName: '강릉중앙시장', date: '2025.04.06 15:40', amount: 35000, cashback: 350, type: 'earn' },
  { id: '4', storeName: '캐시백 차감', date: '2025.04.05 18:00', amount: -5000, cashback: -50, type: 'use' },
  { id: '5', storeName: '경포대횟집', date: '2025.04.03 19:30', amount: 80000, cashback: 800, type: 'earn' },
]

export default function CashbackPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('auto')
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  // selectedMonth: 'YYYY-MM' 형식으로 통일 (CashbackDetail, MonthPickerSheet 모두 이 형식 사용)
  const [selectedMonth, setSelectedMonth] = useState('2025-04')

  return (
    <ScreenContainer>
      <TopAppBarBack title="캐시백 내역" onBack={() => navigate(-1)} />

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '24px' }}>
        <CashbackDetail
          mode={mode}
          onModeChange={setMode}
          items={mockCashbackItems}
          selectedMonth={selectedMonth}
          onMonthPickerOpen={() => setIsPickerOpen(true)}
        />
      </div>

      {isPickerOpen && (
        <MonthPickerSheet
          isOpen={isPickerOpen}
          selected={selectedMonth}
          onSelect={(val) => {
            setSelectedMonth(val)
            setIsPickerOpen(false)
          }}
          onClose={() => setIsPickerOpen(false)}
        />
      )}
    </ScreenContainer>
  )
}
