import styled from 'styled-components'
import { colors } from '@shared/style/token/colors'

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${colors.grey100};
`

const StyledThead = styled.thead`
  background-color: ${colors.grey200};
`

const StyledTbody = styled.tbody``

const StyledTr = styled.tr.withConfig({
  shouldForwardProp: (prop) => prop !== 'clickable',
})<{ clickable?: boolean }>`
  border-bottom: 1px solid ${colors.grey300};
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};

  &:last-child {
    border-bottom: none;
  }
`

const StyledTh = styled.th`
  padding: 16px 20px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  color: ${colors.grey900};
`

const StyledTd = styled.td`
  padding: 16px 20px;
  font-size: 14px;
  color: ${colors.grey700};
`

type TableProps = {
  children: React.ReactNode
}

type TableHeaderProps = {
  children: React.ReactNode
}

type TableBodyProps = {
  children: React.ReactNode
}

type TableRowProps = {
  children: React.ReactNode
  onClick?: () => void
}

type TableHeaderCellProps = {
  children: React.ReactNode
}

type TableCellProps = {
  children: React.ReactNode
  colSpan?: number
  style?: React.CSSProperties
}

export function Table({ children }: TableProps) {
  return <StyledTable>{children}</StyledTable>
}

export function TableHeader({ children }: TableHeaderProps) {
  return <StyledThead>{children}</StyledThead>
}

export function TableBody({ children }: TableBodyProps) {
  return <StyledTbody>{children}</StyledTbody>
}

export function TableRow({ children, onClick }: TableRowProps) {
  return (
    <StyledTr clickable={!!onClick} onClick={onClick}>
      {children}
    </StyledTr>
  )
}

export function TableHeaderCell({ children }: TableHeaderCellProps) {
  return <StyledTh>{children}</StyledTh>
}

export function TableCell({ children, colSpan }: TableCellProps) {
  return <StyledTd colSpan={colSpan}>{children}</StyledTd>
}
