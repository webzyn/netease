import { useState } from 'react'
import { ReactNode } from 'react'

import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { setSongs, setCurrentIndex, setMode, resetPlayList, addSongs } from 'store/festures/playList'
import useHowler from 'utils/hooks/useHowler'

import PlayerContext from 'context/PlayerContext'

import { Track } from 'types'
import { Store } from 'store/types'

export default function Player(props: { children: ReactNode }) {
  const dispatch = useDispatch()
  const [
    _id,
    _playing,
    _play,
    _next,
    _prev,
    _assign,
    _mute,
    _setMute,
    _volume,
    _setVolume,
    _seek,
    _getSeek,
    _setSeek,
    _duration,
    _manualPlay
  ] = useHowler()
  const playList = useSelector((store: Store) => store.playList)
  const [playing, setPlaying] = useState<boolean>(_playing)

  // 播放、暂停
  const play = () => {
    setPlaying(!playing)
    _play()
  }

  // 下一首
  const next = () => {
    setPlaying(true)
    _next()
  }

  // 上一首
  const prev = () => {
    setPlaying(true)
    _prev()
  }

  // 改变播放模式
  const changeMode = () => {
    dispatch(setMode())
  }

  // 切换歌单
  const changeSongSheet = (id: string | number, songs: Track[]) => {
    dispatch(
      setSongs({
        id,
        songs
      })
    )
    setPlaying(true)
    playList.currentIndex === 0 ? _manualPlay() : dispatch(setCurrentIndex(0))
  }

  const playSongSheet = (id: string | number, songs: Track[], index: number) => {
    if (playList.songs[playList.currentIndex].id === songs[index].id) {
      _manualPlay()
    } else {
      dispatch(
        setSongs({
          id,
          songs
        })
      )
      dispatch(setCurrentIndex(index))
    }
    setPlaying(true)
  }

  // 清空播放列表
  const cleanSongList = () => {
    dispatch(resetPlayList())
  }

  // 歌单中添加歌曲
  const addPlayList = (id: string | number, songs: Track[]) => {
    dispatch(
      addSongs({
        id,
        songs
      })
    )
  }

  const context = {
    id: _id,
    assign: _assign,
    mute: _mute,
    setMute: _setMute,
    seek: _seek,
    getSeek: _getSeek,
    setSeek: _setSeek,
    volume: _volume,
    setVolume: _setVolume,
    duration: _duration,
    manualPlay: _manualPlay,
    playing,
    play,
    next,
    prev,
    changeMode,
    changeSongSheet,
    cleanSongList,
    addPlayList,
    playSongSheet
  }

  return (
    <>
      <PlayerContext.Provider value={context}>{props.children}</PlayerContext.Provider>
    </>
  )
}
