import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'
import style from './style.module.css'

interface IProps {
  children: string
  to?: string
}
export default function Title(props: IProps) {
  const navigate = useNavigate()
  const go = () => {
    if (props.to && props.to !== '') {
      navigate(props.to)
    }
  }
  return (
    <span className={style.root} onClick={go}>
      <span className={style.title}>{props.children}</span>
      {props.to && props.to !== '' && <RightOutlined />}
    </span>
  )
}
