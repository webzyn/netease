export default interface Comment {
  beRepliedUser?: any
  beReplied?: BeReplied[]
  commentId: number
  commentLocationType: number
  content: string
  contentResource?: any
  decoration?: {}
  expressionUrl: any
  grade?: any
  ipLocation?: IpLocation
  liked?: boolean
  likedCount?: number
  needDisplayTime: boolean
  owner: boolean
  parentCommentId?: number
  pendantData?: any
  repliedMark?: any
  richContent: string
  showFloorComment?: any
  status?: number
  time: number
  timeStr?: string
  user: User
  userBizLevels?: any
}

type PendantData = {
  id: number
  imageUrl: string
}

type BeReplied = {
  user: User
  beRepliedCommentId: number
  content: string
  richContent: any
  status: number
  expressionUrl: any
  ipLocation: IpLocation
}

type IpLocation = {
  ip: any
  location: string
  userId: number
}

type User = {
  locationInfo: any
  liveInfo: any
  anonym: number
  commonIdentity?: any
  avatarDetail: AvatarDetail
  userType: number
  avatarUrl: string
  followed?: boolean
  mutual?: boolean
  remarkName: any
  socialUserId: any
  vipRights: VipRights
  nickname: string
  authStatus: number
  expertTags: any
  experts: any
  vipType: number
  userId: number
  target: any
}
type AvatarDetail = {
  identityIconUrl: string
  identityLevel: number
  userType: number
}

type VipRights = {
  associator: MusicPackage
  musicPackage: MusicPackage
  redplus: MusicPackage
  redVipAnnualCount: number
  redVipLevel: number
}

type MusicPackage = {
  iconUrl: string
  rights: number
  vipCode: number
}
