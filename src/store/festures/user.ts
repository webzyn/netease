import { createSlice } from '@reduxjs/toolkit'

import { User } from '../types'
interface IAction {
  type: string
  payload: {
    id: number
    nickname: string
    avatarUrl: string
  }
}

const initialState: User = {
  id: -1,
  nickname: '未登录',
  isLogin: false,
  avatarUrl: ''
}

// 创建一个 Slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    setUser: (state, action: IAction) => {
      const { type, payload } = action
      return {
        ...state,
        isLogin: true,
        ...payload
      }
    },
    resetUser: () => {
      return initialState
    }
  }
})
// 导出加减的方法
export const { setUser, resetUser } = userSlice.actions

// 默认导出
export default userSlice.reducer
