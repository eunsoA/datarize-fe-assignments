import { ListHeader } from '@shared/style'
import { CustomerTableSection } from '@pages/dashboard/CustomerSection/CustomerTableSection/CustomerTableSection'

export function CustomerSection() {
  return (
    <>
      <ListHeader
        title="👤 가장 많이 구매한 고객"
        description="고객 목록을 정렬하여 확인할 수 있습니다. 고객 행을 클릭하면 해당 고객의 상세 구매 내역을 확인할 수 있습니다."
      />
      <CustomerTableSection />
    </>
  )
}
