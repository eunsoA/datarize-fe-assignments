import { useMemo } from 'react'
import { usePurchaseFrequency } from '@features/purchase/hooks/usePurchaseFrequency'
import { formatPriceRange } from '@features/purchase/utils/formatPriceRange'
import { BarChart } from '@features/purchase/components/BarChart/BarChart'
import { formatDateToISO } from '@features/purchase/utils/formatDateToISO'
import { PurchaseChartSkeleton } from './PurchaseChartSkeleton'
import { ErrorFallback } from '@shared/style'

type PurchaseChartProps = {
  startDate: string
  endDate: string
}

export function PurchaseChart({ startDate, endDate }: PurchaseChartProps) {
  const {
    data: purchaseFrequencyData,
    isLoading,
    error,
    refetch,
  } = usePurchaseFrequency({
    from: formatDateToISO(startDate),
    to: formatDateToISO(endDate),
  })

  const chartData = useMemo(() => {
    if (!purchaseFrequencyData) return []
    return purchaseFrequencyData.map((item) => ({
      name: formatPriceRange(item.range),
      value: item.count,
    }))
  }, [purchaseFrequencyData])

  if (isLoading) {
    return <PurchaseChartSkeleton />
  }

  if (error) {
    return (
      <ErrorFallback
        message="가격대별 구매 빈도 차트를 불러오는데 실패했습니다."
        onRetry={() => refetch()}
        minHeight={400}
      />
    )
  }

  return (
    <>
      {chartData.length > 0 ? (
        <BarChart data={chartData} />
      ) : (
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>선택한 기간에 데이터가 없습니다.</div>
      )}
    </>
  )
}
