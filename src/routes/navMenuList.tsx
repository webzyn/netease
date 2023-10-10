import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import store from 'store'
import { SongSheetList, SongSheetType } from 'types/api'

import { NavMenuObject } from './routes'

import DiscoveringMusic from 'pages/DiscoveringMusic'
import Personalized from 'pages/DiscoveringMusic/Personalized'
import Podcast from 'pages/Podcast'
import Video from 'pages/Video'
import Attention from 'pages/Attention'
import Live from 'pages/Live'
import PrivateRoaming from 'pages/PrivateRoaming'
// 我的音乐
import FavoriteMusic from 'pages/myMusic/FavoriteMusic'
import LocalAndDownload from 'pages/myMusic/LocalAndDownload'
import RecentlyPlayed from 'pages/myMusic/RecentlyPlayed'
// 歌单
import SongSheet from 'pages/SongSheet'

const Customization = lazy(() => import('pages/DiscoveringMusic/Customization'))
const DiscoveringMusicSongSheet = lazy(() => import('pages/DiscoveringMusic/SongSheet'))
const Rank = lazy(() => import('pages/DiscoveringMusic/Rank'))
const Singer = lazy(() => import('pages/DiscoveringMusic/Singer'))
const LatestMusic = lazy(() => import('pages/DiscoveringMusic/LatestMusic'))

const songSheetList = store.getState().songSheetList
const user = store.getState().user
let foundSongSheet: SongSheetType = { id: '' } as any
let createdPlaylist: NavMenuObject[] = []
let favoritePlaylist: NavMenuObject[] = []
if (user.isLogin) {
  // 我喜欢的音乐歌单
  foundSongSheet = (songSheetList.find(
    (item) => item.specialType === 5 && item.userId === user.id
  ) as SongSheetType) || { id: '' }
  // 创建的歌单
  const createds: SongSheetType[] = songSheetList.reduce((init: SongSheetType[], item) => {
    if (!item.subscribed && item.specialType !== 5) {
      init.push(item)
    }
    return init
  }, [])
  // 收藏的歌单
  const favorites: SongSheetType[] = songSheetList.reduce((init: SongSheetType[], item) => {
    if (item.subscribed && item.userId !== user.id) {
      init.push(item)
    }
    return init
  }, [])
  createdPlaylist = createds.map((item) => ({
    path: 'songSheet',
    name: item.name,
    meta: {
      jump: true,
      showNav: true,
      child: true,
      icon: 'icon-gedan',
      search: '/:id',
      searchValue: {
        id: item.id
      }
    },
    element: <SongSheet />
  }))
  favoritePlaylist = favorites.map((item) => ({
    path: 'songSheet',
    name: item.name,
    meta: {
      jump: true,
      showNav: true,
      child: true,
      icon: 'icon-gedan',
      search: '/:id',
      searchValue: {
        id: item.id
      }
    },
    element: <SongSheet />
  }))
}

const navMenuList: NavMenuObject[] = [
  {
    path: '/',
    name: '首页',
    meta: {
      jump: true,
      showNav: false
    },
    element: <Navigate to='discoveringMusic' />
  },
  {
    path: 'discoveringMusic',
    name: '发现音乐',
    element: <DiscoveringMusic />,
    meta: {
      jump: true,
      showNav: true
    },
    children: [
      {
        path: 'personalized',
        name: '个性推荐',
        meta: {
          jump: true,
          showNav: false
        },
        element: <Personalized />
      },
      {
        path: 'customization',
        name: '专属定制',
        meta: {
          jump: true,
          showNav: false
        },
        element: (
          <Suspense fallback={<>加载中...</>}>
            <Customization />
          </Suspense>
        )
      },
      {
        path: 'songSheet',
        name: '歌单',
        meta: {
          jump: true,
          showNav: false
        },
        element: (
          <Suspense fallback={<>加载中...</>}>
            <DiscoveringMusicSongSheet />
          </Suspense>
        )
      },
      {
        path: 'rank',
        name: '排行榜',
        meta: {
          jump: true,
          showNav: false
        },
        element: (
          <Suspense fallback={<>加载中...</>}>
            <Rank />
          </Suspense>
        )
      },
      {
        path: 'singer',
        name: '歌手',
        meta: {
          jump: true,
          showNav: false
        },
        element: (
          <Suspense fallback={<>加载中...</>}>
            <Singer />
          </Suspense>
        )
      },
      {
        path: 'latestMusic',
        name: '最新音乐',
        meta: {
          jump: true,
          showNav: false
        },
        element: (
          <Suspense fallback={<>加载中...</>}>
            <LatestMusic />
          </Suspense>
        )
      }
    ]
  },
  {
    path: 'podcast',
    name: '播客',
    meta: {
      jump: true,
      showNav: true
    },
    element: <Podcast />
  },
  {
    path: 'video',
    name: '视频',
    meta: {
      jump: true,
      showNav: true
    },
    element: <Video />
  },
  {
    path: 'attention',
    name: '关注',
    meta: {
      jump: true,
      showNav: true
    },
    element: <Attention />
  },
  {
    path: 'live',
    name: '直播',
    meta: {
      jump: true,
      showNav: true
    },
    element: <Live />
  },
  {
    path: 'privateRoaming',
    name: '私人漫游',
    meta: {
      jump: true,
      showNav: true
    },
    element: <PrivateRoaming />
  },
  {
    path: 'myMusic',
    name: '我的音乐',
    meta: {
      jump: false,
      showNav: true
    },
    children: [
      {
        path: 'songSheet',
        name: '我喜欢的音乐',
        meta: {
          jump: true,
          showNav: true,
          child: true,
          icon: 'icon-love',
          iconTwo: 'icon-xindong',
          search: '/:id',
          searchValue: {
            // 注意顺序一致
            id: foundSongSheet.id
          }
        },
        element: <SongSheet />
      },
      {
        path: 'localAndDownload',
        name: '本地与下载',
        meta: {
          jump: true,
          showNav: true,
          child: true,
          icon: 'icon-xiazai'
        },
        element: <LocalAndDownload />
      },
      {
        path: 'recentlyPlayed',
        name: '最近播放',
        meta: {
          jump: true,
          showNav: true,
          child: true,
          icon: 'icon-zuijinbofang'
        },
        element: <RecentlyPlayed />
      }
    ]
  },
  {
    path: 'createdPlaylist',
    name: '创建的歌单',
    meta: {
      jump: false,
      showNav: true,
      iconTwo: 'icon-jia',
      collapsible: true
    },
    children: createdPlaylist
  },
  {
    path: 'favoritePlaylist',
    name: '收藏的歌单',
    meta: {
      jump: false,
      showNav: true,
      collapsible: true
    },
    children: favoritePlaylist
  }
]
export default navMenuList
