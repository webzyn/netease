// ! 需要登录的api
import { get, post } from 'request'
import { ResourceRes } from './types/api'
import store from 'store'
const { user } = store.getState()

// todo 获取歌单
export const resource = (): Promise<ResourceRes> => {
  return get('/recommend/resource') as Promise<ResourceRes>
}

// todo 收藏/取消收藏歌单
// t : 类型,1:收藏,2:取消收藏 id : 歌单 id
export const subscribe = (t: number | string, id: number | string): Promise<{ code: number }> => {
  return post('/playlist/subscribe', { t, id }) as Promise<{ code: number }>
}

// todo 给评论点赞
// 必选参数 : id : 资源 id, 如歌曲 id,mv id
// cid : 评论 id
// t : 是否点赞 , 1 为点赞 ,0 为取消点赞
// type: 数字 , 资源类型
// 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台节目 5: 视频 6: 动态 7: 电台
export const commentLike = (
  id: number | string,
  cid: number | string,
  t: 0 | 1,
  type: number
): Promise<{ code: number }> => {
  return post('/comment/like', { id, cid, t, type }) as Promise<{ code: number }>
}

// todo 发送评论
// 必选参数
// t:1 发送, 2 回复
// type: 数字,资源类型 0 - 6
// id:对应资源 id
// content :要发送的内容
// commentId :回复的评论 id (回复评论时必填)
export const comment = (
  id: number | string,
  content: string,
  t: 1 | 2,
  type: number,
  commentId?: number | string
): Promise<{ code: number; comment: Comment }> => {
  return post('/comment', { id, content, t, type, commentId }) as Promise<{ code: number; comment: Comment }>
}

// todo 删除评论
// 必选参数
// t:0 删除
// type: 数字,资源类型 0 - 6
// id:对应资源 id
// commentId :评论 id
export const deleteComment = (
  id: number | string,
  type: number,
  commentId: number | string
): Promise<{ code: number }> => {
  const t = 0
  return post('/comment', { id, t, type, commentId }) as Promise<{ code: number }>
}

export const likelist = () => {
  return get('/likelist', { uid: user.id })
}

export default {}

// ! 收藏/取消收藏专辑
// t : 类型,1:收藏,2:取消收藏 id : 歌单 id
export const albumSub = (id: number | string, t: number | string): Promise<{ code: number }> => {
  return post('/album/sub', { t, id }) as Promise<{ code: number }>
}

// todo 收藏/取消收藏歌手
// t : 类型,1:收藏,2:取消收藏 id : 歌单 id
export const artistSub = (id: number | string, t: number | string): Promise<{ code: number }> => {
  return post('/artist/sub', { t, id }) as Promise<{ code: number }>
}
