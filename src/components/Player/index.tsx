import { useState, useEffect } from 'react'
import { ReactNode } from 'react'

import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { setSongs, setCurrentIndex, setMode, resetPlayList, addSongs } from 'store/festures/playList'
import useHowler from 'utils/hooks/useHowler'

import PlayerContext from 'context/PlayerContext'

import { getSongDetail } from 'request/withOutLoginApi'

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

  // todo 播放指定歌曲
  /*
    id: 歌单id
    songs: 歌单所有音乐
    index: 当前播放歌曲在歌单中的索引
  */
  const playSong = (id: string | number, songs: Track[], index: number) => {
    if (
      playList.songs.length > 0 &&
      playList.currentIndex > -1 &&
      playList.songs[playList.currentIndex].id === songs[index].id
    ) {
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

  // 歌单中歌曲全部添加到播放列表
  const addPlayList = (id: string | number, songs: Track[]) => {
    dispatch(
      addSongs({
        id,
        songs
      })
    )
  }

  // todo 播放列表 添加歌曲 并播放
  // id 歌曲id
  const addSongAndPlay = (id: string | number) => {
    getSongDetail(id).then((res) => {
      if (res.code === 200) {
        dispatch(
          addSongs({
            id,
            songs: [res.songs[0]]
          })
        )
        const currentIndex = playList.songs.findIndex((song) => song.id === id)
        if (currentIndex >= 0) {
          dispatch(setCurrentIndex(currentIndex))
        } else {
          dispatch(setCurrentIndex(playList.songs.length))
        }
        setPlaying(true)
      }
    })
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
    playSong,
    addSongAndPlay
  }

  return (
    <>
      <PlayerContext.Provider value={context}>{props.children}</PlayerContext.Provider>
    </>
  )
}
