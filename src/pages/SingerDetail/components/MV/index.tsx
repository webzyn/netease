import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getArtistMv } from 'request/withOutLoginApi'
import { converUnits, converTime } from 'utils/utils'
import useJump from 'utils/hooks/useJump'

import { CaretRightFilled } from '@ant-design/icons'

import style from './style.module.css'
import { Mv } from 'types'
export default function MV() {
  const { id } = useParams()
  const [mvs, setMvs] = React.useState<Mv[]>([])
  const [more, setMore] = React.useState<boolean>(false)
  const [page, setPage] = React.useState<number>(1)
  const { goMVDetail } = useJump()

  useEffect(() => {
    getData()
  }, [page])

  const getData = () => {
    getArtistMv(id as string, page, 12).then((res) => {
      setMvs([...mvs, ...res.mvs])
      setMore(res.hasMore)
    })
  }

  return (
    <div className={style.root}>
      {mvs.map((mv) => (
        <div className={style.box}>
          <div className={style.img_box} onClick={() => goMVDetail(mv.id)}>
            <img className={style.img} src={mv.imgurl16v9} alt='' />
            <span className={style.count}>
              <CaretRightFilled />
              {converUnits(mv.playCount)}
            </span>
            <span className={style.time}>{converTime(mv.duration / 1000)}</span>
          </div>
          <div className={style.name} onClick={() => goMVDetail(mv.id)}>
            {mv.name}
          </div>
        </div>
      ))}

      <div style={{ margin: '30px auto', fontSize: '14px', textAlign: 'center', cursor: 'pointer', color: '#666' }}>
        {more ? <span onClick={() => setPage(page + 1)}>加载更多</span> : <span>到底啦~</span>}
      </div>
    </div>
  )
}
