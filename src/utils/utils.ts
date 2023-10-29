export function converTime(seconds: number): string {
  const time = Math.ceil(seconds)
  const s = String(Math.floor(time % 60)).padStart(2, '0')
  const m = String(Math.floor(time / 60)).padStart(2, '0')
  return `${m}:${s}`
}

export const converUnits = (count: number) => {
  if (count > 100000000) {
    return (count / 100000000).toFixed(0) + '亿'
  } else if (count > 100000) {
    return (count / 10000).toFixed(0) + '万'
  } else {
    return count
  }
}
