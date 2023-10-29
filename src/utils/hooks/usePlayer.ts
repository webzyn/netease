import React, { useContext } from 'react'

import PlayerContext from 'context/PlayerContext'
import { useSelector } from 'react-redux/es/hooks/useSelector'

import { trackAll, getAlbum } from 'request/withOutLoginApi'

import { Track } from 'types'
import { Store } from 'store/types'

export default function usePlayer() {
  const { changeSongSheet, manualPlay, playSong, addSongAndPlay, addPlayList } = useContext(PlayerContext)
  const playList = useSelector((store: Store) => store.playList)

  // ! 获取歌单中的歌曲存入store并播放
  const setPlaylist = (id: number) => {
    trackAll(id).then((res) => {
      if (res.code === 200) {
        changeSongSheet(id, res.songs)
      }
    })
  }

  // ! 获取专辑中的歌曲存入store并播放
  const setAlbumList = (id: number | string) => {
    getAlbum(id).then((res) => {
      if (res.code === 200) {
        changeSongSheet(id, res.songs)
      }
    })
  }

  return { setPlaylist, playSong, addSongAndPlay, changeSongSheet, addPlayList, setAlbumList }
}
