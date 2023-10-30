import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import { ForwardedRef } from 'react'

import style from './style.module.css'

import { TabsRef } from 'types/refs'
interface IProps {
  items: string[]
  isActive: number
  setIsAction: (index: number) => void
}
const Tabs = forwardRef((props: IProps, ref: ForwardedRef<TabsRef>) => {
  const { items, isActive, setIsAction } = props
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
              {menu}
            </span>
          )
        })}
      </div>
    </>
  )
})
export default Tabs
