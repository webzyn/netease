import React, { useEffect, useState } from 'react'
import Icon from 'components/Icon'
import { getTopPlayListHighquality } from 'request/withOutLoginApi'

import useJump from 'utils/hooks/useJump'

import style from './style.module.css'
import { PlayList } from 'types'
interface IProp {
  cat: string
}
export default function Highquality(props: IProp) {
  const { cat } = props
  const [highquality, setHighquality] = useState<PlayList>()
  const { goHighquality } = useJump()

  useEffect(() => {
    getHighquality()
  }, [cat])

  // 精品歌单
  const getHighquality = () => {
    getTopPlayListHighquality(cat, 1).then((res) => {
      if (res.code === 200 && res.playlists.length > 0) {
        setHighquality(res.playlists[0])
      }
    })
  }

  return (
    <div className={style.root} onClick={() => goHighquality(cat)}>
      <img className={style.bac} src={highquality?.coverImgUrl}></img>
      <div></div>
      <div className={style.pic}>
        <img className={style.pic} src={highquality?.coverImgUrl} alt='' />
      </div>
      <div className={style.main}>
        <div className={style.btn}>
          <Icon type='icon-jingpin' style={{ marginRight: '3px' }}></Icon>
          精品歌单
        </div>
        <div className={style.name}>{highquality?.name}</div>
        <div className={style.copywriter}>{highquality?.copywriter}</div>
      </div>
    </div>
  )
}
