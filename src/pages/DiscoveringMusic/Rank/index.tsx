import React, { useEffect, useState } from 'react'
import { getTopList } from 'request/withOutLoginApi'

import OfficialRank from './components/OfficialRank'
import GlobalRank from './components/GlobalRank'
import Item from 'components/Item'

import style from './style.module.css'

import { PlayList } from 'types'
export default function Rank() {
  const [officialRankings, setOfficialRankings] = useState<PlayList[]>([])
  const [globalRankings, setGlobalRankings] = useState<PlayList[]>([])
  useEffect(() => {
    getTopList().then((res) => {
      if (res.code === 200) {
        setOfficialRankings(res.list.slice(0, 4))
        setGlobalRankings(res.list.slice(4))
      }
    })
  }, [])
  return (
    <div>
      <div className={style.title}>官方榜</div>
      {officialRankings.map((item) => (
        <OfficialRank key={item.id} playList={item}></OfficialRank>
      ))}
      <div className={style.title}>全球榜</div>
      <div className={style.wrapper}>
        {globalRankings.map((item) => (
          <div className={style.item} key={item.id}>
            <GlobalRank playList={item}></GlobalRank>
          </div>
        ))}
      </div>
      {/* <div className={style.wrapper}>
        {globalRankings.map((item) => (
          <div className={style.item} key={item.id}>
            <Item
              key={item.id}
              id={item.id}
              picUrl={item.picUrl}
              name={item.name}
              playCount={item.playcount || item.playCount}
              alg={item.alg}
            ></Item>
          </div>
        ))}
      </div> */}
    </div>
  )
}
