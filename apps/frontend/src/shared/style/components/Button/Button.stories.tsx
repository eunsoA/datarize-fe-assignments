import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'select',
      options: ['full', 'fit'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '버튼',
  },
}

export const FullWidth: Story = {
  args: {
    children: '전체 너비 버튼',
    width: 'full',
  },
}

export const Disabled: Story = {
  args: {
    children: '비활성화된 버튼',
    disabled: true,
  },
}

export const WithClick: Story = {
  args: {
    children: '클릭 가능한 버튼',
    onClick: () => alert('버튼이 클릭되었습니다!'),
  },
}
