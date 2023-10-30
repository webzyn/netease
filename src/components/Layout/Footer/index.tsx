import style from './style.module.css'

import { useSelector, useDispatch } from 'react-redux'
import { Store } from 'store/types'

import Info from './components/Info'
import Player from './components/Player'
import Oper from './components/Oper'

const Footer = () => {
  const playList = useSelector((store: Store) => store.playList)
  const songs = playList.songs
  const currentDetail = playList.songs[playList.currentIndex] || void 0

  return (
    <div className={style.footer}>
      {playList.currentIndex > -1 && songs.length > 0 ? (
        <Info song={currentDetail} />
      ) : (
        <div style={{ width: '290px' }}></div>
      )}
      <Player playMode={playList.mode} disabled={songs.length <= 0 || playList.currentIndex <= -1} />
      {playList.currentIndex > -1 && songs.length > 0 ? <Oper /> : <div style={{ width: '290px' }}></div>}
    </div>
  )
}
export default Footer
