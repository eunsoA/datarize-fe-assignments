import { Flex, ListRow, ListHeader, Border, Skeleton } from '@shared/style'

/**
 * 고객 상세 구매 내역의 로딩 스켈레톤
 * 실제 상세 정보와 동일한 구조로 표시
 */
export function CustomerDetailSkeleton() {
  const purchaseSkeletons = Array.from({ length: 3 })

  return (
    <>
      <ListHeader title="고객 정보" />
      <ListRow
        contents={
          <Flex direction="column" gap={8} css={{ marginBottom: '16px' }}>
            <Skeleton width={100} height={14} />
            <Skeleton width={120} height={14} />
            <Skeleton width={140} height={14} />
          </Flex>
        }
      />
      <Border height={16} />

      <ListHeader title="상세 구매 내역" />
      {purchaseSkeletons.map((_, index) => (
        <ListRow
          key={index}
          contents={
            <Flex direction="column" gap={8}>
              <Skeleton width="60%" height={16} />
              <Skeleton width="40%" height={14} />
              <Skeleton width="50%" height={14} />
              <Skeleton width="45%" height={14} />
            </Flex>
          }
          right={<Skeleton width={100} height={100} borderRadius={8} />}
        />
      ))}
    </>
  )
}
