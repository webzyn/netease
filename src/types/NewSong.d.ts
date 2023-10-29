type Music = {
  bitrate: number
  volumeDelta: number
  playTime: number
  dfsId: number
  sr: number
  name: any
  id: number
  size: number
  extension: string
}

type Artist = {
  img1v1Id: number
  topicPerson: number
  albumSize: number
  img1v1Url: string
  picUrl: string
  picId: number
  trans: string
  followed: boolean
  musicSize: number
  briefDesc: string
  alias: any[]
  name: string
  id: number
  img1v1Id_str: string
}

type Album = {
  songs: any[]
  paid: boolean
  onSale: boolean
  tags: string
  status: number
  publishTime: number
  picUrl: string
  commentThreadId: string
  picId: number
  artist: Artist
  blurPicUrl: string
  companyId: number
  pic: number
  briefDesc: string
  company: string
  subType: string
  description: string
  alias: any[]
  artists: Artist[]
  copyrightId: number
  name: string
  id: number
  type: string
  size: number
  picId_str: string
}

type Privilege = {
  id: number
  fee: number
  payed: number
  st: number
  pl: number
  dl: number
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number
  fl: number
  toast: boolean
  flag: number
  preSell: boolean
}

export default interface NewSong {
  starred: boolean
  popularity: number
  starredNum: number
  playedNum: number
  dayPlays: number
  hearTime: number
  mp3Url: string
  rtUrls: any
  status: number
  audition: any
  ringtone: string
  disc: string
  no: number
  crbt: any
  bMusic: Music
  rtUrl: any
  mvid: number
  ftype: number
  rtype: number
  rurl: any
  fee: number
  commentThreadId: string
  album: Album
  hMusic: Music
  copyFrom: string
  mMusic: Music
  lMusic: Music
  position: number
  duration: number
  alias: Array<string>
  artists: Array<Artist>
  score: number
  copyrightId: number
  name: string
  id: number
  exclusive: boolean
  privilege: Privilege
}
