import styled from 'styled-components'
import { Text } from '@shared/style/components/Text/Text'
import { Flex } from '@shared/style/components/Flex/Flex'
import { colors } from '@shared/style/token/colors'

type NavigationBarProps = {
  title: string
  description?: string
}

const StyledNavigationBar = styled.nav`
  padding: 24px 20px 20px;
  background-color: ${colors.grey100};
  border-bottom: 1px solid ${colors.grey300};
`

export function NavigationBar({ title, description }: NavigationBarProps) {
  return (
    <StyledNavigationBar>
      <Flex direction="column" gap={8}>
        <Text fontSize={20} fontWeight="bold" color={colors.grey900}>
          {title}
        </Text>
        {description && (
          <Text fontSize={14} color={colors.grey600}>
            {description}
          </Text>
        )}
      </Flex>
    </StyledNavigationBar>
  )
}
