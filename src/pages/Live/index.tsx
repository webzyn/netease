import React, { Component } from 'react'
// 引入相关的hooks
import { useSelector, useDispatch } from 'react-redux'
// 引入对应的方法
import { increment, decrement } from 'store/festures/counter'

export default function Live() {
  // 通过useSelector直接拿到store中定义的value
  const { value } = useSelector((store: any) => store.counter)
  // 通过useDispatch 派发事件
  const dispatch = useDispatch()
  const add = () => {
    dispatch(increment())
  }
  return (
    <div>
      <p>{value}</p>
      <button onClick={add}>加</button>
      <button
        onClick={() => {
          dispatch(decrement())
        }}
      >
        减
      </button>
    </div>
  )
}
