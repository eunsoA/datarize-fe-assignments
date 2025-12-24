import { colors, Flex, ListRow, Text, Image, ListHeader, Border, ErrorFallback } from '@shared/style'
import { useCustomerPurchases } from '@features/customer/hooks/useCustomerPurchases'
import { Customer } from '@features/customer/customer.types'
import { formatDate } from '@features/customer/utils/formatDate'
import { CustomerDetailSkeleton } from './CustomerDetailSkeleton'

type CustomerDetailSectionProps = {
  customer: Customer
}

export function CustomerDetailSection({ customer }: CustomerDetailSectionProps) {
  const { data: purchasesData, isLoading, error, refetch } = useCustomerPurchases(customer.id)

  if (isLoading) {
    return <CustomerDetailSkeleton />
  }

  if (error) {
    return (
      <ErrorFallback
        message="고객 구매 상세 내역을 불러오는데 실패했습니다."
        onRetry={() => refetch()}
        minHeight={300}
      />
    )
  }

  // 데이터가 없을 때
  if (!purchasesData || purchasesData.length === 0) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>해당 고객의 구매 내역이 없습니다.</div>
  }

  return (
    <>
      <ListHeader title={`고객 정보`} />
      <ListRow
        contents={
          <Flex direction="column" gap={8} css={{ marginBottom: '16px' }}>
            <Text fontSize={14} fontWeight="normal" color={colors.grey600}>
              ID: {customer.id}
            </Text>
            <Text fontSize={14} fontWeight="normal" color={colors.grey600}>
              총 구매 횟수: {customer.count}회
            </Text>
            <Text fontSize={14} fontWeight="normal" color={colors.grey600}>
              총 구매 금액: {customer.totalAmount.toLocaleString()}원
            </Text>
          </Flex>
        }
      />
      <Border height={16} />
      <ListHeader title={`상세 구매 내역`} />
      {purchasesData.map((purchase, index) => (
        <ListRow
          key={index}
          contents={
            <Flex direction="column" gap={8}>
              <Text fontSize={16} fontWeight="bold" color={colors.grey900}>
                {purchase.product}
              </Text>
              <Text fontSize={14} fontWeight="normal" color={colors.grey600}>
                수량: {purchase.quantity}개
              </Text>
              <Text fontSize={14} fontWeight="normal" color={colors.grey600}>
                총 가격: {purchase.price.toLocaleString()}원
              </Text>
              <Text fontSize={14} fontWeight="normal" color={colors.grey600}>
                구매 일자: {formatDate(purchase.date)}
              </Text>
            </Flex>
          }
          right={<Image src={purchase.imgSrc} alt={purchase.product} width={100} height={100} borderRadius={8} />}
        />
      ))}
    </>
  )
}
