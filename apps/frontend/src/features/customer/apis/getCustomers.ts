import { Customer } from '@features/customer/customer.types'
import { CustomerListParams } from '@features/customer/hooks/useCustomers'
import { API_CONFIG } from '@shared/config/api'

/**
 * 고객 목록 데이터를 가져오는 API 함수
 * @param params 쿼리 파라미터 (sortBy, name)
 * @returns 고객 목록 배열
 */
export async function getCustomers(params?: CustomerListParams): Promise<Customer[]> {
  const searchParams = new URLSearchParams()

  if (params?.sortBy) {
    searchParams.append('sortBy', params.sortBy)
  }
  if (params?.name) {
    searchParams.append('name', params.name)
  }

  const queryString = searchParams.toString()
  const url = `${API_CONFIG.BASE_URL}/api/customers${queryString ? `?${queryString}` : ''}`

  const response = await fetch(url)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}
