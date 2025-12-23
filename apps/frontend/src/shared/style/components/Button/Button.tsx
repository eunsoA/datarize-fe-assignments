import styled from 'styled-components'
import { colors } from '@shared/style/token/colors'

type ButtonProps = {
  width?: 'full' | 'fit'
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'width',
})<Omit<ButtonProps, 'children'>>`
  width: ${({ width = 'fit' }) => (width === 'full' ? '100%' : 'auto')};
  padding: 8px 12px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s;
  background-color: ${({ disabled }) => (disabled ? colors.grey300 : colors.primary)};
  color: ${({ disabled }) => (disabled ? colors.grey500 : colors.grey100)};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? colors.grey300 : colors.primaryHover)};
  }

  &:active {
    background-color: ${({ disabled }) => (disabled ? colors.grey300 : colors.primaryPressed)};
  }
`

export function Button({ children, onClick, disabled, ...props }: ButtonProps) {
  return (
    <StyledButton onClick={disabled ? undefined : onClick} disabled={disabled} {...props}>
      {children}
    </StyledButton>
  )
}
