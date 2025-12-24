import type { Meta, StoryObj } from '@storybook/react'
import { ListRow } from './ListRow'
import { Text } from '@shared/style/components/Text/Text'
import { colors } from '@shared/style/token/colors'

const meta = {
  title: 'Shared/List/ListRow',
  component: ListRow,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    contents: {
      control: false,
    },
    right: {
      control: false,
    },
  },
} satisfies Meta<typeof ListRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    contents: <Text>리스트 항목 내용</Text>,
  },
}

export const WithRightContent: Story = {
  args: {
    contents: <Text>리스트 항목 내용</Text>,
    right: (
      <Text fontSize={14} color={colors.grey600}>
        우측 내용
      </Text>
    ),
  },
}

export const ComplexContent: Story = {
  args: {
    contents: (
      <div>
        <Text fontSize={16} fontWeight="bold">
          제목
        </Text>
        <Text fontSize={14} color={colors.grey600}>
          설명 텍스트
        </Text>
      </div>
    ),
    right: (
      <Text fontSize={14} color={colors.primary}>
        액션
      </Text>
    ),
  },
}
