import styled from 'styled-components'
import { colors } from '@shared/style/token/colors'

type SelectProps = {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  children: React.ReactNode
}

const StyledSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid ${colors.grey300};
  border-radius: 8px;
  font-size: 14px;
  color: ${colors.grey600};
  background-color: ${colors.grey100};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`

export function Select({ children, ...props }: SelectProps) {
  return <StyledSelect {...props}>{children}</StyledSelect>
}
