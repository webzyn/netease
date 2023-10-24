import React from 'react'
import Title from 'components/Title'
import SongSheet from './SongSheet'
import NewSong from './NewSong'
import style from './style.module.css'

export default function Personalized() {
  return (
    <>
      <Title to='/discoveringMusic/songSheet'>推荐歌单</Title>
      <SongSheet></SongSheet>
      <Title to='/discoveringMusic/latestMusic'>最新音乐</Title>
      <NewSong></NewSong>
    </>
  )
}
