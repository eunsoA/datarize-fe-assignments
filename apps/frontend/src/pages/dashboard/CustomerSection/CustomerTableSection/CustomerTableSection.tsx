import { useState, useMemo } from 'react'
import { useCustomers } from '@features/customer/hooks/useCustomers'
import { CustomerTable } from '@pages/dashboard/CustomerSection/CustomerTableSection/CustomerTable'
import { CustomerTableOption } from '@pages/dashboard/CustomerSection/CustomerTableSection/CustomerTableOption'

export type SortField = 'id' | 'count' | 'totalAmount'
export type SortOrder = 'asc' | 'desc'

export function CustomerTableSection() {
  const [searchName, setSearchName] = useState<string>('')
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const { data: customersData, isLoading, error } = useCustomers(searchName ? { name: searchName } : undefined)

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

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  if (error) {
    return <div>에러 발생: {error instanceof Error ? error.message : 'Unknown error'}</div>
  }

  if (!customersData) {
    return <div>고객 목록이 없습니다.</div>
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
      <CustomerTable customers={sortedCustomers} />
    </>
  )
}
