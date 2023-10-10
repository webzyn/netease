import React, { Component, useEffect, useState } from 'react'
import style from './style.module.css'
import useHowler from 'utils/hooks/useHowler'
import { useSelector, useDispatch } from 'react-redux'
import { Store } from 'store/types'
import { setMode } from 'store/festures/playList'

import Info from './components/Info'
import Player from './components/Player'
import Oper from './components/Oper'

const Footer = () => {
  const [_id, _playing, _play, _next, _prev, _assign, _setMute, _getvolume, _setVolume, _getSeek, _setSeek, _duration] =
    useHowler()
  const playList = useSelector((store: Store) => store.playList)
  const dispatch = useDispatch()
  const songs = playList.songs
  const currentDetail = playList.songs[playList.currentIndex] || void 0

  const [playing, setPlaying] = useState<boolean>(_playing)

  useEffect(() => {
    console.log(playList.mute)
  })

  const player = () => {
    setPlaying(!playing)
    _play()
  }

  const next = () => {
    setPlaying(true)
    _next()
  }

  const prev = () => {
    setPlaying(true)
    _prev()
  }

  const changeMode = () => {
    dispatch(setMode())
  }

  return (
    <div className={style.footer}>
      {songs.length > 0 ? <Info song={currentDetail} /> : <div style={{ width: '290px' }}></div>}
      <Player
        playing={_playing}
        play={player}
        next={next}
        prev={prev}
        changeMode={changeMode}
        playMode={playList.mode}
        getSeek={_getSeek}
        setSeek={_setSeek}
        duration={_duration()}
        id={_id}
        disabled={songs.length <= 0}
      />
      {songs.length > 0 ? (
        <Oper
          volume={playList.volumn}
          mute={playList.mute}
          setVolume={_setVolume}
          setMute={_setMute}
          assign={_assign}
        />
      ) : (
        <div style={{ width: '290px' }}></div>
      )}
    </div>
  )
}
export default Footer
