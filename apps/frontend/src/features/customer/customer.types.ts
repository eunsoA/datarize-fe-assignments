/**
 * 고객 정보 타입
 */
export type Customer = {
  id: number
  name: string
  count: number
  totalAmount: number
}

export type CustomerListResponse = Customer[]

export type CustomerListParams = {
  sortBy?: 'asc' | 'desc'
  name?: string
}
