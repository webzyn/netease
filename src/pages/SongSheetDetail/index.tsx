import React, { Component, useEffect, useState, useContext, useRef } from 'react'
import { Ref } from 'react'
import PlayerContext from 'context/PlayerContext'
import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux/es/hooks/useSelector'

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
  const [scroll, setScroll] = useState<{ x: number; y: number }>()

  useEffect(() => {
    getSongSheetDetail(id as string, 60).then((res) => {
      if (res.code === 200) {
        setDetail(res)
        let ids = res.playlist.trackIds.map((item) => item.id).join(',')
        getSongDetail(ids).then((res2) => {
          if (res2.code === 200) {
            setSongs(res2.songs)
          }
        })
      }
    })
  }, [id])

  useEffect(() => {
    setMenuList([
      {
        label: '歌曲列表',
        element: <SongList songs={songs} scroll={scroll} />
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
  }, [songs, scroll])

  // useEffect(() => {
  //   if (headerRef.current?.rootDiv && tabsRef.current?.tabsDiv) {
  //     const x = headerRef.current.rootDiv.clientWidth
  //     const wrapHeight = wrapRef.current?.clientHeight
  //     const headerHeight = headerRef.current.rootDiv.clientHeight
  //     const tabsHeight = tabsRef.current.tabsDiv.clientHeight
  //     const y = (wrapHeight as number) - headerHeight - tabsHeight

  //     setScroll({
  //       x: x as number,
  //       y: y - 39
  //     })
  //   }
  // }, [
  //   wrapRef.current?.offsetWidth,
  //   wrapRef.current?.offsetHeight,
  //   headerRef.current?.rootDiv.offsetWidth,
  //   headerRef.current?.rootDiv.offsetHeight,
  //   tabsRef.current?.tabsDiv.offsetWidth,
  //   tabsRef.current?.tabsDiv.offsetHeight
  // ])
  // useEffect(() => {
  //   window.addEventListener('resize', handleWindowResize)
  //   return () => {
  //     window.removeEventListener('resize', handleWindowResize)
  //   }
  // }, [])

  // const handleWindowResize = () => {
  //   console.log('111')

  //   // 处理窗口大小变化事件
  //   if (headerRef.current?.rootDiv && tabsRef.current?.tabsDiv) {
  //     console.log(window.innerWidth)

  //     let x = window.innerWidth - 200
  //     let wrapHeight = wrapRef.current?.clientHeight
  //     let headerHeight = headerRef.current.rootDiv.clientHeight
  //     let tabsHeight = tabsRef.current.tabsDiv.clientHeight
  //     let y = (wrapHeight as number) - headerHeight - tabsHeight
  //     if (window.innerWidth - 200 < 760) {
  //       x = 760
  //     }
  //     setScroll({
  //       x: x as number,
  //       y: y - 39
  //     })
  //     console.log({
  //       x: x as number,
  //       y: y - 39
  //     })
  //   }
  // }

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
