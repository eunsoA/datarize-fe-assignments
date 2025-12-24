import { useState, useMemo } from 'react'
import { usePurchaseFrequency } from '@features/purchase/hooks/usePurchaseFrequency'
import { formatDateToISO } from '@features/purchase/utils/formatDateToISO'
import { formatPriceRange } from '@features/purchase/utils/formatPriceRange'
import { DateRangePicker } from '@features/purchase/components/DateRangePicker/DateRangePicker'
import { BarChart } from '@features/purchase/components/BarChart/BarChart'

const DEFAULT_START_DATE = '2024-07-01'
const DEFAULT_END_DATE = '2024-07-31'

export function PurchaseChartSection() {
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
