import type { Meta, StoryObj } from '@storybook/react'
import { Spacing } from './Spacing'

const meta = {
  title: 'Shared/Spacing',
  component: Spacing,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'number', min: 0, max: 100, step: 4 },
    },
  },
} satisfies Meta<typeof Spacing>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    height: 16,
  },
}

export const Large: Story = {
  args: {
    height: 40,
  },
}
