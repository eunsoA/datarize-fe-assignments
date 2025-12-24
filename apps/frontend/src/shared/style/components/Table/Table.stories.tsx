import type { Meta, StoryObj } from '@storybook/react'
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from './Table'

const meta = {
  title: 'Shared/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>이름</TableHeaderCell>
          <TableHeaderCell>나이</TableHeaderCell>
          <TableHeaderCell>직업</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>홍길동</TableCell>
          <TableCell>30</TableCell>
          <TableCell>개발자</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>김철수</TableCell>
          <TableCell>25</TableCell>
          <TableCell>디자이너</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>이영희</TableCell>
          <TableCell>28</TableCell>
          <TableCell>기획자</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

export const ClickableRows: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>고객명</TableHeaderCell>
          <TableHeaderCell>구매 횟수</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow onClick={() => alert('Row 1 클릭')}>
          <TableCell>1</TableCell>
          <TableCell>홍길동</TableCell>
          <TableCell>10</TableCell>
        </TableRow>
        <TableRow onClick={() => alert('Row 2 클릭')}>
          <TableCell>2</TableCell>
          <TableCell>김철수</TableCell>
          <TableCell>5</TableCell>
        </TableRow>
        <TableRow onClick={() => alert('Row 3 클릭')}>
          <TableCell>3</TableCell>
          <TableCell>이영희</TableCell>
          <TableCell>8</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

export const WithColSpan: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>항목</TableHeaderCell>
          <TableHeaderCell>값</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>데이터 없음</TableCell>
          <TableCell colSpan={1} style={{ textAlign: 'center', padding: '40px' }}>
            검색 결과가 없습니다.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
