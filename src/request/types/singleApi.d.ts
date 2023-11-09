import internal from 'stream'
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
  PlaylistTag,
  NewSong,
  Album,
  Artist,
  ArtistDetail,
  Mv
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
export interface CommentRes {
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

// ! 新歌速递
export interface TopSongRes {
  code: number
  data: NewSong[]
}

// ! 全部新碟
export interface NewAlbumRes {
  code: number
  total: number
  albums: Album[]
}

// ! 专辑中的歌曲
export interface AlbumRes {
  code: number
  album: Album
  resourceState: boolean
  songs: Track[]
}

// ! 专辑动态信息
export interface AlbumDetailDynamicRes {
  albumGameInfo: any
  code: number
  commentCount: number
  isSub: boolean
  likedCount: number
  onSale: boolean
  shareCount: number
  subCount: number
  subTime: number
}

// todo 歌手分类
export interface ArtistListRes {
  code: number
  more: boolean
  artists: Artist[]
}

// todo 歌手详情
export interface ArtistDetailRes {
  code: number
  data: ArtistDetail
  message: string
}

// todo 歌手专辑
export interface ArtistAlbumRes {
  artist: Artist
  code: number
  hotAlbums: Album[]
  more: boolean
}

// todo 歌手热门50首
export interface ArtistTopSongRes {
  code: number
  more: boolean
  songs: Track[]
}

// todo 歌手mv
export interface ArtistMvRes {
  code: number
  hasMore: boolean
  mvs: Mv[]
  time: number
}

// todo 歌手描述
export interface ArtistDescRes {
  briefDesc: string
  code: number
  count: number
  introduction: {
    ti: string
    txt: string
  }[]
  topicData: any[]
}

// todo 相似歌手
export interface SimiArtistRes {
  code: number
  artists: Artist[]
}
