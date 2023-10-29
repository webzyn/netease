import React, { useState } from 'react'
import { CaretRightFilled, CaretRightOutlined, UserOutlined } from '@ant-design/icons'
import style from './style.module.css'

import { converUnits } from 'utils/utils'
import useJump from 'utils/hooks/useJump'
import usePlayer from 'utils/hooks/usePlayer'

import { PlayList } from 'types'
export interface IProps {
  playList: PlayList
}

export default function GlobalRank(props: IProps) {
  const [isHover, setIsHover] = useState(false)
  const { goSongSheetDetail } = useJump()
  const { setPlaylist } = usePlayer()
  const { playList } = props

  const mouse = (state: boolean) => {
    setIsHover(state)
  }

  const play = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPlaylist(playList.id)
  }

  return (
    <div style={{ width: '100%' }}>
      <div
        className={style.pic}
        onMouseEnter={() => mouse(true)}
        onMouseLeave={() => mouse(false)}
        onClick={() => goSongSheetDetail(playList.id)}
      >
        <img src={playList.coverImgUrl} style={{ width: '100%', height: '100%', borderRadius: '4px' }} />
        <span className={style.count}>
          <CaretRightFilled />
          {converUnits(playList.playCount)}
        </span>
        {playList.nickname && (
          <span className={style.nickname}>
            <UserOutlined style={{ fontSize: '13px', marginRight: '2px' }} />
            {playList.nickname}
          </span>
        )}
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
      <div className={style.name}>
        <span style={{ cursor: 'pointer' }} onClick={() => goSongSheetDetail(playList.id)}>
          {playList.name}
        </span>
      </div>
    </div>
  )
}
