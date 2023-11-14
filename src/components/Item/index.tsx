import React, { useEffect, useState } from 'react'
import { CaretRightFilled, CaretRightOutlined, UserOutlined } from '@ant-design/icons'
import { IProps } from './types'
import style from './style.module.css'

import { converUnits } from 'utils/utils'
import useJump from 'utils/hooks/useJump'
import usePlayer from 'utils/hooks/usePlayer'
import loadImg from 'utils/loadImg'

export default function Item(props: IProps) {
  const [isHover, setIsHover] = useState(false)

  const { goSongSheetDetail } = useJump()
  const { setPlaylist } = usePlayer()

  const mouse = (state: boolean) => {
    setIsHover(state)
  }

  const play = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPlaylist(props.id)
  }

  useEffect(() => {
    loadImg()
  }, [props])

  return (
    <div style={{ width: '100%' }}>
      <div
        className={style.pic}
        onMouseEnter={() => mouse(true)}
        onMouseLeave={() => mouse(false)}
        onClick={() => goSongSheetDetail(props.id)}
      >
        <img
          src='/img/default.jpg'
          data-src={props.picUrl}
          style={{ width: '100%', height: '100%', borderRadius: '4px' }}
        />
        <span className={style.count}>
          <CaretRightFilled />
          {converUnits(props.playCount)}
        </span>
        {props.nickname && (
          <span className={style.nickname}>
            <UserOutlined style={{ fontSize: '13px', marginRight: '2px' }} />
            {props.nickname}
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
        <span style={{ cursor: 'pointer' }} onClick={() => goSongSheetDetail(props.id)}>
          {props.name}
        </span>
      </div>
    </div>
  )
}
