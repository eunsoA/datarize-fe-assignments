import type { Meta, StoryObj } from '@storybook/react'
import { Image } from './Image'
//TODO: 이미지 추가

const meta = {
  title: 'Shared/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'number', min: 50, max: 500, step: 10 },
    },
    height: {
      control: { type: 'number', min: 50, max: 500, step: 10 },
    },
    objectFit: {
      control: 'select',
      options: ['contain', 'cover', 'fill', 'none', 'scale-down'],
    },
    borderRadius: {
      control: { type: 'number', min: 0, max: 50, step: 1 },
    },
  },
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

// Placeholder 이미지 사용
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x300'
//TODO: 이미지 추가
export const Default: Story = {
  args: {
    src: PLACEHOLDER_IMAGE,
    alt: '기본 이미지',
  },
}

export const FixedSize: Story = {
  args: {
    src: PLACEHOLDER_IMAGE,
    alt: '고정 크기 이미지',
    width: 200,
    height: 200,
  },
}

export const WithBorderRadius: Story = {
  args: {
    src: PLACEHOLDER_IMAGE,
    alt: '둥근 모서리 이미지',
    width: 200,
    height: 200,
    borderRadius: 16,
  },
}

export const Cover: Story = {
  args: {
    src: PLACEHOLDER_IMAGE,
    alt: 'Cover 이미지',
    width: 300,
    height: 200,
    objectFit: 'cover',
  },
}

export const Contain: Story = {
  args: {
    src: PLACEHOLDER_IMAGE,
    alt: 'Contain 이미지',
    width: 300,
    height: 200,
    objectFit: 'contain',
  },
}
