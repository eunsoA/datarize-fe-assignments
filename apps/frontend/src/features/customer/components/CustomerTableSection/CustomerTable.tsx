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
import { CustomerDetailSection } from '@features/customer/components/CustomerDetailSection/CustomerDetailSection'

type CustomerTableProps = {
  customers: Customer[]
}

export function CustomerTable({ customers }: CustomerTableProps) {
  const onSelectCustomer = (customer: Customer) => {
    openModal({
      title: `🛒  ${customer.name} 고객님의 구매 상세 정보`,
      content: <CustomerDetailSection customer={customer} />,
    })
  }

  return (
    <ListRow
      contents={
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
      }
    />
  )
}
