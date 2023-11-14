import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserPlaylist } from 'request/withOutLoginApi'
import { PlayList } from 'types'
import useJump from 'utils/hooks/useJump'
import usePlayer from 'utils/hooks/usePlayer'

import { CaretRightOutlined } from '@ant-design/icons'

import style from './style.module.css'

interface IProp {
  type: 'created' | 'collected'
}
export default function Block(props: IProp) {
  const { id } = useParams()
  const { type } = props
  const [list, setList] = useState<PlayList[]>([])
  const [more, setMore] = useState(false)
  const [page, setPage] = useState(1)
  const [currentMove, setCurrentMove] = useState(-1)

  const { goSongSheetDetail } = useJump()
  const { setPlaylist } = usePlayer()

  useEffect(() => {
    getData()
  }, [page])

  const getData = () => {
    getUserPlaylist(id as string, page).then((res) => {
      if (res.code === 200) {
        const playlist = res.playlist.filter((item) => {
          if (type === 'created') {
            return item.userId === Number(id)
          } else {
            return item.userId !== Number(id)
          }
        })
        page === 1 ? setList(playlist) : setList([...list, ...playlist])
        setMore(res.more)
      }
    })
  }
  const play = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setPlaylist(id)
  }

  return (
    <div className={style.container1}>
      {list.map((item, index) => (
        <div className={style.album} key={item.id}>
          <div
            className={style.img_wrap}
            onMouseEnter={() => setCurrentMove(index)}
            onMouseLeave={() => setCurrentMove(-1)}
            onClick={() => goSongSheetDetail(item.id)}
          >
            <img className={style.img} src={item.coverImgUrl} />
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

          <div className={style.name} onClick={() => goSongSheetDetail(item.id)}>
            {item.name}
          </div>

          <div className={style.time}>{item.trackCount}首</div>
        </div>
      ))}

      <div
        style={{
          width: '100%',
          margin: '30px auto',
          fontSize: '14px',
          textAlign: 'center',
          cursor: 'pointer',
          color: '#666'
        }}
      >
        {more ? <span onClick={() => setPage(page + 1)}>加载更多</span> : <span>到底啦~</span>}
      </div>
    </div>
  )
}
