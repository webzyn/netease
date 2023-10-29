import Track from './Track'
import User from './User'
import TrackId from './TrackId'
import SongUrl from './SongUrl'
import Privilege from './Privilege'
import PlayList from './Playlist'
import Comment from './Comment'
import { PlaylistTag, HotPlaylistTag, Categories } from './playlistTag'
import NewSong from './NewSong'
import Albums from './Albums'

export type PlayList = PlayList

// todo歌单中的歌曲对象 -> 不包含url
export type Track = Track

export type Privilege = Privilege

// todo 歌曲id
export type TrackId = TrackId

// todo歌单中的歌曲对象 -> 包含歌曲url
export type SongUrl = SongUrl

// todo 用户信息
export type User = User

// todo 歌单评论
export type Comment = Comment

// ! 歌单分类tag
export type PlaylistTag = PlaylistTag
export type HotPlaylistTag = HotPlaylistTag
export type Categories = Categories

// ! 新歌速递
export type NewSong = NewSong

// ! 新碟
export type Albums = Albums
