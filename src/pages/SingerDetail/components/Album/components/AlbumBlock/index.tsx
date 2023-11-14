import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArtistAlbum } from 'request/withOutLoginApi'

import useJump from 'utils/hooks/useJump'
import usePlayer from 'utils/hooks/usePlayer'
import dayjs from 'utils/dayjs'
import loadImg from 'utils/loadImg'
import { CaretRightOutlined } from '@ant-design/icons'

import style from './style.module.css'
import { Album } from 'types'
export default function AlbumBlock() {
  const { id } = useParams()
  const [albums, setAlbums] = useState<Album[]>([])
  const [currentMove, setCurrentMove] = useState(-1)
  const [more, setMore] = useState(false)
  const [page, setPage] = useState(1)
  const { goAlbumDetail } = useJump()
  const { setAlbumList } = usePlayer()

  useEffect(() => {
    getData()
  }, [page])

  useEffect(() => {
    loadImg()
  }, [albums])

  const getData = () => {
    getArtistAlbum(id as string, page).then((res) => {
      if (res.code === 200) {
        page === 1 ? setAlbums(res.hotAlbums) : setAlbums([...albums, ...res.hotAlbums])
        setMore(res.more)
      }
    })
  }

  const play = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setAlbumList(id)
  }

  return (
    <div className={style.container1}>
      {albums.map((item, index) => (
        <div className={style.album} key={item.id}>
          <div
            className={style.img_wrap}
            onMouseEnter={() => setCurrentMove(index)}
            onMouseLeave={() => setCurrentMove(-1)}
            onClick={() => goAlbumDetail(item.id)}
          >
            <img className={style.img} src='/img/default.jpg' data-src={item.picUrl} />
            {currentMove === index && (
              <div className={style.circle} onClick={(e) => play(e, item.id)}>
                <CaretRightOutlined
                  style={{
                    fontSize: '30px',
                    color: 'var(--theme-background)',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-45%, -50%)'
                  }}
                />
              </div>
            )}
          </div>

          <div className={style.name} onClick={() => goAlbumDetail(item.id)}>
            {item.name}
            {item.transNames && item.transNames.length > 0 && (
              <span style={{ color: '#999' }}>({item.transNames.join(',')})</span>
            )}
          </div>

          <div className={style.time}>{dayjs(item.publishTime).format('YYYY-MM-DD')}</div>
        </div>
      ))}

      <div style={{ margin: '30px auto', fontSize: '14px', textAlign: 'center', cursor: 'pointer', color: '#666' }}>
        {more ? <span onClick={() => setPage(page + 1)}>加载更多</span> : <span>到底啦~</span>}
      </div>
    </div>
  )
}
