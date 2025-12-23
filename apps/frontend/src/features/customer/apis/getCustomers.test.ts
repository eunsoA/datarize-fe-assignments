import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { getCustomers } from './getCustomers'
import { mockCustomers } from '@mocks/mockData'
import { API_CONFIG } from '@shared/config/api'

const server = setupServer(
  http.get(`${API_CONFIG.BASE_URL}/api/customers`, ({ request }) => {
    const url = new URL(request.url)
    const sortBy = url.searchParams.get('sortBy') || null
    const name = url.searchParams.get('name') || null

    let filteredCustomers = [...mockCustomers]

    if (name) {
      filteredCustomers = filteredCustomers.filter((customer) =>
        customer.name.toLowerCase().includes(name.toLowerCase()),
      )
    }

    if (sortBy === 'asc' || sortBy === 'desc') {
      filteredCustomers.sort((a, b) => {
        const comparison = b.totalAmount - a.totalAmount
        return sortBy === 'asc' ? -comparison : comparison
      })
    }

    return HttpResponse.json(filteredCustomers)
  }),
)

describe('getCustomers', () => {
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
    it('파라미터 없이 전체 고객 목록을 가져온다', async () => {
      const result = await getCustomers()

      expect(result).toEqual(mockCustomers)
      expect(result).toHaveLength(3)
      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('count')
      expect(result[0]).toHaveProperty('totalAmount')
    })

    it('sortBy=asc 파라미터로 오름차순 정렬된 데이터를 가져온다', async () => {
      const result = await getCustomers({ sortBy: 'asc' })

      expect(result).toHaveLength(3)
      expect(result[0].totalAmount).toBeLessThanOrEqual(result[1].totalAmount)
      expect(result[1].totalAmount).toBeLessThanOrEqual(result[2].totalAmount)
    })

    it('sortBy=desc 파라미터로 내림차순 정렬된 데이터를 가져온다', async () => {
      const result = await getCustomers({ sortBy: 'desc' })

      expect(result).toHaveLength(3)
      expect(result[0].totalAmount).toBeGreaterThanOrEqual(result[1].totalAmount)
      expect(result[1].totalAmount).toBeGreaterThanOrEqual(result[2].totalAmount)
    })

    it('name 파라미터로 이름 검색 결과를 가져온다', async () => {
      const searchName = '홍'

      server.use(
        http.get(`${API_CONFIG.BASE_URL}/api/customers`, ({ request }) => {
          const url = new URL(request.url)
          const name = url.searchParams.get('name')

          expect(name).toBe(searchName)

          const filtered = mockCustomers.filter((customer) =>
            customer.name.toLowerCase().includes(searchName.toLowerCase()),
          )

          return HttpResponse.json(filtered)
        }),
      )

      const result = await getCustomers({ name: searchName })

      expect(result).toHaveLength(1)
      expect(result[0].name).toContain(searchName)
    })

    it('sortBy와 name 파라미터를 함께 사용할 수 있다', async () => {
      const searchName = '김'

      server.use(
        http.get(`${API_CONFIG.BASE_URL}/api/customers`, ({ request }) => {
          const url = new URL(request.url)
          const sortBy = url.searchParams.get('sortBy')
          const name = url.searchParams.get('name')

          expect(sortBy).toBe('desc')
          expect(name).toBe(searchName)

          const filtered = mockCustomers.filter((customer) =>
            customer.name.toLowerCase().includes(searchName.toLowerCase()),
          )

          if (sortBy === 'desc') {
            filtered.sort((a, b) => b.totalAmount - a.totalAmount)
          }

          return HttpResponse.json(filtered)
        }),
      )

      const result = await getCustomers({ sortBy: 'desc', name: searchName })

      expect(result).toHaveLength(1)
      expect(result[0].name).toContain(searchName)
    })
  })

  it('에러 응답을 올바르게 처리한다', async () => {
    const errorMessage = 'Server error'

    server.use(
      http.get(`${API_CONFIG.BASE_URL}/api/customers`, () => {
        return HttpResponse.json({ error: errorMessage }, { status: 500 })
      }),
    )

    await expect(getCustomers()).rejects.toThrow(errorMessage)
  })

  it('네트워크 에러를 올바르게 처리한다', async () => {
    server.use(
      http.get(`${API_CONFIG.BASE_URL}/api/customers`, () => {
        return HttpResponse.error()
      }),
    )

    await expect(getCustomers()).rejects.toThrow()
  })
})
