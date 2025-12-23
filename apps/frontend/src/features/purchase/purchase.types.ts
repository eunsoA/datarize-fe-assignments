/**
 * 가격대별 구매 빈도 타입
 */
export type PurchaseFrequencyItem = {
  range: string
  count: number
}

export type PurchaseFrequencyResponse = PurchaseFrequencyItem[]

export type PurchaseFrequencyParams = {
  from?: string // ISO 8601 형식의 시작 날짜
  to?: string // ISO 8601 형식의 종료 날짜
}
