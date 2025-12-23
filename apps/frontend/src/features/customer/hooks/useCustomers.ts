import { useQuery } from '@tanstack/react-query'
import { getCustomers } from '@features/customer/apis/getCustomers'

export type CustomerListParams = {
  sortBy?: 'asc' | 'desc'
  name?: string
}

/**
 * 고객 목록 데이터를 가져오는 TanStack Query hook
 * @param params 쿼리 파라미터 (sortBy, name)
 * @returns 고객 목록 데이터
 */
export function useCustomers(params?: CustomerListParams) {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => getCustomers(params),
    staleTime: 1000 * 60 * 5,
  })
}
