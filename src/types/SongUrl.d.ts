// todo 歌单中的歌曲对象 -> 包含歌曲url
export default interface SongUrl {
  id: number
  url: string
  type: string
  encodeType: string
  level: string
  size: number
  time: number
  flag: number
  md5: number
  [key: string]: any
}
