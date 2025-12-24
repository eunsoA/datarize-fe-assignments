import type { Meta, StoryObj } from '@storybook/react'
import { NavigationBar } from './NavigationBar'

const meta = {
  title: 'Shared/NavigationBar',
  component: NavigationBar,
  parameters: {
    layout: 'fullscreen',
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
} satisfies Meta<typeof NavigationBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '대시보드',
  },
}

export const WithDescription: Story = {
  args: {
    title: '대시보드',
    description: '이것은 설명 텍스트입니다.',
  },
}

export const LongDescription: Story = {
  args: {
    title: '가격대별 구매 빈도 차트',
    description:
      '한 달 동안 발생한 구매 데이터를 바탕으로, 각 가격대의 제품이 얼마나 많이 구매되었는지 차트로 확인할 수 있습니다.',
  },
}
