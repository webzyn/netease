import { useSelector } from 'react-redux/es/hooks/useSelector'
import { resource } from 'request/api'
import { personalized } from 'request/singleApi'

export default function useApi() {
  const user = useSelector((store: any) => store.user) // 获取store
  const isLogin = user.isLogin

  // 个性推荐-推荐歌单
  const getSongSheet = () => {
    return isLogin ? resource() : personalized()
  }

  return [getSongSheet]
}
