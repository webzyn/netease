import React, { useEffect, useState } from 'react'
import Item from 'components/Item'
import { getSongSheet } from 'request/api'

import { SongSheet } from 'request/types/common'

import style from './style.module.css'

const PersonalizedSongSheet = () => {
  const [list, setList] = useState<SongSheet[] | []>([])
  // const [getSongSheet] = useApi()

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const res = await getSongSheet()
    if (res.code === 200) {
      if ('recommend' in res) {
        const list = res.recommend!.slice(0, 10)
        setList(list as SongSheet[])
      } else if ('result' in res) {
        const list = res.result!.slice(0, 10)
        setList(list as SongSheet[])
      }
    }
  }
  return (
    <div>
      <div className={style.wrapper}>
        {list.map((item) => (
          <div className={style.item} key={item.id}>
            <Item id={item.id} picUrl={item.picUrl} name={item.name} playcount={item.playcount} alg={item.alg}></Item>
          </div>
        ))}
      </div>
    </div>
  )
}
export default PersonalizedSongSheet
