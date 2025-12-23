import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { getPurchaseFrequency } from './getPurchaseFrequency'
import { mockPurchaseFrequency } from '@/mocks/mockData'
import { API_CONFIG } from '@shared/config/api'

const server = setupServer(
  http.get(`${API_CONFIG.BASE_URL}/api/purchase-frequency`, () => {
    return HttpResponse.json(mockPurchaseFrequency)
  }),
)

describe('getPurchaseFrequency', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  describe('쿼리 파라미터에 따른 올바른 데이터를 가져온다', () => {
    it('파라미터 없이 전체 데이터를 가져온다', async () => {
      const result = await getPurchaseFrequency()

      expect(result).toEqual(mockPurchaseFrequency)
      expect(result).toHaveLength(9)
      expect(result[0]).toHaveProperty('range')
      expect(result[0]).toHaveProperty('count')
    })

    it('from과 to 파라미터를 모두 전달하면 필터링된 데이터를 가져온다', async () => {
      const from = '2024-07-01'
      const to = '2024-07-31'

      server.use(
        http.get(`${API_CONFIG.BASE_URL}/api/purchase-frequency`, ({ request }) => {
          const url = new URL(request.url)
          const requestFrom = url.searchParams.get('from')
          const requestTo = url.searchParams.get('to')

          // 파라미터가 올바르게 전달되었는지 확인
          expect(requestFrom).toBe(from)
          expect(requestTo).toBe(to)

          return HttpResponse.json(mockPurchaseFrequency)
        }),
      )

      const result = await getPurchaseFrequency({ from, to })

      expect(result).toEqual(mockPurchaseFrequency)
    })

    it('from 파라미터만 전달하면 에러가 발생한다', async () => {
      const from = '2024-07-01'

      server.use(
        http.get(`${API_CONFIG.BASE_URL}/api/purchase-frequency`, () => {
          return HttpResponse.json({ error: 'from과 to 파라미터를 모두 전달해야 합니다.' }, { status: 400 })
        }),
      )

      await expect(getPurchaseFrequency({ from })).rejects.toThrow('from과 to 파라미터를 모두 전달해야 합니다.')
    })

    it('to 파라미터만 전달하면 에러가 발생한다', async () => {
      const to = '2024-07-31'

      server.use(
        http.get(`${API_CONFIG.BASE_URL}/api/purchase-frequency`, () => {
          return HttpResponse.json({ error: 'from과 to 파라미터를 모두 전달해야 합니다.' }, { status: 400 })
        }),
      )

      await expect(getPurchaseFrequency({ to })).rejects.toThrow('from과 to 파라미터를 모두 전달해야 합니다.')
    })
  })

  it('에러 응답을 올바르게 처리한다', async () => {
    const errorMessage = 'Server error'

    server.use(
      http.get(`${API_CONFIG.BASE_URL}/api/purchase-frequency`, () => {
        return HttpResponse.json({ error: errorMessage }, { status: 500 })
      }),
    )

    await expect(getPurchaseFrequency()).rejects.toThrow(errorMessage)
  })

  it('네트워크 에러를 올바르게 처리한다', async () => {
    server.use(
      http.get(`${API_CONFIG.BASE_URL}/api/purchase-frequency`, () => {
        return HttpResponse.error()
      }),
    )

    await expect(getPurchaseFrequency()).rejects.toThrow()
  })
})
