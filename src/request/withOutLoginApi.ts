// ! 不需要登录的api
import { get, post } from 'request'

import {
  PersonalizedRes,
  TrackAllRes,
  SongUrlRes,
  SongSheetDetailRes,
  SongDetailRes,
  SubscribersRes,
  CommentRes,
  CommentHotRes,
  PlayListCatlistRes,
  PlayListHotRes,
  TopPlaylistRes,
  TopPlayListHighqualityRes,
  HighqualityTagsRes,
  TopListRes,
  TopSongRes,
  NewAlbumRes,
  AlbumRes,
  AlbumDetailDynamicRes,
  ArtistListRes,
  ArtistDetailRes,
  ArtistAlbumRes,
  ArtistTopSongRes,
  ArtistMvRes,
  ArtistDescRes,
  SimiArtistRes
} from './types/singleApi'

// todo 获取歌单
export const personalized = (): Promise<PersonalizedRes> => {
  return get('personalized') as Promise<PersonalizedRes>
}

// todo 推荐新音乐
export const getNewSong = () => {
  return get('/personalized/newsong', { limit: 12 })
}

// todo 获取歌单所有歌曲
export const trackAll = (id: number): Promise<TrackAllRes> => {
  return get('/playlist/track/all', { id }) as Promise<TrackAllRes>
}

// todo 获取音乐 url
export const getSongUrl = (ids: string): Promise<SongUrlRes> => {
  return get('/song/url', { id: ids }) as Promise<SongUrlRes>
}

// todo 获取音乐 url - 新版
// level: 播放音质等级,
// 分为 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损,
// 'hires=>Hi-Res, jyeffect => 高清环绕声, sky => 沉浸环绕声, jymaster => 超清母带
export const getSongUrlv1 = (id: number | string, level: string): Promise<SongUrlRes> => {
  return get('/song/url/v1', { id, level }) as Promise<SongUrlRes>
}

// todo 获取歌单详情
// 必选参数 : id : 歌单 id
// 可选参数 : s : 歌单最近的 s 个收藏者,默认为 8
export const getSongSheetDetail = (id: number | string, s?: number): Promise<SongSheetDetailRes> => {
  return get('/playlist/detail', { id, s }) as Promise<SongSheetDetailRes>
}

// todo 歌单收藏者
// 必选参数 : id : 歌单 id
// 可选参数 : limit: 取出评论数量 , 默认为 20
//          offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
export const getSubscribers = (id: number | string, limit?: number, offset?: number): Promise<SubscribersRes> => {
  return get('/playlist/subscribers', { id, limit, offset }) as Promise<SubscribersRes>
}

// todo 获取歌单评论
// 必选参数 : id: 歌单 id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的
// time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
export const getCommentOfPlaylist = (id: number | string, limit?: number, offset?: number): Promise<CommentRes> => {
  return get('/comment/playlist', { id, limit, offset }) as Promise<CommentRes>
}

// todo 获取专辑评论
// 必选参数 : id: 专辑 id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的
// time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
export const getCommentOfAlbum = (id: number | string, limit?: number, offset?: number): Promise<CommentRes> => {
  return get('/comment/album', { id, limit, offset }) as Promise<CommentRes>
}

// todo 获取歌单评论-新版
// 必选参数 : id : 资源 id
// type: 数字 , 资源类型 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台节目 5: 视频 6: 动态 7: 电台
// 可选
// pageNo:分页参数,第 N 页,默认为 1
// pageSize:分页参数,每页多少条数据,默认 20
// sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
// cursor: 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
export const getComment = (id: number | string, type: number, pageNo = 1, pageSize = 60): Promise<any> => {
  return get('/comment/new', { id, type, pageNo, pageSize }) as Promise<any>
}

// todo 获取热门评论
// 必选参数 : id : 资源 id
// type: 数字 , 资源类型 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台节目 5: 视频 6: 动态 7: 电台
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的
// time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
export const getCommentHot = (
  id: number | string,
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
  limit?: number,
  offset?: number
): Promise<CommentHotRes> => {
  return get('/comment/hot', { id, type, limit, offset }) as Promise<CommentHotRes>
}

// todo 获取歌曲详情
// 必选参数 : ids : 歌曲 id
export const getSongDetail = (ids: number | string): Promise<SongDetailRes> => {
  return get('/song/detail', { ids }) as Promise<SongDetailRes>
}

// ! 歌单分类
export const getPlayListCatlist = (): Promise<PlayListCatlistRes> => {
  return get('/playlist/catlist') as Promise<PlayListCatlistRes>
}

// ! 热门歌单分类
export const getPlayListHot = (): Promise<PlayListHotRes> => {
  return get('/playlist/hot') as Promise<PlayListHotRes>
}

// ! 歌单列表
export const getTopPlaylist = (
  cat: string,
  pageSize: number,
  page: number,
  order?: 'hot' | 'new'
): Promise<TopPlaylistRes> => {
  return get('/top/playlist', {
    cat,
    limit: pageSize,
    offset: (page - 1) * pageSize,
    order
  }) as Promise<TopPlaylistRes>
}

// ! 精品歌单标签列表
export const getHighqualityTags = (): Promise<HighqualityTagsRes> => {
  return get('/playlist/highquality/tags') as Promise<HighqualityTagsRes>
}

// ! 获取精品歌单
// 可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部"
// limit: 取出歌单数量 , 默认为 50
// before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
export const getTopPlayListHighquality = (
  cat?: string,
  limit?: number,
  before?: number
): Promise<TopPlayListHighqualityRes> => {
  return get('/top/playlist/highquality', { cat, limit, before }) as Promise<TopPlayListHighqualityRes>
}

// todo 所有榜单
export const getTopList = (): Promise<TopListRes> => {
  return get('/toplist') as Promise<TopListRes>
}

// ! 新歌速递
// type: 地区类型 id  全部:0  华语:7  欧美:96 日本:8  韩国:16
export const getTopSong = (type = 0): Promise<TopSongRes> => {
  return get('/top/song', { type }) as Promise<TopSongRes>
}

// ! 全部新碟
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
export const getnewAlbum = (area = 'ALL', page = 1, limit = 16): Promise<NewAlbumRes> => {
  return get('/album/new', {
    area,
    offset: (page - 1) * limit,
    limit
  }) as Promise<NewAlbumRes>
}

// todo 专辑中的歌曲
export const getAlbum = (id: number | string): Promise<AlbumRes> => {
  return get('/album', { id }) as Promise<AlbumRes>
}

//  todo 专辑动态信息
export const getAlbumDetailDynamic = (id: number | string): Promise<AlbumDetailDynamicRes> => {
  return get('/album/detail/dynamic', { id }) as Promise<AlbumDetailDynamicRes>
}

// ! 歌手分类
// type: 分类
// area: 语种
// initial: 筛选
// page = 1
// limit = 30
export const getArtistList = (
  area?: number | string,
  type?: number | string,
  initial?: number | string,
  page = 1,
  limit = 30
): Promise<ArtistListRes> => {
  return get('/artist/list', { area, type, initial, limit, offset: (page - 1) * limit }) as Promise<ArtistListRes>
}

// ! 获取歌手详情
export const getArtistDetail = (id: number | string): Promise<ArtistDetailRes> => {
  return get('/artist/detail', { id }) as Promise<ArtistDetailRes>
}

// ! 获取歌手专辑
// id: 歌手 id
// limit: 取出数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*20, 其中 20 为 limit 的值
export const getArtistAlbum = (id: number | string, page = 1, pageSize = 20): Promise<ArtistAlbumRes> => {
  return get('/artist/album', { id, limit: pageSize, offset: (page - 1) * pageSize }) as Promise<ArtistAlbumRes>
}

// ! 获取歌手热门50首歌曲
// id: 歌手 id
export const getArtistTopSong = (id: number | string): Promise<ArtistTopSongRes> => {
  return get('/artist/top/song', { id }) as Promise<ArtistTopSongRes>
}

// ! 获取歌手MV
export const getArtistMv = (id: number | string, page = 1, pageSize = 12): Promise<ArtistMvRes> => {
  return get('/artist/mv', { id, limit: pageSize, offset: (page - 1) * pageSize }) as Promise<ArtistMvRes>
}

// ! 获取MV播放地址
export const getMvUrl = (mvid: number | string): Promise<any> => {
  return get('/mv', { mvid }) as Promise<any>
}

// ! 获取歌手描述
export const getArtistDesc = (id: number | string): Promise<ArtistDescRes> => {
  return get('/artist/desc', { id }) as Promise<ArtistDescRes>
}

// ! 获取相似歌手
export const getSimiArtist = (id: number | string): Promise<SimiArtistRes> => {
  return get('/simi/artist', { id }) as Promise<SimiArtistRes>
}

// todo 获取用户详情
export const getUserDetail = (id: number | string): Promise<any> => {
  return get('/user/detail', { id }) as Promise<any>
}
