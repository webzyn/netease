import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import DetailHeader from './components/DetailHeader'
import Tabs from 'components/Tabs'
import CreateSongSheet from './components/CreateSongSheet'
import CollecteSongSheet from './components/CollecteSongSheet'

export default function UserDetail() {
  const location = useLocation()
  const { id } = useParams()
  const [isActive, setIsAction] = useState(0)
  const tabs = ['创建的歌单', '收藏的歌单', '收藏的播客', '创建的音乐专栏']

  return (
    <div key={location.key} style={{ height: '100%', overflowY: 'auto' }}>
      <DetailHeader></DetailHeader>
      <Tabs items={tabs} isActive={isActive} setIsAction={setIsAction}></Tabs>
      {isActive === 0 && <CreateSongSheet></CreateSongSheet>}
      {isActive === 1 && <CollecteSongSheet></CollecteSongSheet>}
      {isActive === 2 && <div style={{ margin: '30px', textAlign: 'center' }}>敬请期待</div>}
      {isActive === 3 && <div style={{ margin: '30px', textAlign: 'center' }}>敬请期待</div>}
    </div>
  )
}
