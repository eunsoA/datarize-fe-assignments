/**
 * 가격 범위를 UI에 표시할 수 있는 형식으로 포맷팅
 * @param range 가격 범위 문자열 (예: "0 - 20000", "20001 - 30000")
 * @returns 포맷팅된 가격 범위 문자열 (예: "2만원 이하", "2-3만원")
 */
export function formatPriceRange(range: string): string {
  const [minStr, maxStr] = range.split(' - ').map((part) => part.trim())
  const min = parseInt(minStr, 10)
  const max = maxStr ? parseInt(maxStr, 10) : null

  const minInManwon = min === 0 ? 0 : Math.floor(min / 10000)
  const maxInManwon = max ? Math.floor(max / 10000) : null

  const formatCases = [
    {
      condition: min === 0 && maxInManwon !== null,
      format: () => `${maxInManwon}만원 이하`,
    },
    {
      condition: maxInManwon === null,
      format: () => `${minInManwon}만원 이상`,
    },
    {
      condition: minInManwon === maxInManwon,
      format: () => `${maxInManwon}만원`,
    },
    {
      condition: true,
      format: () => `${minInManwon}-${maxInManwon}만원`,
    },
  ] as const

  const matchedCase = formatCases.find(({ condition }) => condition)
  return matchedCase?.format() ?? ''
}
