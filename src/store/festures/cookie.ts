import { createSlice } from '@reduxjs/toolkit'

interface IAction {
  type: string
  payload: string
}

const initialState: string = ''

// 创建一个 Slice
export const cookieSlice = createSlice({
  name: 'cookie',
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    setCookie: (state, action: IAction) => {
      const { type, payload } = action
      return payload
    },
    resetCookie: (state, action: IAction) => {
      return initialState
    }
  }
})
// 导出加减的方法
export const { setCookie, resetCookie } = cookieSlice.actions

// 默认导出
export default cookieSlice.reducer
