import { ListHeader } from '@shared/style'
import { PurchaseChartSection } from '@pages/dashboard/PurchaseSection/PurchaseChartSection/PurchaseChartSection'

export function PurchaseSection() {
  return (
    <>
      <ListHeader
        title="💲 가격대별 구매 빈도 차트"
        description="한 달 동안 발생한 구매 데이터를 바탕으로, 각 가격대의 제품이 얼마나 많이 구매되었는지 차트로 확인할 수 있습니다."
      />
      <PurchaseChartSection />
    </>
  )
}
