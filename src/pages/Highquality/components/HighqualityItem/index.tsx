import React, { useEffect, useState } from 'react'
import { converUnits } from 'utils/utils'
import useJump from 'utils/hooks/useJump'
import usePlayer from 'utils/hooks/usePlayer'
import loadImg from 'utils/loadImg'

import { CaretRightFilled, CaretRightOutlined } from '@ant-design/icons'

import style from './style.module.css'

import PlayList from 'types/Playlist'
interface IProp {
  playlist: PlayList
}
export default function HighqualityItem(props: IProp) {
  const { goSongSheetDetail } = useJump()
  const { setPlaylist } = usePlayer()
  const { playlist } = props
  const [isHover, setIsHover] = useState(false)

  const mouse = (state: boolean) => {
    setIsHover(state)
  }

  const play = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPlaylist(playlist.id)
  }

  useEffect(() => {
    loadImg()
  }, [playlist])

  return (
    <div className={style.item}>
      <div
        className={style.img}
        onMouseEnter={() => mouse(true)}
        onMouseLeave={() => mouse(false)}
        onClick={() => goSongSheetDetail(playlist.id)}
      >
        <img className={style.img} src='/img/default.jpg' data-src={playlist.coverImgUrl} alt='' />
        <span className={style.count}>
          <CaretRightFilled />
          {converUnits(playlist.playCount)}
        </span>
        <div className={style.mask}></div>
        {isHover && (
          <div className={style.circle} onClick={play}>
            <CaretRightOutlined
              style={{
                fontSize: '24px',
                color: 'var(--theme-background)',
                position: 'absolute',
                top: '6px',
                left: '6px'
              }}
            />
          </div>
        )}
      </div>
      <div className={style.info}>
        <div className={style.name} onClick={() => goSongSheetDetail(playlist.id)}>
          {playlist.name}
        </div>
        <div className={style.nickname}>
          by<span style={{ marginLeft: '6px' }}>{playlist.creator.nickname}</span>
        </div>
        <div>
          {playlist.tag && <span className={style.tag}>{playlist.tag}</span>}
          {playlist.copywriter && <span className={style.copywriter}>{playlist.copywriter}</span>}
        </div>
      </div>
    </div>
  )
}
