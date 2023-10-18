// 正在播放的歌曲列表
import { createSlice } from '@reduxjs/toolkit'
import { PLAY_MODE } from 'constants/enums'

import { PlayList } from 'store/types'
import { Track } from 'types'
interface SetSongsAction {
  type: string
  payload: {
    id: number | string
    songs: Track[]
  }
}

interface SetCurrentIndexAction {
  type: string
  payload: number
}

const initialState: PlayList = {
  currentIndex: -1,
  id: -1,
  songs: [],
  mode: PLAY_MODE.SEQUENCE_MODE,
  history: [],
  volumn: 1,
  mute: false,
  duration: 0
}

// 创建一个 Slice
export const playListSlice = createSlice({
  name: 'playListList',
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    setSongs: (state, action: SetSongsAction) => {
      const { type, payload } = action
      // if (state.id === payload.id) {
      //   if (state.currentIndex === 0) {
      //     return state
      //   } else{
      //     return {
      //       ...state,
      //       currentIndex: 0
      //     }
      //   }
      // }else{
      //  return {
      //     ...state,
      //     id: payload.id,
      //     songs: payload.songs
      //   }
      // }
      // return state.id === payload.id
      //   ? state.currentIndex === 0
      //     ? { ...state, history: [0] }
      //     : {
      //         ...state,
      //         currentIndex: 0,
      //         history: [0]
      //       }
      //   : {
      //       ...state,
      //       id: payload.id,
      //       songs: payload.songs,
      //       history: [0]
      //     }
      return state.id === payload.id
        ? { ...state, history: [] }
        : {
            ...state,
            id: payload.id,
            songs: payload.songs,
            history: []
          }
    },
    addSongs: (state, action: SetSongsAction) => {
      if (state.songs.length === 0) {
        return {
          ...state,
          songs: action.payload.songs,
          currentIndex: 0,
          id: action.payload.id
        }
      } else {
        let newSongs = action.payload.songs.filter(
          (item) => state.songs.findIndex((song) => song.id === item.id) === -1
        )
        return {
          ...state,
          songs: [...state.songs, ...newSongs]
        }
      }
    },
    setCurrentIndex: (state, action: SetCurrentIndexAction) => {
      const { type, payload } = action
      if (state.history.some((item) => item === payload)) {
        return {
          ...state,
          currentIndex: payload
        }
      } else {
        return {
          ...state,
          currentIndex: payload,
          history: [...state.history, payload]
        }
      }
    },
    setPrevCurrentIndex: (state, action: SetCurrentIndexAction) => {
      const { type, payload } = action
      if (state.history.some((item) => item === payload)) {
        return {
          ...state,
          currentIndex: payload
        }
      } else {
        return {
          ...state,
          currentIndex: payload,
          history: [payload, ...state.history]
        }
      }
    },
    setVolumn: (state, action) => {
      const { type, payload } = action
      return {
        ...state,
        volumn: payload
      }
    },
    setMute: (state, action) => {
      const { type, payload } = action
      return {
        ...state,
        mute: payload
      }
    },
    setDuration: (state, action) => {
      const { type, payload } = action
      return {
        ...state,
        duration: payload
      }
    },
    // setHistory: (state, action) => {
    //   const { type, payload } = action
    //   if (state.history.some((item) => item === payload)) {
    //     return state
    //   } else {
    //     return {
    //       ...state,
    //       history: [...state.history, payload]
    //     }
    //   }
    // },
    setMode: (state): PlayList => {
      let mode
      switch (state.mode) {
        case PLAY_MODE.SEQUENCE_MODE:
          mode = PLAY_MODE.LOOP_MODE
          break
        case PLAY_MODE.LOOP_MODE:
          mode = PLAY_MODE.SINGLE_LOOP_MODE
          break
        case PLAY_MODE.SINGLE_LOOP_MODE:
          mode = PLAY_MODE.RANDOM_MODE
          break
        case PLAY_MODE.RANDOM_MODE:
          mode = PLAY_MODE.SEQUENCE_MODE
          break
        default:
          mode = PLAY_MODE.SEQUENCE_MODE
          break
      }
      return {
        ...state,
        mode,
        history: [state.currentIndex]
      }
    },
    resetPlayList: (state) => {
      return {
        ...initialState,
        mode: state.mode,
        mute: state.mute,
        volumn: state.volumn
      }
    }
  }
})

export const {
  setSongs,
  addSongs,
  resetPlayList,
  setCurrentIndex,
  setMode,
  setPrevCurrentIndex,
  setVolumn,
  setMute,
  setDuration
} = playListSlice.actions

// 默认导出
export default playListSlice.reducer
