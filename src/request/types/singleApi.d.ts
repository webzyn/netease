import { SongSheet } from './common'
import {
  Track,
  SongUrl,
  User,
  TrackId,
  PlayList,
  Privilege,
  Comment,
  HotPlaylistTag,
  Categories,
  PlaylistTag
} from 'types'

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

// ! 歌单分类
export interface PlayListCatlistRes {
  code: number
  all: PlaylistTag
  categories: Categories
  sub: PlaylistTag[]
}

// ! 热门歌单分类
export interface PlayListHotRes {
  code: number
  tags: HotPlaylistTag[]
}

// ! 歌单列表
export interface TopPlaylistRes {
  cat: string
  code: number
  more: boolean
  total: number
  playlists: PlayList[]
}

// ! 精品歌单
export interface TopPlayListHighqualityRes {
  code: number
  lasttime: number
  more: boolean
  total: number
  playlists: PlayList[]
}

//  ! 精品歌单分类tag
export interface HighqualityTagsRes {
  code: number
  tags: HotPlaylistTag[]
}

// todo 排行榜
export interface TopListRes {
  code: number
  list: PlayList[]
  artistToplist: {
    coverUrl: string
    name: string
    position: number
    upateFrequency: string
    updateFrequency: string
  }
}
