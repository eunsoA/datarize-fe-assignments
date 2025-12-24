import type { Meta, StoryObj } from '@storybook/react'
import { Border } from './Border'
import { Text } from '@shared/style/components/Text/Text'

const meta = {
  title: 'Shared/Border',
  component: Border,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'number', min: 1, max: 20, step: 1 },
    },
  },
} satisfies Meta<typeof Border>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div>
      <Border height={20} />
    </div>
  ),
}

export const Thick: Story = {
  render: () => (
    <div>
      <Text>위쪽 내용</Text>
      <Border height={4} />
      <Text>아래쪽 내용</Text>
    </div>
  ),
}

export const Multiple: Story = {
  render: () => (
    <div>
      <Text>첫 번째 섹션</Text>
      <Border height={10} />
      <Text>두 번째 섹션</Text>
      <Border height={10} />
      <Text>세 번째 섹션</Text>
    </div>
  ),
}
