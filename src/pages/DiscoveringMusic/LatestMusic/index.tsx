import React, { useState } from 'react'
import Songs from './components/Songs'
import Disc from './components/Disc'
import style from './style.module.css'
export default function LatestMusic() {
  const [actionBtn, setActionBtn] = useState(1)
  return (
    <div className={style.root}>
      <div className={style.title}>
        <div className={`${style.btn} ${actionBtn === 1 ? style.action : ''}`} onClick={() => setActionBtn(1)}>
          <div className={style.text}>新歌速递</div>
        </div>
        <div className={`${style.btn} ${actionBtn === 2 ? style.action : ''}`} onClick={() => setActionBtn(2)}>
          <div className={style.text}>新碟上架</div>
        </div>
      </div>
      {actionBtn === 1 && <Songs></Songs>}
      {actionBtn === 2 && <Disc></Disc>}
    </div>
  )
}
