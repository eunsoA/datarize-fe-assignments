import type { Meta, StoryObj } from '@storybook/react'
import { ListHeader } from './ListHeader'

const meta = {
  title: 'Shared/List/ListHeader',
  component: ListHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
} satisfies Meta<typeof ListHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '리스트 제목',
  },
}

export const WithDescription: Story = {
  args: {
    title: '리스트 제목',
    description: '이것은 설명 텍스트입니다.',
  },
}

export const LongDescription: Story = {
  args: {
    title: '가장 많이 구매한 고객 목록 및 검색 기능',
    description:
      '고객 목록을 정렬하여 확인할 수 있습니다. 고객 Row를 클릭하면 해당 고객의 상세 구매 내역을 확인할 수 있습니다.',
  },
}
