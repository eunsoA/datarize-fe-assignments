import { useQuery } from '@tanstack/react-query'
import { getPurchaseFrequency } from '@features/purchase/apis/getPurchaseFrequency'
import { PurchaseFrequencyParams } from '@/features/purchase/purchase.types'

/**
 * 가격대별 구매 빈도 데이터를 가져오는 TanStack Query hook
 * @param params 쿼리 파라미터 (from, to - ISO 8601 형식)
 * @returns 가격대별 구매 빈도 데이터
 */
export function usePurchaseFrequency(params?: PurchaseFrequencyParams) {
  return useQuery({
    queryKey: ['purchase-frequency', params],
    queryFn: () => getPurchaseFrequency(params),
    staleTime: 1000 * 60 * 5,
  })
}
