import { colors } from '@shared/style'

/**
 * 인원수(value) 기준으로 색상 구분
 * @param value 인원수
 * @param minValue 전체 데이터의 최소값
 * @param maxValue 전체 데이터의 최대값
 * @returns 색상 코드
 */
export function getBarColor(value: number, minValue: number, maxValue: number): string {
  if (maxValue === minValue) {
    return colors.chartMid
  }

  const range = maxValue - minValue
  const third = range / 3

  if (value >= minValue + third * 2) {
    return colors.chartHigh
  } else if (value >= minValue + third) {
    return colors.chartMid
  } else {
    return colors.chartLow
  }
}
