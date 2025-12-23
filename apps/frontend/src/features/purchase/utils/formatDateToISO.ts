/**
 * 날짜를 ISO 8601 형식으로 변환 (YYYY-MM-DD -> YYYY-MM-DDTHH:mm:ssZ)
 * @param dateString 날짜 문자열
 * @returns ISO 8601 형식의 날짜 문자열
 */
export function formatDateToISO(dateString: string): string {
  return `${dateString}T00:00:00Z`
}
