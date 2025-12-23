import styled, { css, CSSObject } from 'styled-components'

type FlexProps = {
  direction?: 'row' | 'column'
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  gap?: number
  css?: CSSObject
  children: React.ReactNode
}

const StyledFlex = styled.div.withConfig({
  shouldForwardProp: (prop) => !['alignItems', 'gap', 'direction', 'justifyContent', 'css'].includes(prop),
})<Omit<FlexProps, 'children'>>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  justify-content: ${({ justifyContent = 'flex-start' }) => justifyContent};
  align-items: ${({ alignItems = 'stretch' }) => alignItems};
  gap: ${({ gap = 0 }) => `${gap}px`};
  ${({ css: cssProp }) => cssProp && css(cssProp)}
`

export function Flex({ children, ...props }: FlexProps) {
  return <StyledFlex {...props}>{children}</StyledFlex>
}
