// ! 不需要登录的api
import { get, post } from 'request'

import {
  PersonalizedRes,
  TrackAllRes,
  SongUrlRes,
  SongSheetDetailRes,
  SongDetailRes,
  SubscribersRes,
  CommentOfPlaylistRes,
  CommentHotRes
} from './types/singleApi'

// todo 获取歌单
export const personalized = (): Promise<PersonalizedRes> => {
  return get('personalized') as Promise<PersonalizedRes>
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
export const getCommentOfPlaylist = (
  id: number | string,
  limit?: number,
  offset?: number
): Promise<CommentOfPlaylistRes> => {
  return get('/comment/playlist', { id, limit, offset }) as Promise<CommentOfPlaylistRes>
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

// todo 获取歌手详情
// export const getArtistDetail = (id: number | string): Promise<SongSheetDetailRes> => {
//   return get('/artist/detail', { id }) as Promise<SongSheetDetailRes>
// }
export default {}
