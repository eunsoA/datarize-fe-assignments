import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'
import { Flex } from '@shared/style/components/Flex/Flex'

const meta = {
  title: 'Shared/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: 200,
    height: 20,
  },
}

export const FullWidth: Story = {
  args: {
    width: '100%',
    height: 40,
  },
}

export const Circle: Story = {
  args: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
}

export const TextLines: Story = {
  render: () => (
    <Flex direction="column" gap={12}>
      <Skeleton width="80%" height={16} />
      <Skeleton width="90%" height={16} />
      <Skeleton width="70%" height={16} />
    </Flex>
  ),
}

export const CardSkeleton: Story = {
  render: () => (
    <Flex direction="column" gap={16} css={{ padding: '16px', border: '1px solid #E0E0E0', borderRadius: '8px' }}>
      <Skeleton width="100%" height={200} borderRadius={8} />
      <Skeleton width="60%" height={24} />
      <Skeleton width="100%" height={16} />
      <Skeleton width="100%" height={16} />
      <Skeleton width="40%" height={16} />
    </Flex>
  ),
}
