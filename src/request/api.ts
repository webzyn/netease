// 需要登录的api
import { get, post } from 'request'

import { ResourceRes } from './types/api'

// 获取歌单
export const resource = (): Promise<ResourceRes> => {
  return get('/recommend/resource') as Promise<ResourceRes>
}

export default {}
