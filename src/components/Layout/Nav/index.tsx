import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import navMenuList from 'routes/navMenuList'
import Icon from 'components/Icon'

import { ReactNode, MouseEvent } from 'react'
import { NavMenuObject } from 'routes/routes'

import style from './style.module.css'

interface IProp {
  currentPath: string
  menu: NavMenuObject
  setMenu: (navMenuList: NavMenuObject[], parentPath: string) => ReactNode
}
interface IState {
  isCollapsible: Boolean
  isHover: Boolean
}

class BaseMenu extends Component<IProp> {
  render() {
    const { currentPath, menu, setMenu } = this.props

    return (
      <Fragment key={currentPath}>
        {/* to传入完整路径 */}
        <NavLink
          to={currentPath}
          className={({ isActive }) =>
            `${style.base} ${isActive ? (menu.meta.child ? style.action_child : style.action) : ''}`
          }
        >
          <div className={style.base_menu}>
            <div className={style.name}>
              {menu.meta.icon && (
                <span style={{ paddingRight: '6px' }}>
                  <Icon type={menu.meta.icon} />
                </span>
              )}
              <span>{menu.name}</span>
            </div>
            <div>
              {menu.meta.iconTwo && (
                <div className={style.iconTwo}>
                  <Icon type={menu.meta.iconTwo} />
                </div>
              )}
            </div>
          </div>
        </NavLink>
        <Fragment>{menu.children && setMenu(menu.children as NavMenuObject[], currentPath)}</Fragment>
      </Fragment>
    )
  }
}

// !不可跳转的路由 如：我的音乐
class DeployableMenu extends Component<IProp, IState> {
  state = {
    isCollapsible: false,
    isHover: false
  }

  /**
   *
   *
   * @memberof DeployableMenu
   */
  changeCollapsible = () => {
    const { isCollapsible } = this.state
    this.setState({ isCollapsible: !isCollapsible })
  }

  changeIsHover = (state: Boolean): void => {
    this.setState({ isHover: state })
  }

  addSongSheet = (e: MouseEvent<HTMLSpanElement>) => {
    console.log(e)
    e.stopPropagation()

    // 添加歌单
  }

  render() {
    const { currentPath, menu, setMenu } = this.props
    const { isCollapsible, isHover } = this.state

    return (
      <Fragment key={currentPath}>
        <div
          className={style.title}
          onClick={this.changeCollapsible}
          onMouseEnter={() => this.changeIsHover(true)}
          onMouseLeave={() => this.changeIsHover(false)}
        >
          <span>
            {menu.name}
            {menu.meta.collapsible && (
              <span>
                {isHover ? (
                  <Icon
                    type={isCollapsible ? 'icon-sanjiao-down' : 'icon-sanjiao-right'}
                    style={{ fontSize: '10px' }}
                  ></Icon>
                ) : (
                  <Icon
                    type={isCollapsible ? 'icon-sanjiao-down-base' : 'icon-sanjiao-right-base'}
                    style={{ fontSize: '10px' }}
                  ></Icon>
                )}
              </span>
            )}
          </span>
          <span style={{ marginRight: '25px', cursor: 'pointer' }}>
            {menu.meta.iconTwo && (
              <span onClick={this.addSongSheet}>
                <Icon type={menu.meta.iconTwo} />
              </span>
            )}
          </span>
        </div>
        {menu.meta.collapsible ? (
          <Fragment>
            {isCollapsible && menu.children && setMenu(menu.children as NavMenuObject[], currentPath)}
          </Fragment>
        ) : (
          <Fragment>{menu.children && setMenu(menu.children as NavMenuObject[], currentPath)}</Fragment>
        )}
      </Fragment>
    )
  }
}

export default class Nav extends Component {
  // *生成左侧导航栏
  setMenu = (navMenuList: NavMenuObject[], parentPath: string = ''): ReactNode => {
    return navMenuList.map((menu: NavMenuObject): ReactNode => {
      // todo当前路由完整路径
      let param = ''
      if (menu.meta.searchValue) {
        param = '/' + Object.values(menu.meta.searchValue).join('/')
      }
      const path = menu.path + param
      const currentPath = parentPath.length > 0 ? parentPath + '/' + path : path
      if (menu.meta.showNav) {
        if (menu.meta.jump) {
          // ?可跳转的路由
          return <BaseMenu key={path} currentPath={currentPath} menu={menu} setMenu={this.setMenu} />
        } else {
          const props = { currentPath, menu, setMenu: this.setMenu }
          return <DeployableMenu key={path} {...props} />
        }
      } else {
        return <Fragment key={currentPath}></Fragment>
      }
    })
  }
  render() {
    return <div className={style.nav}>{this.setMenu(navMenuList)}</div>
  }
}
