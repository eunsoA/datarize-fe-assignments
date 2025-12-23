import styled from 'styled-components'

type ListRowProps = {
  contents: React.ReactNode
  right?: React.ReactNode
}

const StyledListRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;

  &:last-child {
    border-bottom: none;
  }
`

const ContentsWrapper = styled.div`
  flex: 1;
`

const RightWrapper = styled.div`
  margin-left: 16px;
`

export function ListRow({ contents, right }: ListRowProps) {
  return (
    <StyledListRow>
      <ContentsWrapper>{contents}</ContentsWrapper>
      {right && <RightWrapper>{right}</RightWrapper>}
    </StyledListRow>
  )
}
