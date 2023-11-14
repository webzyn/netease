import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArtistAlbum } from 'request/withOutLoginApi'

import useJump from 'utils/hooks/useJump'
import dayjs from 'utils/dayjs'
import loadImg from 'utils/loadImg'

import style from './style.module.css'
import { Album } from 'types'
export default function AlbumList() {
  const { id } = useParams()
  const [albums, setAlbums] = useState<Album[]>([])
  const [currentMove, setCurrentMove] = useState(-1)
  const [more, setMore] = useState(false)
  const [page, setPage] = useState(1)
  const { goAlbumDetail } = useJump()

  useEffect(() => {
    getData()
  }, [page])

  useEffect(() => {
    loadImg()
  }, [albums])

  const getData = () => {
    getArtistAlbum(id as string, page).then((res) => {
      if (res.code === 200) {
        setAlbums([...albums, ...res.hotAlbums])
        setMore(res.more)
      }
    })
  }

  return (
    <div className={style.container2}>
      {albums.map((item, index) => (
        <div
          className={style.album}
          key={item.id}
          style={{ background: currentMove === index ? '#F2F2F3' : index % 2 === 0 ? '#fafafa' : '#fff' }}
          onMouseEnter={(e) => setCurrentMove(index)}
          onMouseLeave={() => setCurrentMove(-1)}
        >
          <div className={style.img_wrap} onClick={() => goAlbumDetail(item.id)}>
            <img className={style.img} src='/img/default.jpg' data-src={item.picUrl} alt='' />
          </div>

          <div className={style.name} onClick={() => goAlbumDetail(item.id)}>
            {item.name}
            {item.transNames && item.transNames.length > 0 && (
              <span style={{ color: '#999' }}>({item.transNames.join(',')})</span>
            )}
          </div>

          <div className={style.size}>{item.size}首</div>

          <div className={style.time}>发行时间: {dayjs(item.publishTime).format('YYYY-MM-DD')}</div>
        </div>
      ))}
      <div style={{ margin: '30px auto', fontSize: '14px', textAlign: 'center', cursor: 'pointer', color: '#666' }}>
        {more ? <span onClick={() => setPage(page + 1)}>加载更多</span> : <span>到底啦~</span>}
      </div>
    </div>
  )
}
