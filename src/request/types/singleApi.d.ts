import { SongSheet } from './common'
import { Track, SongUrl, User, TrackId, PlayList, Privilege, Comment } from 'types'

export interface PersonalizedRes {
  category?: number
  code: number
  hasTaste?: Boolean
  result?: SongSheet[]
  [key: string]: any
}

export interface TrackAllRes {
  code: number
  privileges: Privileges[]
  songs: Track[]
}

export interface SongUrlRes {
  code: number
  data: SongUrl[]
}

export interface SongSheetDetailRes {
  code: number
  playlist: PlayList
  privileges: Privilege[]
  [key: string]: any
}

export interface SongDetailRes {
  code: number
  songs: Track[]
  privileges: Privilege[]
}

export interface SubscribersRes {
  code: number
  more: boolean
  subscribers: User[]
  total: number
}

// 歌单评论
export interface CommentOfPlaylistRes {
  cnum: number
  code: number
  commentBanner: any
  comments: Comment[]
  topComments: Comment[]
  isMusician: boolean
  more: boolean
  moreHot: boolean
  hotComments: Comment[]
  total: number
  userId: number
}

// 热门评论
export interface CommentHotRes {
  code: number
  hasMore: boolean
  hotComments: Comment[]
  topComments: Comment[]
  total: number
}
