import React from 'react'
import Title from 'components/Title'
import SongSheet from './SongSheet'

export default function Personalized() {
  return (
    <>
      <Title to='/discoveringMusic/songSheet'>推荐歌单</Title>
      <SongSheet></SongSheet>
    </>
  )
}
