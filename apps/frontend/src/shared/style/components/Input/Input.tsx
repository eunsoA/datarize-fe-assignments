import styled from 'styled-components'
import { colors } from '@shared/style/token/colors'

type InputProps = {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  max?: string
  min?: string
}

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 16px;
  border: 1px solid ${colors.grey300};
  border-radius: 8px;
  font-size: 14px;
  color: ${colors.grey900};
  background-color: ${colors.grey100};

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }

  &::placeholder {
    color: ${colors.grey400};
  }
`

export function Input({ ...props }: InputProps) {
  return <StyledInput {...props} />
}
