import { useNavigate } from 'react-router-dom'

import { Base64 } from 'js-base64'

import { Artist } from 'types'

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
    navigate(`/songSheetDetail/${id}/2`)
  }

  // 跳转到专辑详情
  const goAlbumDetail = (id: number) => {
    navigate(`/albumDetail/${id}/3`)
  }

  // 跳转到歌手详情
  const goSingerDetail = (id: number | string, stateObj?: Artist) => {
    navigate(`/singerDetail/${id}`, {
      state: stateObj
    })
  }

  // 跳转到用户详情
  const goUserDetail = (id: number | string) => {
    navigate(`/userDetail/${id}`)
  }

  // 跳转到mv详情
  const goMVDetail = (id: number | string) => {
    navigate(`/mvDetail/${id}`)
  }

  return {
    goExcitingComments,
    goHighquality,
    goSongSheetDetail,
    goAlbumDetail,
    goSingerDetail,
    goUserDetail,
    goMVDetail
  }
}
