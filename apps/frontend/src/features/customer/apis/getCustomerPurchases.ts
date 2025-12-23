import { CustomerPurchase } from '@features/customer/customer.types'
import { API_CONFIG } from '@shared/config/api'

/**
 * 특정 고객의 구매 내역 데이터를 가져오는 API 함수
 * @param customerId 고객 ID
 * @returns 고객 구매 내역 배열
 */
export async function getCustomerPurchases(customerId: number): Promise<CustomerPurchase[]> {
  const url = `${API_CONFIG.BASE_URL}/api/customers/${customerId}/purchases`

  const response = await fetch(url)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}
