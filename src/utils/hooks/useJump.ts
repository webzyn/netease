import { useNavigate } from 'react-router-dom'

import { Base64 } from 'js-base64'

export default function useJump() {
  const navigate = useNavigate()

  // 跳转到精彩评论
  const goExcitingComments = (id: number | string, type: number) => {
    navigate(`/excitingComments/${id}/${type}`)
  }

  // 跳转到精品歌单
  const goHighquality = (cat: string) => {
    navigate(`/highquality/${Base64.encodeURI(cat)}`)
  }

  // 跳转到歌单详情
  const goSongSheetDetail = (id: number) => {
    navigate(`/songSheetDetail/${id}`)
  }

  // 跳转到专辑详情
  const goAlbumDetail = (id: number) => {
    navigate(`/albumDetail/${id}`)
  }

  return { goExcitingComments, goHighquality, goSongSheetDetail, goAlbumDetail }
}
