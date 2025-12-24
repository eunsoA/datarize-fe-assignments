import { colors, Flex, ListRow, Text, Image, ListHeader, Border } from '@shared/style'
import { useCustomerPurchases } from '@features/customer/hooks/useCustomerPurchases'
import { Customer } from '@features/customer/customer.types'
import { formatDate } from '@features/customer/utils/formatDate'

type CustomerDetailSectionProps = {
  customer: Customer
}

export function CustomerDetailSection({ customer }: CustomerDetailSectionProps) {
  const { data: purchasesData, isLoading, error } = useCustomerPurchases(customer.id)

  if (isLoading) {
    return <div>구매 내역 로딩 중...</div>
  }

  if (error) {
    return <div>에러 발생: {error instanceof Error ? error.message : 'Unknown error'}</div>
  }

  if (!purchasesData) {
    return <div>구매 내역이 없습니다.</div>
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
