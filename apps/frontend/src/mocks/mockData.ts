import { PurchaseFrequencyItem } from '@features/purchase/purchase.types'
import { Customer, CustomerPurchase } from '@features/customer/customer.types'

/**
 * 가격대별 구매 빈도 Mock 데이터
 */
export const mockPurchaseFrequency: PurchaseFrequencyItem[] = [
  { range: '0 - 20000', count: 5 },
  { range: '20001 - 30000', count: 3 },
  { range: '30001 - 40000', count: 8 },
  { range: '40001 - 50000', count: 12 },
  { range: '50001 - 60000', count: 7 },
  { range: '60001 - 70000', count: 4 },
  { range: '70001 - 80000', count: 2 },
  { range: '80001 - 90000', count: 1 },
  { range: '90001 - 100000', count: 6 },
]

/**
 * 고객 목록 Mock 데이터
 */
export const mockCustomers: Customer[] = [
  { id: 1, name: '홍길동', count: 9, totalAmount: 740000 },
  { id: 2, name: '김영희', count: 10, totalAmount: 468000 },
  { id: 3, name: '이철수', count: 8, totalAmount: 400000 },
]

/**
 * 고객 구매 내역 Mock 데이터
 */
export const mockCustomerPurchases: Record<number, CustomerPurchase[]> = {
  1: [
    { date: '2024-07-03', quantity: 4, product: '코트', price: 400000, imgSrc: 'http://localhost:4000/imgs/coat.jpg' },
    { date: '2024-07-13', quantity: 1, product: '코트', price: 100000, imgSrc: 'http://localhost:4000/imgs/coat.jpg' },
    {
      date: '2024-07-20',
      quantity: 2,
      product: '청바지',
      price: 100000,
      imgSrc: 'http://localhost:4000/imgs/bluejeans.jpg',
    },
  ],
  2: [
    {
      date: '2024-07-05',
      quantity: 3,
      product: '원피스',
      price: 180000,
      imgSrc: 'http://localhost:4000/imgs/dress.jpg',
    },
    {
      date: '2024-07-15',
      quantity: 2,
      product: '티셔츠',
      price: 40000,
      imgSrc: 'http://localhost:4000/imgs/tshirts.jpg',
    },
  ],
  3: [
    {
      date: '2024-07-10',
      quantity: 1,
      product: '자켓',
      price: 70000,
      imgSrc: 'http://localhost:4000/imgs/jackets.jpg',
    },
  ],
}
