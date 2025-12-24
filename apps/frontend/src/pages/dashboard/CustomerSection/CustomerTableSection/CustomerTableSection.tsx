import { useState, useMemo } from 'react'
import { useCustomers } from '@features/customer/hooks/useCustomers'
import { CustomerTable } from '@pages/dashboard/CustomerSection/CustomerTableSection/CustomerTable'
import { CustomerTableOption } from '@pages/dashboard/CustomerSection/CustomerTableSection/CustomerTableOption'
import { CustomerTableSkeleton } from './CustomerTableSkeleton'
import { ErrorFallback } from '@shared/style'

export type SortField = 'id' | 'count' | 'totalAmount'
export type SortOrder = 'asc' | 'desc'

export function CustomerTableSection() {
  const [searchName, setSearchName] = useState<string>('')
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const { data: customersData, isLoading, error, refetch } = useCustomers(searchName ? { name: searchName } : undefined)

  const sortedCustomers = useMemo(() => {
    if (!customersData) return []

    const sorted = [...customersData].sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case 'id':
          comparison = a.id - b.id
          break
        case 'count':
          comparison = a.count - b.count
          break
        case 'totalAmount':
          comparison = a.totalAmount - b.totalAmount
          break
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

    return sorted
  }, [customersData, sortField, sortOrder])

  const handleSortFieldChange = (field: SortField) => {
    setSortField(field)
  }

  const handleSortOrderChange = (order: SortOrder) => {
    setSortOrder(order)
  }

  return (
    <>
      <CustomerTableOption
        searchName={searchName}
        sortField={sortField}
        sortOrder={sortOrder}
        onSearchNameChange={setSearchName}
        onSortFieldChange={handleSortFieldChange}
        onSortOrderChange={handleSortOrderChange}
      />

      {isLoading && <CustomerTableSkeleton />}

      {!isLoading && error && (
        <ErrorFallback message="고객 목록을 불러오는데 실패했습니다." onRetry={() => refetch()} minHeight={300} />
      )}

      {!isLoading && !error && customersData && <CustomerTable customers={sortedCustomers} />}
    </>
  )
}
