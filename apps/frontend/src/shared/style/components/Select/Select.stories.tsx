import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const meta = {
  title: 'Shared/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <option value="">선택하세요</option>
        <option value="option1">옵션 1</option>
        <option value="option2">옵션 2</option>
        <option value="option3">옵션 3</option>
      </>
    ),
  },
}

export const WithValue: Story = {
  args: {
    value: 'option2',
    children: (
      <>
        <option value="option1">옵션 1</option>
        <option value="option2">옵션 2</option>
        <option value="option3">옵션 3</option>
      </>
    ),
  },
}
