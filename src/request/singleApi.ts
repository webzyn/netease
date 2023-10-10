// 不需要登录的api
import { get, post } from 'request'

import { PersonalizedRes, TrackAllRes, SongUrlRes } from './types/singleApi'

// 获取歌单
export const personalized = (): Promise<PersonalizedRes> => {
  return get('personalized') as Promise<PersonalizedRes>
}

// 获取歌单所有歌曲
export const trackAll = (id: number): Promise<TrackAllRes> => {
  return get('/playlist/track/all', { id }) as Promise<TrackAllRes>
}

// 获取音乐 url
export const getSongUrl = (ids: string): Promise<SongUrlRes> => {
  return get('/song/url', { id: ids }) as Promise<SongUrlRes>
}

// 获取音乐 url - 新版
// level: 播放音质等级,
// 分为 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损,
// 'hires=>Hi-Res, jyeffect => 高清环绕声, sky => 沉浸环绕声, jymaster => 超清母带
export const getSongUrlv1 = (id: number | string, level: string): Promise<SongUrlRes> => {
  return get('/song/url/v1', { id, level }) as Promise<SongUrlRes>
}
export default {}
