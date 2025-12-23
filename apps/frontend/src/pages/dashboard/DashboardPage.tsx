import { PurchaseSection } from './PurchaseSection/PurchaseSection'
import { CustomerSection } from './CustomerSection/CustomerSection'
import { NavigationBar, Spacing, Border } from '@shared/style'

export function DashboardPage() {
  return (
    <div>
      <NavigationBar title="📊 쇼핑몰 구매 데이터 대시보드" description="7월 구매 데이터 기반 분석 결과" />

      <PurchaseSection />
      <Spacing height={20} />

      <Border height={20} />

      <CustomerSection />
      <Spacing height={20} />
    </div>
  )
}
