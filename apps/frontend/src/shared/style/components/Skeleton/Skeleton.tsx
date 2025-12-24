import styled, { keyframes } from 'styled-components'
import { colors } from '@shared/style/token/colors'

type SkeletonProps = {
  width?: string | number
  height?: string | number
  borderRadius?: number
  className?: string
}

const shimmer = keyframes`
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
`

const StyledSkeleton = styled.div.withConfig({
  shouldForwardProp: (prop) => !['width', 'height', 'borderRadius'].includes(prop),
})<SkeletonProps>`
  width: ${({ width = '100%' }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height = 20 }) => (typeof height === 'number' ? `${height}px` : height)};
  background-color: ${colors.grey300};
  border-radius: ${({ borderRadius = 4 }) => `${borderRadius}px`};
  animation: ${shimmer} 1.5s ease-in-out infinite;
`

/**
 * 로딩 중 콘텐츠 자리를 표시하는 스켈레톤 컴포넌트
 * 단순한 회색 박스 애니메이션으로 로딩 상태를 시각적으로 표현
 */
export function Skeleton({ width, height, borderRadius, className }: SkeletonProps) {
  return <StyledSkeleton width={width} height={height} borderRadius={borderRadius} className={className} />
}
