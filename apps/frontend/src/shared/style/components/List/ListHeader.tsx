import styled from 'styled-components'
import { Text } from '@shared/style/components/Text/Text'
import { Flex } from '@shared/style/components/Flex/Flex'
import { colors } from '@shared/style/token/colors'

type ListHeaderProps = {
  title: string
  description?: string
}

const StyledListHeader = styled.div`
  padding: 24px 20px 10px;
`

export function ListHeader({ title, description }: ListHeaderProps) {
  return (
    <StyledListHeader>
      <Flex direction="column" gap={8}>
        <Text fontSize={18} fontWeight="bold" color={colors.grey900}>
          {title}
        </Text>
        {description && (
          <Text fontSize={14} color={colors.grey600}>
            {description}
          </Text>
        )}
      </Flex>
    </StyledListHeader>
  )
}
