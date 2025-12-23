import styled from 'styled-components'
import { colors } from '@shared/style/token/colors'

type TextProps = {
  fontSize?: number
  fontWeight?: 'normal' | 'bold' | number
  color?: string
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
}

const StyledText = styled.span<Omit<TextProps, 'children' | 'as'>>`
  font-size: ${({ fontSize = 16 }) => `${fontSize}px`};
  font-weight: ${({ fontWeight = 'normal' }) => fontWeight};
  color: ${({ color = colors.grey900 }) => color};
`

export function Text({ as, ...props }: TextProps) {
  return <StyledText as={as} {...props} />
}
