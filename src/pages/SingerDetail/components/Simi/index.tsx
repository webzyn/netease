import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSimiArtist } from 'request/withOutLoginApi'
import useJump from 'utils/hooks/useJump'
import loadImg from 'utils/loadImg'

import style from './style.module.css'
import { Artist } from 'types'
export default function Simi() {
  const { id } = useParams()
  const [artists, setArtists] = useState<Artist[]>([])
  const { goSingerDetail } = useJump()

  useEffect(() => {
    getSimiArtist(id as string).then((res) => {
      setArtists(res.artists)
    })
  }, [])

  useEffect(() => {
    loadImg()
  }, [artists])
  return (
    <div className={style.singer_wrapper}>
      {artists.map((item) => (
        <div className={style.singer} key={item.id}>
          <div className={style.img_wrap}>
            <img
              className={style.img}
              src='/img/default.jpg'
              data-src={item.img1v1Url}
              onClick={() => goSingerDetail(item.id, item)}
            />
          </div>
          <div className={style.info}>
            <div onClick={() => goSingerDetail(item.id, item)} className={style.name}>
              {item.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
