import { createSlice } from '@reduxjs/toolkit'

interface IAction {
  type: string
  payload: string
}

const initialState: string = ''

// 创建一个 Slice
export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    setToken: (state, action: IAction) => {
      const { type, payload } = action
      return payload
    },
    resetToken: (state, action: IAction) => {
      return initialState
    }
  }
})
// 导出加减的方法
export const { setToken, resetToken } = tokenSlice.actions

// 默认导出
export default tokenSlice.reducer
