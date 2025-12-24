import styled from 'styled-components'
import { colors } from '@shared/style/token/colors'
import { Flex } from '@shared/style/components/Flex/Flex'
import { Text } from '@shared/style/components/Text/Text'
import { Button } from '@shared/style/components/Button/Button'

type ErrorFallbackProps = {
  message?: string
  onRetry: () => void
  minHeight?: string | number
}

const ErrorContainer = styled.div<{ minHeight?: string | number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ minHeight = 200 }) => (typeof minHeight === 'number' ? `${minHeight}px` : minHeight)};
  padding: 24px;
  background-color: ${colors.grey200};
  border-radius: 8px;
  border: 1px solid ${colors.grey300};
`

const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`

/**
 * API 요청 실패 시 표시하는 에러 UI 컴포넌트
 * 에러 메시지와 재시도 버튼을 포함
 */
export function ErrorFallback({
  message = '데이터를 불러오는데 실패했습니다.',
  onRetry,
  minHeight,
}: ErrorFallbackProps) {
  return (
    <ErrorContainer minHeight={minHeight}>
      <Flex direction="column" alignItems="center" gap={16}>
        <ErrorIcon>⚠️</ErrorIcon>
        <Flex direction="column" alignItems="center" gap={8}>
          <Text fontSize={16} fontWeight="bold" color={colors.grey900}>
            {message}
          </Text>
          <Text fontSize={14} fontWeight="normal" color={colors.grey600}>
            다시 시도해주세요.
          </Text>
        </Flex>
        <Button onClick={onRetry}>새로고침</Button>
      </Flex>
    </ErrorContainer>
  )
}
