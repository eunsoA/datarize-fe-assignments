import { useState, useMemo } from 'react'
import { ListHeader } from '@shared/style'
import { usePurchaseFrequency } from '@features/purchase/hooks/usePurchaseFrequency'
import { DateRangePicker } from '@features/purchase/components/DateRangePicker/DateRangePicker'
import { BarChart } from '@features/purchase/components/BarChart/BarChart'
import { formatPriceRange } from '@features/purchase/utils/formatPriceRange'
import { formatDateToISO } from '@features/purchase/utils/formatDateToISO'

const DEFAULT_START_DATE = '2024-07-01'
const DEFAULT_END_DATE = '2024-07-31'

export function PurchaseSection() {
  const [startDate, setStartDate] = useState<string>(DEFAULT_START_DATE)
  const [endDate, setEndDate] = useState<string>(DEFAULT_END_DATE)

  const {
    data: purchaseFrequencyData,
    isLoading,
    error,
  } = usePurchaseFrequency({
    from: formatDateToISO(startDate),
    to: formatDateToISO(endDate),
  })

  const handleReset = () => {
    setStartDate(DEFAULT_START_DATE)
    setEndDate(DEFAULT_END_DATE)
  }

  const chartData = useMemo(() => {
    if (!purchaseFrequencyData) return []
    return purchaseFrequencyData.map((item) => ({
      name: formatPriceRange(item.range),
      value: item.count,
    }))
  }, [purchaseFrequencyData])

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  if (error) {
    return <div>에러 발생: {error instanceof Error ? error.message : 'Unknown error'}</div>
  }

  return (
    <>
      <ListHeader
        title="💲 가격대별 구매 빈도 차트"
        description="한 달 동안 발생한 구매 데이터를 바탕으로, 각 가격대의 제품이 얼마나 많이 구매되었는지 차트로 확인할 수 있습니다."
      />
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onReset={handleReset}
      />
      {chartData.length > 0 ? (
        <BarChart data={chartData} />
      ) : (
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>데이터가 없습니다.</div>
      )}
    </>
  )
}
