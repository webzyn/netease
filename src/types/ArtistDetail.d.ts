import { User, Artist } from 'types'

type RightsInfoDetailDtoList = {
  vipCode: number
  expireTime: number
  iconUrl: string
  dynamicIconUrl: string
  vipLevel: number
  signIap: boolean
  signDeduct: boolean
  signIapDeduct: boolean
  sign: boolean
}

type VipRights = {
  rightsInfoDetailDtoList: RightsInfoDetailDtoList[]
  oldProtocol: boolean
  redVipAnnualCount: number
  redVipLevel: number
  now: number
}

type Identify = {
  imageUrl: string
  imageDesc: string
  actionUrl: string
}

type Rank$4 = {
  rank: number
  type: number
}

type SecondaryExpertIdentiy = {
  expertIdentiyId: number
  expertIdentiyName: string
  expertIdentiyCount: number
}

export default interface ArtistDetail {
  videoCount: number
  vipRights: VipRights
  identify: Identify
  artist: Artist
  blacklist: boolean
  preferShow: number
  showPriMsg?: boolean
  secondaryExpertIdentiy: SecondaryExpertIdentiy[]
  eventCount?: number
  user?: User
}
