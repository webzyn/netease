import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { QRCode } from 'antd'
import { post, get } from 'request'

import Icon from 'components/Icon'

import { QrcodeStatusEnum } from 'constants/enums'

import { ForwardedRef } from 'react'
import { QrcodeLoginRef } from 'types/refs'
import { Qrcode, Create, Check, QrcodeStatus } from './types'

import { useDispatch } from 'react-redux/es/exports'
import { setCookie } from 'store/festures/cookie'
import { setUser } from 'store/festures/user'

import style from './style.module.css'

interface IProps {
  setModalState: (state: 1 | 2 | 3) => void
  setIsModalOpenState: (flag: React.SetStateAction<boolean>) => void
  reload: (id: number) => void
}
const QrcodeLogin = forwardRef((props: IProps, ref: ForwardedRef<QrcodeLoginRef>) => {
  const [qrcode, setQrcode] = React.useState('https://ant.design/')
  const [QrcodeStatus, setQrcodeStatus] = useState<QrcodeStatus>(QrcodeStatusEnum.active) //二维码状态
  let [checkQrTimer, setCheckOrTimer] = useState<NodeJS.Timer | null>(null)
  const [isCanCode, setIsCanCode] = useState(false) // 是否扫码成功
  const dispatch = useDispatch()

  useImperativeHandle(ref, () => {
    return {
      closeCheckQrTimer,
      qrcodeLogin
    }
  })

  useEffect(() => {
    qrcodeLogin()
  }, [])

  const refreshQrcode = async () => {
    setQrcodeStatus(QrcodeStatusEnum.loading)
    await qrcodeLogin()
  }

  const closeCheckQrTimer = (id = checkQrTimer) => {
    clearInterval(id as NodeJS.Timer)
    setCheckOrTimer(null)
  }

  const checkphoneLogin = () => {
    props.setModalState(2)
    closeCheckQrTimer()
  }

  const qrcodeLogin = async () => {
    setIsCanCode(false)
    dispatch(setCookie(''))
    // 获取key
    const res: Qrcode = (await get('/login/qr/key')) as Qrcode
    if (res.code === 200 && res.data.code === 200) {
      const unikey = res.data.unikey
      // 创建二维码
      const res2: Create = (await get('/login/qr/create', {
        key: unikey
      })) as Create
      if (res2.code === 200) {
        setQrcode(res2.data.qrurl)
        setQrcodeStatus(QrcodeStatusEnum.active)
        const timer = setInterval(async () => {
          // 轮询检测扫码状态
          const statusRes = (await get('/login/qr/check', {
            key: unikey
          })) as Check
          if (statusRes.code !== 803) {
            switch (statusRes.code) {
              case 800:
                // 二维码过期
                setQrcodeStatus(QrcodeStatusEnum.expired)
                closeCheckQrTimer(timer)
                break
              case 801:
                // 等待
                break
              case 802:
                // 待確認
                setIsCanCode(true)
                break
              default:
                break
            }
          } else {
            // 登陸成功
            const cookie = statusRes.cookie

            closeCheckQrTimer(timer)
            props.setIsModalOpenState(false)
            get('/login/status').then(async (statusRes: any) => {
              const { userId: id, nickname, avatarUrl } = statusRes.data.profile
              dispatch(setUser({ id, nickname, avatarUrl }))
              dispatch(setCookie(cookie))
              props.reload(id)
            })
          }
        }, 1000)
        setCheckOrTimer(timer)
      }
    }
  }

  return (
    <div className={style.login_qrcode}>
      <div className={style.title}>扫码登录</div>
      {isCanCode ? (
        <div style={{ textAlign: 'center' }}>
          <Icon type='icon-shoujiqueren' style={{ fontSize: '90px' }}></Icon>
          <div style={{ color: '#666', marginTop: '10px' }}>扫描成功</div>
          <div style={{ margin: '30px 0 0 10px' }}>请在手机上确认登录</div>
        </div>
      ) : (
        <>
          <QRCode
            value={qrcode || '-'}
            errorLevel='H'
            size={180}
            bordered={false}
            status={QrcodeStatus}
            onRefresh={refreshQrcode}
          />
          <div className={style.descriptive}>
            使用
            <a style={{ color: '#0c73c2' }} onClick={() => window.open('https://music.163.com/#/download')}>
              网易云音乐APP
            </a>
            扫码登录
          </div>
          <div className={style.other} onClick={checkphoneLogin}>
            {'选择其他登录模式 >'}
          </div>
        </>
      )}
    </div>
  )
})

export default QrcodeLogin
