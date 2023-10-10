import React, { useEffect } from 'react'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import style from '../../style.module.css'
import { Song } from 'types'

interface IProp {
  song: Song
}
export default function Info(props: IProp) {
  const { name, al, ar } = props.song
  const { picUrl } = al
  const singerName = ar.reduce((init, item) => {
    if (init === '') {
      return item.name
    } else {
      return init + '/' + item.name
    }
  }, '')
  useEffect(() => {
    console.log(props.song)
  })
  return (
    <div className={style.info_root}>
      <div className={style.img_wrapper}>
        <img src={picUrl} className={style.img} alt='' />
      </div>
      <div className={style.info}>
        <div className={style.name} style={{ paddingBottom: '8px', fontSize: '14px' }}>
          {name}
          <HeartOutlined style={{ fontSize: '16px', marginLeft: '4px' }} />
          {/* <HeartFilled style={{ fontSize: '16px', marginLeft: '4px', color: '#ec4141' }} /> */}
        </div>
        <div className={style.name}>{singerName}</div>
      </div>
    </div>
  )
}
