/**
 * 고객 정보 타입
 */
export type Customer = {
  id: number
  name: string
  count: number
  totalAmount: number
}

/**
 * 고객 구매 내역 타입
 */
export type CustomerPurchase = {
  date: string
  quantity: number
  product: string
  price: number
  imgSrc: string
}
