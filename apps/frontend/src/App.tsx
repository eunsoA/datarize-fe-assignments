import { Routes } from '@pages/Routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@shared/config/queryClient'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  )
}

export default App
