import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import DetailHeader from './components/DetailHeader'
import Tabs from 'components/Tabs'
import Album from './components/Album'
import MV from './components/MV'
import Desc from './components/Desc'
import Simi from './components/Simi'

export default function SingerDetail() {
  const location = useLocation()
  const [isActive, setIsAction] = useState(0)
  const tabs = ['专辑', 'MV', '歌手详情', '相似歌手']
  return (
    <div style={{ height: '100%', overflowY: 'auto' }} key={location.key}>
      <DetailHeader></DetailHeader>
      <Tabs items={tabs} isActive={isActive} setIsAction={setIsAction}></Tabs>
      {isActive === 0 && <Album></Album>}
      {isActive === 1 && <MV></MV>}
      {isActive === 2 && <Desc></Desc>}
      {isActive === 3 && <Simi></Simi>}
    </div>
  )
}
