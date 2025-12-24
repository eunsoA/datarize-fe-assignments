import styled from 'styled-components'
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell, ListRow, Skeleton } from '@shared/style'

// CustomerTable과 동일한 최소 높이를 보장
const TableWrapper = styled.div`
  min-height: 300px;
  display: flex;
  flex-direction: column;
`

/**
 * 고객 테이블의 로딩 스켈레톤
 * 실제 테이블 구조와 동일한 형태로 표시
 */
export function CustomerTableSkeleton() {
  const skeletonRows = Array.from({ length: 5 })

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
              {skeletonRows.map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton width={40} height={16} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={80} height={16} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={60} height={16} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={100} height={16} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={60} height={16} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      }
    />
  )
}
