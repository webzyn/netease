import { createSlice } from '@reduxjs/toolkit'

import { SongSheetList } from 'types/api'

interface IAction {
  type: string
  payload: SongSheetList
}

const initialState: SongSheetList = []

// 创建一个 Slice
export const songSheetListSlice = createSlice({
  name: 'songSheetList',
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    setSongSheetList: (state, action: IAction) => {
      const { type, payload } = action
      return payload
    },
    resetSongSheetList: () => {
      return initialState
    }
  }
})
// 导出加减的方法
export const { setSongSheetList, resetSongSheetList } = songSheetListSlice.actions

// 默认导出
export default songSheetListSlice.reducer
