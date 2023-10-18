export default interface PlayList {
  adType: number
  coverImgUrl: string // 封面
  createTime: number
  id: number
  userId: number
  name: string
  trackCount: number //歌曲数
  creator: User // 创建者
  trackIds: TrackId[]
  tracks: Track[] // 歌曲列表
  subscribed: boolean // 是否收藏
  subscribedCount: number // 收藏人数
  subscribers: User[] // 收藏者
  playCount: number // 播放数
  shareCount: number //分享数
  description: string // 简介
  tags: string[] // 标签
  commentCount: number // 评论数
  commentThreadId: string // 评论id
  trialMode: number // 10 我喜欢的音乐 11 创建的歌单 12 收藏的歌单
  [key: string]: any
}
