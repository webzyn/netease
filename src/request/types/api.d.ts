import { SongSheet } from './common'
export interface ResourceRes {
  code: number
  featureFirst?: Boolean
  haveRcmdSongs?: Boolean
  recommend?: SongSheet[]
  [key]: any
}
