// ! 判断需不需要登录
import store from 'store'
import { resource } from 'request/withLoginApi'
import { personalized } from 'request/withOutLoginApi'

const { user } = store.getState()
const isLogin = user.isLogin

// todo 个性推荐-推荐歌单
export const getSongSheet = () => {
  return isLogin ? resource() : personalized()
}
