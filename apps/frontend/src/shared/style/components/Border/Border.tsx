import styled from 'styled-components'
import { colors } from '@shared/style/token/colors'

type BorderProps = {
  height?: number
}

const StyledBorder = styled.div<BorderProps>`
  height: ${({ height = 1 }) => `${height}px`};
  background-color: ${colors.grey200};
`

export function Border({ height }: BorderProps) {
  return <StyledBorder height={height} />
}
