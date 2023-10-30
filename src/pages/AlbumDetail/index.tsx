import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { getAlbum, getAlbumDetailDynamic } from 'request/withOutLoginApi'

import DetailHeader from './components/DetailHeader'
import Tabs from 'components/Tabs'
import SongList from './components/SongList'
import DetailComment from 'components/DetailComment'

export default function AlbumDetail() {
  const { id } = useParams()
  const [commentCount, setCommentCount] = useState(0)
  const [description, setDescription] = useState('')

  const [isActive, setIsAction] = useState(0)

  const menuList = useMemo(() => {
    return ['歌曲列表', `评论(${commentCount})`, '专辑详情']
  }, [commentCount])

  useEffect(() => {
    getAlbumDetailDynamic(id as string).then((res) => {
      if (res.code === 200) {
        setCommentCount(res.commentCount)
      }
    })
    getAlbum(id as string).then((res) => {
      if (res.code === 200) {
        setDescription(res.album.description)
      }
    })
  })

  return (
    <div
      style={{
        height: 'calc(100vh - 60px - 73px)',
        overflow: 'auto'
      }}
    >
      <DetailHeader />
      <Tabs items={menuList} isActive={isActive} setIsAction={setIsAction}></Tabs>
      {isActive === 0 && <SongList />}
      {isActive === 1 && <DetailComment />}
      {isActive === 2 && description.length > 0 && (
        <div style={{ padding: '30px', fontSize: '14px' }}>
          <div style={{ fontWeight: '900' }}>专辑详情</div>
          <div style={{ color: '#666666' }}>
            {description.split('\n').map((line, index) => (
              <p key={index} style={{ textIndent: '2em', lineHeight: 2 }}>
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
      {isActive === 2 && description === '' && (
        <div style={{ color: '#666666', fontSize: '14px', textAlign: 'center' }}>暂无数据</div>
      )}
    </div>
  )
}
