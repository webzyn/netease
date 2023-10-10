import React, { Component } from 'react'
import { LeftOutlined, RightOutlined, SearchOutlined, UserOutlined, CaretDownOutlined } from '@ant-design/icons'
import { ConfigProvider, Input } from 'antd'

import Icon from 'components/Icon'
import Login from 'components/Login'

import store from 'store'

import { LoginRef } from 'types/refs'

import style from './style.module.css'

class HeaderLeft extends Component {
  render() {
    return (
      <div className={style.logo_wrapper}>
        <Icon type='icon-wangyiyunyinlelogo' className={style.logo} style={{ fontSize: '180px' }}></Icon>
      </div>
    )
  }
}

// *Left组件
class Left extends Component {
  render() {
    return (
      <div className={style.contnet_left}>
        <div className={style.circle}>
          <LeftOutlined style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }} />
        </div>
        <div className={style.circle}>
          <RightOutlined style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }} />
        </div>
        {/* 局部主题配置 */}
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: 'transparent',
              colorBorder: 'transparent',
              borderRadius: 16,
              colorTextPlaceholder: '#ED9999',
              colorText: '#ffffff',
              fontSize: 12
            },
            components: {
              Input: {
                hoverBorderColor: 'transparent',
                activeBorderColor: 'transparent',
                controlOutline: 'transparent'
              }
            }
          }}
        >
          <Input
            className={style.searchInput}
            placeholder='林俊杰'
            bordered={false}
            prefix={<SearchOutlined style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }} />}
          />
        </ConfigProvider>
        <div className={style.bigCircle}>
          <Icon type='icon-huatong' style={{ color: 'red' }}></Icon>
        </div>
      </div>
    )
  }
}

// !Right组件
interface RightIsHover {
  user: Boolean
  theme: Boolean
  setting: Boolean
  letter: Boolean
}
interface RightState {
  isHover: RightIsHover
}

class Right extends Component<any, RightState> {
  LoginRef = React.createRef<LoginRef>()

  state = {
    isHover: {
      user: false,
      theme: false,
      setting: false,
      letter: false
    }
  }

  setHover = (state: Boolean, type: string) => {
    const { isHover } = this.state
    const newIsHover: RightIsHover = { ...isHover, [type]: state }

    this.setState({
      isHover: newIsHover
    })
  }

  login = () => {
    this.LoginRef.current!.showModal()
  }

  render() {
    const { isHover } = this.state
    return (
      <div className={style.contnet_right}>
        <div className={style.bigCircle}>
          {store.getState().user.isLogin ? (
            <img src={store.getState().user.avatarUrl} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
          ) : (
            <UserOutlined style={{ color: '#fff', fontSize: '20px' }} />
          )}
        </div>
        <div
          className={isHover.user ? style.user_hover : style.user}
          onMouseEnter={() => this.setHover(true, 'user')}
          onMouseLeave={() => this.setHover(false, 'user')}
          onClick={this.login}
        >
          <span>{store.getState().user.nickname}</span>
          <CaretDownOutlined style={{ margin: '0 6px' }} />
        </div>
        <div onMouseEnter={() => this.setHover(true, 'theme')} onMouseLeave={() => this.setHover(false, 'theme')}>
          <Icon
            type={isHover.theme ? 'icon-yifu-hover' : 'icon-yifu'}
            className={style.icon}
            style={{ fontSize: '20px' }}
          ></Icon>
        </div>
        <div onMouseEnter={() => this.setHover(true, 'setting')} onMouseLeave={() => this.setHover(false, 'setting')}>
          <Icon
            type={isHover.setting ? 'icon-shezhi-hover' : 'icon-shezhi'}
            className={style.icon}
            style={{ fontSize: '16px' }}
          ></Icon>
        </div>
        <div onMouseEnter={() => this.setHover(true, 'letter')} onMouseLeave={() => this.setHover(false, 'letter')}>
          <Icon
            type={isHover.letter ? 'icon-xin-hover' : 'icon-xin'}
            className={style.icon}
            style={{ fontSize: '26px', margin: '0 25px 0 20px' }}
          ></Icon>
        </div>
        {/* // ! 类式组件使用ref */}
        <Login ref={this.LoginRef} />
      </div>
    )
  }
}

export default class Header extends Component {
  render() {
    return (
      <div className={style.header}>
        <HeaderLeft />
        <div className={style.content}>
          <Left />
          <Right />
        </div>
      </div>
    )
  }
}
