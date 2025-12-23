import styled from 'styled-components'

type SpacingProps = {
  height: number
}

const StyledSpacing = styled.div<SpacingProps>`
  height: ${({ height }) => `${height}px`};
`

export function Spacing({ height }: SpacingProps) {
  return <StyledSpacing height={height} />
}
