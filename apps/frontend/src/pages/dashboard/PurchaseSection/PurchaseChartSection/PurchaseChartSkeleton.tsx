import styled from 'styled-components'
import { colors, Skeleton, Flex } from '@shared/style'

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  padding: 10px 40px;
  background-color: ${colors.grey100};
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 16px;
`

/**
 * 가격대별 구매 빈도 차트의 로딩 스켈레톤
 * 실제 바 차트와 유사한 구조로 표시
 */
export function PurchaseChartSkeleton() {
  const barHeights = [120, 180, 240, 200, 280, 220, 160, 140, 100]

  return (
    <ChartContainer>
      {barHeights.map((height, index) => (
        <Flex key={index} direction="column" alignItems="center" gap={8} css={{ flex: 1 }}>
          <Skeleton width="100%" height={height} borderRadius={8} />
          <Skeleton width="80%" height={12} borderRadius={4} />
        </Flex>
      ))}
    </ChartContainer>
  )
}
