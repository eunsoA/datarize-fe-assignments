/**
 * 날짜를 "yyyy년 mm월 dd일" 형식으로 포맷팅
 * @param dateString 날짜 문자열
 * @returns 포맷팅된 날짜 문자열 (예: "2024년 7월 15일")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}년 ${month}월 ${day}일`
}
