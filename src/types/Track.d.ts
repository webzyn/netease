type Ar = {
  id: number
  name: string
  tns: Array<string>
  alias: Array<string>
}

type Al = {
  id: number
  name: string
  picUrl: string
  tns: Array<string>
  pic_str: string
  pic: number
}

// todo 歌曲对象
export default interface Track {
  id: number
  name: string
  mv: number
  publishTime: number
  dt: number
  al: Al
  alia: string[]
  ar: Ar[]
  [key: string]: any
}

type H = {
  br: number
  fid: number
  size: number
  vd: number
  sr: number
}

type Result$0 = {
  name: string
  id: number
  pst: number
  t: number
  ar: Array<Ar>
  alia: Array<string>
  pop: number
  st: number
  rt: string
  fee: number
  v: number
  crbt: any
  cf: string
  al: Al
  dt: number
  h: H
  m: H
  l: H
  sq: H
  hr: H
  a: any
  cd: string
  no: number
  rtUrl: any
  ftype: number
  rtUrls: Array<any>
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  originSongSimpleData: any
  tagPicList: any
  resourceState: boolean
  version: number
  songJumpInfo: any
  entertainmentTags: any
  awardTags: any
  single: number
  noCopyrightRcmd: any
  rtype: number
  rurl: any
  mst: number
  cp: number
  mv: number
  publishTime: number
}
