import { http, HttpResponse } from 'msw'
import { mockPurchaseFrequency, mockCustomers, mockCustomerPurchases } from './mockData'
import { API_CONFIG } from '@shared/config/api'

export const handlers = [
  // GET /api/purchase-frequency
  http.get(`${API_CONFIG.BASE_URL}/api/purchase-frequency`, () => {
    return HttpResponse.json(mockPurchaseFrequency)
  }),

  // GET /api/customers
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

  // GET /api/customers/:id/purchases
  http.get(`${API_CONFIG.BASE_URL}/api/customers/:id/purchases`, ({ params }) => {
    const customerId = Number(params.id)
    const purchases = mockCustomerPurchases[customerId]

    if (!purchases) {
      return HttpResponse.json({ error: 'Customer not found' }, { status: 404 })
    }

    return HttpResponse.json(purchases)
  }),
]
