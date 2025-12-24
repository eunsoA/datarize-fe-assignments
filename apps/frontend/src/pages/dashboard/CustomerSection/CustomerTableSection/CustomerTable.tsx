import styled from 'styled-components'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  ListRow,
  Text,
  colors,
} from '@shared/style'
import { openModal } from '@shared/utils/openModal'
import { Customer } from '@features/customer/customer.types'
import { CustomerDetailSection } from '@pages/dashboard/CustomerSection/CustomerDetailSection/CustomerDetailSection'
import { ErrorBoundary } from '@/shared/error/ErrorBoundary/ErrorBoundary'

type CustomerTableProps = {
  customers: Customer[]
}

// 최소 5개 row 높이를 보장하는 래퍼
// 각 row 약 52px (padding 포함) * 5 + header 약 40px = 약 300px
const TableWrapper = styled.div`
  min-height: 300px;
  display: flex;
  flex-direction: column;
`

export function CustomerTable({ customers }: CustomerTableProps) {
  const onSelectCustomer = (customer: Customer) => {
    openModal({
      title: `🛒  ${customer.name} 고객님의 구매 상세 정보`,
      content: (
        <ErrorBoundary errorMessage="고객 구매 상세 내역을 불러오는데 실패했습니다." minHeight={300}>
          <CustomerDetailSection customer={customer} />
        </ErrorBoundary>
      ),
    })
  }

  return (
    <ListRow
      contents={
        <TableWrapper>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>고객 ID</TableHeaderCell>
                <TableHeaderCell>고객명</TableHeaderCell>
                <TableHeaderCell>총 구매 횟수</TableHeaderCell>
                <TableHeaderCell>총 구매 금액 (원)</TableHeaderCell>
                <TableHeaderCell>{``}</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <TableRow key={customer.id} onClick={() => onSelectCustomer(customer)}>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.count}</TableCell>
                    <TableCell>{customer.totalAmount.toLocaleString()}원</TableCell>
                    <TableCell>
                      {
                        <Text fontSize={14} fontWeight="normal" color={colors.grey600}>
                          상세 보기
                        </Text>
                      }
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'center', padding: '40px' }}>
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableWrapper>
      }
    />
  )
}
