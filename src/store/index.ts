import { configureStore } from '@reduxjs/toolkit'
import userSlice from './festures/user'
import counterSlice from './festures/counter'
import tokenSlice from './festures/token'
import cookieSlice from './festures/cookie'
import songSheetListSlice from './festures/songSheetList'
import playListSlice from './festures/playList'

// 从本地存储中加载之前的状态
const savedUser = localStorage.getItem('user')
const savedToken = localStorage.getItem('token')
const savedCookie = localStorage.getItem('cookie')
const savedSongSheetList = localStorage.getItem('songSheetList')
const savedPlayList = localStorage.getItem('playList')

// configureStore创建一个redux数据
const store = configureStore({
  // 合并多个Slice
  reducer: {
    user: userSlice,
    counter: counterSlice,
    token: tokenSlice,
    cookie: cookieSlice,
    songSheetList: songSheetListSlice,
    playList: playListSlice
  },
  // 从本地存储中加载之前的状态
  preloadedState: {
    user: savedUser ? JSON.parse(savedUser) : undefined,
    token: savedToken || '',
    cookie: savedCookie || '',
    songSheetList: savedSongSheetList ? JSON.parse(savedSongSheetList) : [],
    playList: savedPlayList ? JSON.parse(savedPlayList) : void 0
  }
})

// 状态更新时保存到本地存储
store.subscribe(() => {
  const { user } = store.getState()
  const { token } = store.getState()
  const { cookie } = store.getState()
  const { songSheetList } = store.getState()
  const { playList } = store.getState()
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
  localStorage.setItem('cookie', cookie)
  localStorage.setItem('songSheetList', JSON.stringify(songSheetList))
  localStorage.setItem('playList', JSON.stringify(playList))
})

export default store
