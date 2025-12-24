import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from './Flex'
import { colors } from '@shared/style/token/colors'

const meta = {
  title: 'Shared/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column'],
    },
    justifyContent: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
    },
    gap: {
      control: { type: 'number', min: 0, max: 50, step: 4 },
    },
  },
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>

const Box = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: '20px',
      backgroundColor: colors.primary,
      color: colors.grey100,
      borderRadius: '8px',
    }}
  >
    {children}
  </div>
)

export const Row: Story = {
  args: {
    direction: 'row',
    gap: 16,
    children: (
      <>
        <Box>Box 1</Box>
        <Box>Box 2</Box>
        <Box>Box 3</Box>
      </>
    ),
  },
}

export const Column: Story = {
  args: {
    direction: 'column',
    gap: 16,
    children: (
      <>
        <Box>Box 1</Box>
        <Box>Box 2</Box>
        <Box>Box 3</Box>
      </>
    ),
  },
}

export const Center: Story = {
  args: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    css: { height: '200px', backgroundColor: colors.grey100 },
    children: (
      <>
        <Box>중앙 정렬</Box>
      </>
    ),
  },
}

export const SpaceBetween: Story = {
  args: {
    justifyContent: 'space-between',
    gap: 16,
    children: (
      <>
        <Box>왼쪽</Box>
        <Box>오른쪽</Box>
      </>
    ),
  },
}
