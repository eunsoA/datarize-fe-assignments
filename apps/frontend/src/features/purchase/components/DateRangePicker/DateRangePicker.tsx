import styled from 'styled-components'
import { colors, Text, Button, Flex } from '@shared/style'

type DateRangePickerProps = {
  startDate: string
  endDate: string
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
  onReset?: () => void
}

const StyledDateInput = styled.input`
  padding: 8px 12px;
  border: 1px solid ${colors.grey300};
  border-radius: 8px;
  font-size: 14px;
  color: ${colors.grey600};
  background-color: ${colors.grey100};

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onReset,
}: DateRangePickerProps) {
  return (
    <Flex justifyContent="flex-end" alignItems="center" gap={12} css={{ padding: '10px 20px' }}>
      <Flex alignItems="center" gap={8}>
        <StyledDateInput
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          max={endDate}
        />
        <Text fontSize={14} color={colors.grey600}>
          ~
        </Text>
        <StyledDateInput
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          min={startDate}
        />
      </Flex>
      {onReset && <Button onClick={onReset}>초기화</Button>}
    </Flex>
  )
}
