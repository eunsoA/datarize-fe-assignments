import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DashboardPage } from './dashboard/DashboardPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
])

export function Routes() {
  return <RouterProvider router={router} />
}
