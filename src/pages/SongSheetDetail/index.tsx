import React, { useEffect, useState, useContext, useRef } from 'react'
import PlayerContext from 'context/PlayerContext'
import { useParams } from 'react-router-dom'

import { getSongSheetDetail, getSongDetail } from 'request/withOutLoginApi'

import DetailHeader from 'components/DetailHeader'
import Tabs from 'components/Tabs'
import SongList from './components/SongList'
import Comment from './components/Comment'
import Collectors from './components/Collectors'

import { SongSheetDetailRes } from 'request/types/singleApi'

import { DetailHeaderRef, TabsRef } from 'types/refs'
import { Track } from 'types'
interface MenuList {
  label: string
  element: React.ReactNode
}

const SongSheet = () => {
  const { addPlayList, changeSongSheet } = useContext(PlayerContext)
  let { id } = useParams()
  const [detail, setDetail] = useState<SongSheetDetailRes>()
  const [songs, setSongs] = useState<Track[]>([])
  const [menuList, setMenuList] = useState<MenuList[]>([])
  const wrapRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<DetailHeaderRef>(null)
  const tabsRef = useRef<TabsRef>(null)

  useEffect(() => {
    getSongSheetDetail(id as string, 60).then((res) => {
      if (res.code === 200) {
        setDetail(res)
        const idsArr = convert(res.playlist.trackIds.map((item) => item.id))
        Promise.all(idsArr.map((ids) => getData(ids)))
          .then((res) => {
            let result: Track[] = []
            res.forEach((item) => (result = [...result, ...item]))
            setSongs(result)
          })
          .catch(() => {
            setSongs([])
          })
      }
    })
  }, [id])

  const convert = (oldArr: number[]) => {
    // 将数组拆分成二维数组
    var newArr = []
    for (var i = 0; i < oldArr.length; i += 500) {
      var chunk = oldArr.slice(i, i + 500)
      newArr.push(chunk)
    }
    return newArr
  }

  const getData = (ids: number[]) => {
    return new Promise((resolve: (value: Track[]) => void) => {
      getSongDetail(ids.join(',')).then((res) => {
        if (res.code === 200) {
          resolve(res.songs)
        }
      })
    })
  }

  useEffect(() => {
    setMenuList([
      {
        label: '歌曲列表',
        element: <SongList songs={songs} />
      },
      {
        label: `评论(${detail?.playlist.commentCount || 0})`,
        element: <Comment />
      },
      {
        label: '收藏者',
        element: <Collectors />
      }
    ])
  }, [songs])

  return (
    <div>
      {detail && (
        <div
          ref={wrapRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 'calc(100vw - 200px)',
            minWidth: '760px',
            height: 'calc(100vh - 60px - 73px)',
            overflow: 'auto'
          }}
        >
          <DetailHeader
            ref={headerRef}
            detail={detail as SongSheetDetailRes}
            changeSongSheet={() => changeSongSheet(id, songs)}
            addPlayList={() => addPlayList(id, songs)}
          ></DetailHeader>

          <Tabs items={menuList} ref={tabsRef}></Tabs>
        </div>
      )}
    </div>
  )
}
export default SongSheet
