import React, { useState } from 'react'
import { AppstoreOutlined, MenuOutlined, PicLeftOutlined } from '@ant-design/icons'

import AlbumList from './components/AlbumList'
import AlbumBlock from './components/AlbumBlock'
import AlbumTable from './components/AlbumTable'

import style from './style.module.css'

export default function Albums() {
  const [current, setCurrent] = useState(2)

  return (
    <div className={style.root}>
      {/* 按钮 */}
      <div className={style.action}>
        <div
          className={`${style.box} ${style.box1} ${current === 0 ? style.current : ''}`}
          onClick={() => setCurrent(0)}
        >
          <AppstoreOutlined style={{ color: current === 0 ? '#fff' : '#aaa' }} />
        </div>
        <div
          className={`${style.box} ${style.box2} ${current === 1 ? style.current : ''}`}
          onClick={() => setCurrent(1)}
        >
          <MenuOutlined style={{ color: current === 1 ? '#fff' : '#aaa' }} />
        </div>
        <div
          className={`${style.box} ${style.box3} ${current === 2 ? style.current : ''}`}
          onClick={() => setCurrent(2)}
        >
          <PicLeftOutlined style={{ color: current === 2 ? '#fff' : '#aaa' }} />
        </div>
      </div>

      {current === 0 && <AlbumBlock></AlbumBlock>}

      {current === 1 && <AlbumList></AlbumList>}

      {current === 2 && <AlbumTable></AlbumTable>}
    </div>
  )
}
