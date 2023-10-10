import { SongSheet, Privileges } from './common'
import { Song, SongUrl } from 'types'

export interface PersonalizedRes {
  category?: number
  code: number
  hasTaste?: Boolean
  result?: SongSheet[]
  [key]: any
}

interface Privileges {
  id: string
  [key]: any
}
export interface TrackAllRes {
  code: number
  privileges: Privileges[]
  songs: Song[]
}

export interface SongUrlRes {
  code: number
  data: SongUrl[]
}
