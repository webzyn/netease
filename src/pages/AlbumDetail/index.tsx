import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getAlbum } from 'request/withOutLoginApi'

export default function AlbumDetail() {
  const { id } = useParams()

  useEffect(() => {
    getAlbum(id as string).then((res) => {
      console.log(res)
    })
  })
  return <div>AlbumDetail</div>
}
