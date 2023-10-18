import { SongSheetList } from 'types/api'
import { Song } from 'types'

export interface User {
  id: number
  nickname: string
  isLogin: true | false
  avatarUrl: string
}

export interface PlayList {
  currentIndex: number
  id: number | string
  songs: Song[]
  mode: string
  history: number[]
  volumn: number
  mute: boolean
  duration: number
}

export type Store = {
  cookie: string
  token: string
  user: User
  songSheetList: SongSheetList
  playList: PlayList
}
