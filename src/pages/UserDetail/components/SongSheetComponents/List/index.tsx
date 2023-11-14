import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserPlaylist } from 'request/withOutLoginApi'
import { PlayList } from 'types'
import useJump from 'utils/hooks/useJump'
import loadImg from 'utils/loadImg'

import style from './style.module.css'

interface IProp {
  type: 'created' | 'collected'
}
export default function List(props: IProp) {
  const { id } = useParams()
  const { type } = props
  const [list, setList] = useState<PlayList[]>([])
  const [more, setMore] = useState(false)
  const [page, setPage] = useState(1)
  const [currentMove, setCurrentMove] = useState(-1)

  const { goSongSheetDetail, goUserDetail } = useJump()

  useEffect(() => {
    getData()
  }, [page])

  useEffect(() => {
    loadImg()
  }, [list])

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
  return (
    <div className={style.container2}>
      {list.map((item, index) => (
        <div
          className={style.album}
          key={item.id}
          style={{ background: currentMove === index ? '#F2F2F3' : index % 2 === 0 ? '#fafafa' : '#fff' }}
          onMouseEnter={(e) => setCurrentMove(index)}
          onMouseLeave={() => setCurrentMove(-1)}
        >
          <div className={style.img_wrap} onClick={() => goSongSheetDetail(item.id)}>
            <img className={style.img} src='/img/default.jpg' data-src={item.coverImgUrl} alt='' />
          </div>

          <div className={style.name} onClick={() => goSongSheetDetail(item.id)}>
            {item.name}
            {item.transNames && item.transNames.length > 0 && (
              <span style={{ color: '#999' }}>({item.transNames.join(',')})</span>
            )}
          </div>

          <div className={style.size}>{item.trackCount}首</div>

          <div className={style.size}>
            by{' '}
            <span style={{ cursor: 'pointer' }} onClick={() => goUserDetail(item.creator.userId)}>
              {item.creator.nickname}
            </span>
          </div>

          <div className={style.size}>播放{item.playCount}次</div>
        </div>
      ))}
      <div style={{ margin: '30px auto', fontSize: '14px', textAlign: 'center', cursor: 'pointer', color: '#666' }}>
        {more ? <span onClick={() => setPage(page + 1)}>加载更多</span> : <span>到底啦~</span>}
      </div>
    </div>
  )
}
