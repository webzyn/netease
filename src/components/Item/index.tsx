import React, { useEffect, useState } from 'react'
import { CaretRightFilled, CaretRightOutlined } from '@ant-design/icons'
import { IProps } from './types'
import style from './style.module.css'
import { trackAll, getSongUrl, getSongUrlv1 } from 'request/singleApi'

import { useDispatch } from 'react-redux'
import { setSongs, setCurrentIndex } from 'store/festures/playList'
import useHowler from 'utils/hooks/useHowler'

export default function Item(props: IProps) {
  const dispatch = useDispatch()
  const [isHover, setIsHover] = useState(false)

  const calculate = (count: number) => {
    if (count > 1000000000) {
      return (count / 100000000).toFixed(0) + '亿'
    } else if (count > 100000) {
      return (count / 10000).toFixed(0) + '万'
    } else {
      return count
    }
  }

  const mouse = (state: boolean) => {
    setIsHover(state)
  }

  // 将歌单中歌曲存入store
  const getPlaylist = (id: number) => {
    trackAll(id).then((res) => {
      if (res.code === 200) {
        dispatch(
          setSongs({
            id,
            songs: res.songs
          })
        )
        dispatch(setCurrentIndex(0))
      }
    })
  }

  return (
    <div style={{ width: '100%' }}>
      <div className={style.pic} onMouseEnter={() => mouse(true)} onMouseLeave={() => mouse(false)}>
        <img src={props.picUrl} style={{ width: '100%', height: '100%', borderRadius: '4px' }} />
        <span className={style.count}>
          <CaretRightFilled />
          {calculate(props.playcount)}
        </span>
        {props.alg === 'byplaylist_play_profile_swing' && <div className={style.mask}></div>}
        {isHover && (
          <div className={style.circle} onClick={() => getPlaylist(props.id)}>
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
      <div className={style.name}>{props.name}</div>
    </div>
  )
}
