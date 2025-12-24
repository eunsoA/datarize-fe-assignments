import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@shared/style'

type ErrorBoundaryProps = {
  /**
   * ErrorBoundary로 보호할 자식 컴포넌트
   */
  children: React.ReactNode
  /**
   * 에러 발생 시 표시할 메시지
   */
  errorMessage?: string
  /**
   * ErrorFallback 컴포넌트의 최소 높이
   */
  minHeight?: string | number
  /**
   * 에러 발생 시 호출될 콜백 (로깅 등에 사용)
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

/**
 * react-error-boundary를 활용한 에러 경계 컴포넌트
 * 각 섹션을 독립적으로 보호하여 한 부분의 에러가 전체 앱에 영향을 주지 않도록 함
 *
 * @example
 * ```tsx
 * <ErrorBoundary errorMessage="차트를 불러오는데 실패했습니다" minHeight={300}>
 *   <ChartComponent />
 * </ErrorBoundary>
 * ```
 */
export function ErrorBoundary({ children, errorMessage, minHeight, onError }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => (
        <ErrorFallback message={errorMessage} onRetry={resetErrorBoundary} minHeight={minHeight} />
      )}
      onError={onError}
      onReset={() => {
        // 에러 상태 초기화 시 필요한 로직 (예: 쿼리 무효화)
        // 현재는 컴포넌트 재마운트로 충분
      }}
    >
      {children}
    </ReactErrorBoundary>
  )
}
