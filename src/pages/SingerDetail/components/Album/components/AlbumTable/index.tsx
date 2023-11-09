import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getArtistAlbum } from 'request/withOutLoginApi'
import TopSong from '../TopSong'
import AlbumForTable from '../AlbumForTable'

import { Album } from 'types'
export default function AlbumTable() {
  const { id } = useParams()
  const [albums, setAlbums] = useState<Album[]>([])
  const [more, setMore] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    getData()
  }, [page])

  const getData = () => {
    getArtistAlbum(id as string, page).then((res) => {
      if (res.code === 200) {
        page === 1 ? setAlbums(res.hotAlbums) : setAlbums([...albums, ...res.hotAlbums])
        setMore(res.more)
      }
    })
  }

  return (
    <>
      <TopSong></TopSong>
      {albums.map((album) => (
        <AlbumForTable key={album.id} id={album.id} />
      ))}
      <div style={{ margin: '30px auto', fontSize: '14px', textAlign: 'center', cursor: 'pointer', color: '#666' }}>
        {more ? <span onClick={() => setPage(page + 1)}>加载更多</span> : <span>到底啦~</span>}
      </div>
    </>
  )
}
