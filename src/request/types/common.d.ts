export interface SongSheet {
  alg: string
  canDislike?: Boolean
  copywriter: string
  createTime?: number
  creator?: Creator
  highQuality?: Boolean
  id: number
  name: string
  picUrl: string
  playcount: number
  trackCount: number
  trackNumberUpdateTime?: number
  type: number
  userId?: number
  [key: string]: any
}
