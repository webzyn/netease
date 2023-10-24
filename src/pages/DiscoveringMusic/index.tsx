import React, { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import navMenuList from 'routes/navMenuList'

import { NavMenuObject } from 'routes/routes'

import style from './style.module.css'

export default function DiscoveringMusic() {
  const navigate = useNavigate()
  const [menuList, setMenuList] = useState<NavMenuObject[]>([])

  useEffect(() => {
    const menuList = navMenuList.find((menu) => menu.path === 'discoveringMusic' && menu.children)!.children
    setMenuList(menuList as NavMenuObject[])
    navigate('personalized') // 跳转到personalized
  }, [])
  return (
    <div style={{ height: '100%' }}>
      <div className={style.nav}>
        {menuList.map((menu) => {
          return (
            <NavLink
              to={menu.path}
              key={menu.path}
              className={({ isActive }) => (isActive ? style.current : style.base)}
            >
              {menu.name}
            </NavLink>
          )
        })}
      </div>
      <div className={style.root_wrap}>
        <div className={style.root}>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}
