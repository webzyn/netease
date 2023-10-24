import React, { useContext } from 'react'

import PlayerContext from 'context/PlayerContext'

import { trackAll } from 'request/withOutLoginApi'

export default function usePlayer() {
  const { changeSongSheet } = useContext(PlayerContext)

  // ! 将歌单中歌曲存入store并播放
  const setPlaylist = (id: number) => {
    trackAll(id).then((res) => {
      if (res.code === 200) {
        changeSongSheet(id, res.songs)
      }
    })
  }

  return { setPlaylist }
}
