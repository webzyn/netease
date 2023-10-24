export type PlaylistTag = {
  // category: number
  // createTime: number
  // highQuality: number
  // highQualityPos: number
  // id: number
  // name: string
  // officialPos: number
  // position: number
  // type: number
  // usedCount: number
  activity: boolean
  category: number
  hot: bpplean
  imgId: number
  imgUrl: string
  name: string
  resourceCount: number
  resourceType: number
  type: number
}

export type HotPlaylistTag = {
  activity?: boolean
  category: number
  createTime?: number
  hot: boolean
  id: number
  name: string
  playlistTag?: HotPlaylistTag
  position?: number
  type: number
  usedCount?: number
}

export type Categories = {
  0: string
  1: string
  2: string
  3: string
  4: string
}
