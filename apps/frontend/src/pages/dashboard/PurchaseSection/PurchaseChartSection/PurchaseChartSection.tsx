import { useState } from 'react'
import { ErrorBoundary } from '@shared/error/ErrorBoundary/ErrorBoundary'
import { DateRangePicker } from '@features/purchase/components/DateRangePicker/DateRangePicker'
import { PurchaseChart } from './PurchaseChart'

const DEFAULT_START_DATE = '2024-07-01'
const DEFAULT_END_DATE = '2024-07-31'

export function PurchaseChartSection() {
  const [startDate, setStartDate] = useState<string>(DEFAULT_START_DATE)
  const [endDate, setEndDate] = useState<string>(DEFAULT_END_DATE)

  const handleReset = () => {
    setStartDate(DEFAULT_START_DATE)
    setEndDate(DEFAULT_END_DATE)
  }

  return (
    <>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onReset={handleReset}
      />
      <ErrorBoundary errorMessage="가격대별 구매 빈도 차트를 불러오는데 실패했습니다." minHeight={400}>
        <PurchaseChart startDate={startDate} endDate={endDate} />
      </ErrorBoundary>
    </>
  )
}
