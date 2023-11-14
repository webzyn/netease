import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserPlaylist } from 'request/withOutLoginApi'
import Item from './Item'

import { PlayList } from 'types'
interface IProp {
  type: 'created' | 'collected'
}
export default function Table(props: IProp) {
  const { id } = useParams()
  const { type } = props
  const [list, setList] = useState<PlayList[]>([])
  const [more, setMore] = useState(false)
  const [page, setPage] = useState(1)

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

  return (
    <>
      {list.map((item) => (
        <Item key={item.id} id={item.id} playlistDetail={item}></Item>
      ))}
      <div style={{ margin: '30px auto', fontSize: '14px', textAlign: 'center', cursor: 'pointer', color: '#666' }}>
        {more ? <span onClick={() => setPage(page + 1)}>加载更多</span> : <span>到底啦~</span>}
      </div>
    </>
  )
}
