// 歌单中的歌曲对象
export interface Song {
  id: number
  name: string
  mv: number
  publishTime: number
  dt: number
  al: {
    id: number
    name: string
    pic: number
    picUrl: string
    pic_str: string
    tns: any[]
  }
  alia: string[]
  ar: {
    id: number
    name: string
    tns: any[]
    alias: any[]
  }[]
  [key]: any
}
// 歌单中的歌曲对象 -> 包含歌曲url
export interface SongUrl {
  id: number
  url: string
  type: string
  encodeType: string
  level: string
  size: number
  time: number
  flag: number
  md5: number
  [key]: any
}
