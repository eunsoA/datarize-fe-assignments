import type { Meta, StoryObj } from '@storybook/react'
import { ErrorFallback } from './ErrorFallback'

const meta = {
  title: 'Shared/ErrorFallback',
  component: ErrorFallback,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onRetry: { action: 'retry clicked' },
  },
} satisfies Meta<typeof ErrorFallback>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onRetry: () => console.log('Retry clicked'),
  },
}

export const CustomMessage: Story = {
  args: {
    message: '고객 정보를 불러오는데 실패했습니다.',
    onRetry: () => console.log('Retry clicked'),
  },
}

export const CustomHeight: Story = {
  args: {
    message: '차트 데이터를 불러오는데 실패했습니다.',
    onRetry: () => console.log('Retry clicked'),
    minHeight: 400,
  },
}

export const LongMessage: Story = {
  args: {
    message: '네트워크 연결이 불안정하여 데이터를 불러올 수 없습니다. 인터넷 연결을 확인해주세요.',
    onRetry: () => console.log('Retry clicked'),
  },
}
