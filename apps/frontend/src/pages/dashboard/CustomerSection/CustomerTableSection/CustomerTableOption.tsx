import { Flex, ListRow, Select } from '@shared/style'
import { SortField, SortOrder } from '@pages/dashboard/CustomerSection/CustomerTableSection/CustomerTableSection'
import { SearchBar } from '@features/customer/components/SearchBar/SearchBar'

type CustomerTableOptionProps = {
  searchName: string
  sortField: SortField
  sortOrder: SortOrder
  onSearchNameChange: (name: string) => void
  onSortFieldChange: (field: SortField) => void
  onSortOrderChange: (order: SortOrder) => void
}

export function CustomerTableOption({
  searchName,
  sortField,
  sortOrder,
  onSearchNameChange,
  onSortFieldChange,
  onSortOrderChange,
}: CustomerTableOptionProps) {
  return (
    <ListRow
      contents={
        <Flex justifyContent="space-between" alignItems="center">
          <SearchBar searchName={searchName} onSearchNameChange={onSearchNameChange} />
          <Flex alignItems="center" gap={12}>
            <Select value={sortField} onChange={(e) => onSortFieldChange(e.target.value as SortField)}>
              <option value="id">고객 ID 기준</option>
              <option value="count">총 구매 횟수 기준</option>
              <option value="totalAmount">총 구매 금액 기준</option>
            </Select>
            <Select value={sortOrder} onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}>
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </Select>
          </Flex>
        </Flex>
      }
    />
  )
}
