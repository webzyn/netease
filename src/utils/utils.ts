export function converTime(seconds: number): string {
  const time = Math.ceil(seconds)
  const s = String(Math.floor(time % 60)).padStart(2, '0')
  const m = String(Math.floor(time / 60)).padStart(2, '0')
  return `${m}:${s}`
}
