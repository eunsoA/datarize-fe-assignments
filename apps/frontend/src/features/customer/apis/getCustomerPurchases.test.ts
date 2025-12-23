import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { getCustomerPurchases } from './getCustomerPurchases'
import { mockCustomerPurchases } from '@/mocks/mockData'
import { API_CONFIG } from '@shared/config/api'

const server = setupServer(
  http.get(`${API_CONFIG.BASE_URL}/api/customers/:id/purchases`, ({ params }) => {
    const customerId = Number(params.id)
    const purchases = mockCustomerPurchases[customerId]

    if (!purchases) {
      return HttpResponse.json({ error: '고객 구매 내역을 찾을 수 없습니다.' }, { status: 404 })
    }

    return HttpResponse.json(purchases)
  }),
)

describe('getCustomerPurchases', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it('성공적으로 고객 구매 내역 데이터를 가져온다', async () => {
    const customerId = 1
    const result = await getCustomerPurchases(customerId)

    expect(result).toEqual(mockCustomerPurchases[customerId])
    expect(result).toHaveLength(3)
    expect(result[0]).toHaveProperty('date')
    expect(result[0]).toHaveProperty('quantity')
    expect(result[0]).toHaveProperty('product')
    expect(result[0]).toHaveProperty('price')
    expect(result[0]).toHaveProperty('imgSrc')
  })

  describe('고객 ID에 따른 올바른 데이터를 가져온다', () => {
    it('존재하는 고객 ID로 구매 내역을 가져온다', async () => {
      const customerId = 2
      const result = await getCustomerPurchases(customerId)

      expect(result).toEqual(mockCustomerPurchases[customerId])
      expect(result).toHaveLength(2)
    })

    it('존재하지 않는 고객 ID로 요청하면 에러가 발생한다', async () => {
      const customerId = 999

      server.use(
        http.get(`${API_CONFIG.BASE_URL}/api/customers/:id/purchases`, ({ params }) => {
          const id = Number(params.id)
          expect(id).toBe(customerId)
          return HttpResponse.json({ error: '고객 구매 내역을 찾을 수 없습니다.' }, { status: 404 })
        }),
      )

      await expect(getCustomerPurchases(customerId)).rejects.toThrow('고객 구매 내역을 찾을 수 없습니다.')
    })
  })

  it('에러 응답을 올바르게 처리한다', async () => {
    const customerId = 1
    const errorMessage = 'Server error'

    server.use(
      http.get(`${API_CONFIG.BASE_URL}/api/customers/:id/purchases`, () => {
        return HttpResponse.json({ error: errorMessage }, { status: 500 })
      }),
    )

    await expect(getCustomerPurchases(customerId)).rejects.toThrow(errorMessage)
  })

  it('네트워크 에러를 올바르게 처리한다', async () => {
    const customerId = 1

    server.use(
      http.get(`${API_CONFIG.BASE_URL}/api/customers/:id/purchases`, () => {
        return HttpResponse.error()
      }),
    )

    await expect(getCustomerPurchases(customerId)).rejects.toThrow()
  })
})
