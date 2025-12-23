import { PurchaseFrequencyParams, PurchaseFrequencyResponse } from '@/features/purchase/purchase.types'
import { API_CONFIG } from '@shared/config/api'

/**
 * 가격대별 구매 빈도 데이터를 가져오는 API 함수
 * @param params 쿼리 파라미터 (from, to - ISO 8601 형식)
 * @returns 가격대별 구매 빈도 배열
 */
export async function getPurchaseFrequency(params?: PurchaseFrequencyParams): Promise<PurchaseFrequencyResponse> {
  const searchParams = new URLSearchParams()

  if (params?.from) {
    searchParams.append('from', params.from)
  }
  if (params?.to) {
    searchParams.append('to', params.to)
  }

  const queryString = searchParams.toString()
  const url = `${API_CONFIG.BASE_URL}/api/purchase-frequency${queryString ? `?${queryString}` : ''}`

  const response = await fetch(url)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}
