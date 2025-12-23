import { useQuery } from '@tanstack/react-query'
import { getCustomerPurchases } from '@features/customer/apis/getCustomerPurchases'

/**
 * 특정 고객의 구매 내역 데이터를 가져오는 TanStack Query hook
 * @param customerId 고객 ID (undefined일 경우 쿼리 비활성화)
 * @returns 고객 구매 내역 데이터
 */
export function useCustomerPurchases(customerId?: number) {
  return useQuery({
    queryKey: ['customer-purchases', customerId],
    queryFn: () => getCustomerPurchases(customerId!),
    enabled: customerId !== undefined,
    staleTime: 1000 * 60 * 5,
  })
}
