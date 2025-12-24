import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { Text } from '@shared/style/components/Text/Text'

const meta = {
  title: 'Shared/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
    },
    onClose: { action: 'closed' },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onClose: () => {},
    title: '',
    children: null,
  },
  render: () => {
    return (
      <Modal onClose={() => {}} title="">
        <Text>모달 내용입니다.</Text>
      </Modal>
    )
  },
}

export const WithTitle: Story = {
  args: {
    onClose: () => {},
    title: '모달 제목',
    children: null,
  },
  render: () => {
    return (
      <Modal onClose={() => {}} title="모달 제목">
        <Text>제목이 있는 모달입니다.</Text>
      </Modal>
    )
  },
}

export const WithLongContent: Story = {
  args: {
    onClose: () => {},
    title: '긴 내용 모달',
    children: null,
  },
  render: () => {
    return (
      <Modal onClose={() => {}} title="긴 내용 모달">
        <div>
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i}>
              <Text>이것은 {i + 1}번째 줄입니다. 스크롤이 가능한지 확인해보세요.</Text>
            </div>
          ))}
        </div>
      </Modal>
    )
  },
}

export const ComplexContent: Story = {
  args: {
    onClose: () => {},
    title: '복잡한 내용 모달',
    children: null,
  },
  render: () => {
    return (
      <Modal onClose={() => {}} title="복잡한 내용 모달">
        <div>
          <Text fontSize={18} fontWeight="bold">
            섹션 1
          </Text>
          <Text fontSize={18} fontWeight="bold">
            이것은 첫 번째 섹션의 내용입니다. 여러 줄의 텍스트가 들어갈 수 있습니다.
          </Text>
          <Text fontSize={18} fontWeight="bold">
            섹션 2
          </Text>
          <Text>이것은 두 번째 섹션의 내용입니다. 모달 내부에서 스크롤이 가능합니다.</Text>
        </div>
      </Modal>
    )
  },
}
