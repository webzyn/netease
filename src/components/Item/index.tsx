import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaretRightFilled, CaretRightOutlined } from '@ant-design/icons'
import { IProps } from './types'
import style from './style.module.css'
import { trackAll } from 'request/withOutLoginApi'

import { converUnits } from 'utils/utils'
import PlayerContext from 'context/PlayerContext'

export default function Item(props: IProps) {
  const navigate = useNavigate()
  const [isHover, setIsHover] = useState(false)

  const { changeSongSheet } = useContext(PlayerContext)

  const mouse = (state: boolean) => {
    setIsHover(state)
  }

  // 将歌单中歌曲存入store
  const getPlaylist = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    trackAll(id).then((res) => {
      if (res.code === 200) {
        changeSongSheet(id, res.songs)
      }
    })
  }

  const goSongSheetDetail = () => {
    navigate(`/songSheetDetail/${props.id}`)
  }

  return (
    <div style={{ width: '100%' }}>
      <div
        className={style.pic}
        onMouseEnter={() => mouse(true)}
        onMouseLeave={() => mouse(false)}
        onClick={goSongSheetDetail}
      >
        <img src={props.picUrl} style={{ width: '100%', height: '100%', borderRadius: '4px' }} />
        <span className={style.count}>
          <CaretRightFilled />
          {converUnits(props.playcount)}
        </span>
        {props.alg === 'byplaylist_play_profile_swing' && <div className={style.mask}></div>}
        {isHover && (
          <div className={style.circle} onClick={(e) => getPlaylist(props.id, e)}>
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
      <div className={style.name}>
        <span style={{ cursor: 'pointer' }} onClick={goSongSheetDetail}>
          {props.name}
        </span>
      </div>
    </div>
  )
}
