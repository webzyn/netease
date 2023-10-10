interface account {
  anonimousUser: Boolean
  ban: number
  baoyueVersion: number
  createTime: number
  donateVersion: number
  id: number
  salt?: string
  status: number
  tokenVersion: number
  type: number
  uninitialized?: Boolean
  userName: string
  vipType: number
  viptypeVersion?: number
  whitelistAuthority: number
  paidFee?: Boolean
}
interface bindings {
  bindingTime: number
  expired: Boolean
  expiresIn: number
  id: number
  refreshTime: number
  tokenJsonStr: string
  type: number
  url: string
  userId: number
}
interface profile {
  accountStatus: number
  accountStatus: number
  authStatus: number
  authority: number
  avatarDetail: null
  avatarImgId: number
  avatarImgIdStr: string
  avatarImgId_str: string
  avatarUrl: string
  backgroundImgId: number
  backgroundImgIdStr: string
  backgroundUrl: string
  birthday: number
  city: number
  defaultAvatar: false
  description: string
  detailDescription: string
  djStatus: number
  eventCount: number
  expertTags: null
  experts: {}
  followed: false
  followeds: number
  follows: number
  gender: number
  mutual: false
  nickname: string
  playlistBeSubscribedCount: number
  playlistCount: number
  province: number
  remarkName: null
  signature: string
  userId: number
  userType: number
  vipType: number
}
export interface CellPhone {
  account: account
  bindings: bindings[]
  code: number
  cookie: string
  loginType: number
  profile: profile
  token: string
}
export interface Countries {
  code: number
  data: {
    countryList: CountryList[]
    label: string
  }[]
  message: string
}
export interface CountryList {
  code: string
  en: string
  lacale: string
  zh: string
  label?: string
}
