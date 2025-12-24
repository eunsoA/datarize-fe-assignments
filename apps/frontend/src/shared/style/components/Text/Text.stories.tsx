import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'
import { colors } from '@shared/style/token/colors'

const meta = {
  title: 'Shared/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fontSize: {
      control: { type: 'number', min: 10, max: 32, step: 1 },
    },
    fontWeight: {
      control: 'select',
      options: ['normal', 'bold'],
    },
    color: {
      control: 'color',
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '기본 텍스트',
  },
}

export const Bold: Story = {
  args: {
    children: '굵은 텍스트',
    fontWeight: 'bold',
  },
}

export const Large: Story = {
  args: {
    children: '큰 텍스트',
    fontSize: 24,
  },
}

export const Small: Story = {
  args: {
    children: '작은 텍스트',
    fontSize: 12,
  },
}

export const Colored: Story = {
  args: {
    children: '색상이 있는 텍스트',
    color: colors.primary,
  },
}

export const AsHeading: Story = {
  args: {
    children: '제목처럼 보이는 텍스트',
    as: 'h1',
    fontSize: 32,
    fontWeight: 'bold',
  },
}
