import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

import Block from '../SongSheetComponents/Block'
import List from '../SongSheetComponents/List'
import Table from '../SongSheetComponents/Table'
import { AppstoreOutlined, MenuOutlined, PicLeftOutlined } from '@ant-design/icons'

import style from './style.module.css'

export default function CollecteSongSheet() {
  const user = useSelector((store: any) => store.user)
  const { id } = useParams()
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

      {current === 0 && <Block type='collected'></Block>}

      {current === 1 && <List type='collected'></List>}

      {current === 2 && <Table type='collected'></Table>}
    </div>
  )
}
