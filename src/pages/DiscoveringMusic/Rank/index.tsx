import React, { useEffect, useState } from 'react'
import { getTopList } from 'request/withOutLoginApi'

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
    </div>
  )
}
