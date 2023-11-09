export default interface Artist {
  albumSize: number
  alias: string[]
  briefDesc: string
  id: number
  name: string
  musicSize: number

  fansCount?: number
  followed?: boolean
  img1v1Id?: number
  img1v1Id_str?: string
  img1v1Url?: string
  picId?: number
  picId_str?: string
  picUrl?: string
  topicPerson?: number
  trans?: string

  avatar?: string
  cover?: string
  identifyTag?: string[]
  identities?: string[]
  mvSize?: number
  rank?: {
    rank: number
    type: number
  }
  transNames?: any[]
}
