interface Creator {
  accountStatus: number
  authStatus: number
  authority: number
  avatarImgId: number
  avatarImgIdStr: string
  avatarUrl: string
  backgroundImgId: number
  backgroundImgIdStr: string
  backgroundUrl: string
  birthday: number
  city: number
  defaultAvatar: boolean
  description: string
  detailDescription: string
  djStatus: number
  expertTags: null
  followed: boolean
  gender: number
  mutual: boolean
  nickname: string
  province: number
  remarkName: null
  signature: string
  userId: number
  userType: number
  vipType: number
}
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
}
export interface ResourceRes {
  code: number
  featureFirst?: Boolean
  haveRcmdSongs?: Boolean
  recommend?: SongSheet[]
}
export interface PersonalizedRes {
  category?: number
  code: number
  hasTaste?: Boolean
  result?: SongSheet[]
}

export type ResourcePersonalizedRes = ResourceRes & PersonalizedRes
