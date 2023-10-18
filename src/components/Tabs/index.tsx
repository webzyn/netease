import React, { ReactNode, useState, forwardRef, useRef, useImperativeHandle } from 'react'
import { ForwardedRef } from 'react'

import style from './style.module.css'

import { TabsRef } from 'types/refs'
interface Menu {
  label: string
  element: ReactNode
}
interface IProps {
  items: Menu[]
}
const Tabs = forwardRef((props: IProps, ref: ForwardedRef<TabsRef>) => {
  const { items } = props
  const [isActive, setIsAction] = useState(0)
  const tabsRef = useRef<HTMLDivElement>()

  useImperativeHandle(ref, () => {
    return {
      tabsDiv: tabsRef.current as HTMLDivElement
    }
  })

  return (
    <>
      <div className={style.tabs} ref={tabsRef as ForwardedRef<HTMLDivElement>}>
        {items.map((menu, index) => {
          return (
            <span
              key={index}
              className={isActive === index ? style.current : style.base}
              onClick={() => setIsAction(index)}
            >
              {menu.label}
            </span>
          )
        })}
      </div>
      <div>{items[isActive].element}</div>
    </>
  )
})
export default Tabs
