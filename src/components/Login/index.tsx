import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, ConfigProvider } from 'antd'

import { get } from 'request'

import QrcodeLogin from './QrcodeLogin'
import PhoneLogin from './PhoneLogin'

import { ForwardedRef } from 'react'
import { LoginRef, QrcodeLoginRef, PhoneLoginRef } from 'types/refs'

import style from './style.module.css'

import { useDispatch } from 'react-redux/es/exports'
import { setSongSheetList, resetSongSheetList } from 'store/festures/songSheetList'

import { SongSheetList } from 'types/api'
interface Result {
  code: number
  more: Boolean
  playlist: SongSheetList
  version: string
}
const Login = forwardRef((props, ref: ForwardedRef<LoginRef>) => {
  // state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalFlag, setModalFlag] = useState<1 | 2 | 3>(1)
  // refs
  const QrcodeLoginRef = React.useRef<QrcodeLoginRef | null>(null)
  const PhoneLoginRef = React.useRef<PhoneLoginRef | null>(null)
  const dispatch = useDispatch()

  useImperativeHandle(ref, () => {
    return {
      showModal
    }
  })

  const setIsModalOpenState = (flag: React.SetStateAction<boolean>) => {
    setIsModalOpen(flag)
  }

  const setModalState = (state: 1 | 2 | 3) => {
    setModalFlag(state)
  }

  const showModal = async () => {
    QrcodeLoginRef.current && QrcodeLoginRef.current!.qrcodeLogin()
    setModalFlag(1)
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    modalFlag === 1 && QrcodeLoginRef.current!.closeCheckQrTimer()
    modalFlag === 2 && PhoneLoginRef.current!.setIsShow(false)
    setIsModalOpen(false)
  }

  // 加载歌单
  const reload = async (id: number | undefined) => {
    if (id) {
      const res: Result = (await get('/user/playlist', { uid: id })) as Result
      if (res.code === 200 && res.playlist) {
        dispatch(setSongSheetList(res.playlist))
        window.location.reload()
      }
    } else {
      dispatch(resetSongSheetList())
      window.location.reload()
    }
  }

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              borderRadiusLG: 0,
              paddingMD: 0,
              paddingSM: 0
            }
          },
          token: {}
        }}
      >
        <Modal
          centered
          open={isModalOpen}
          mask={false}
          maskClosable={false}
          footer={null}
          width={350}
          bodyStyle={{ height: '530px' }}
          onCancel={() => handleCancel()}
        >
          {modalFlag === 1 && (
            <QrcodeLogin
              ref={QrcodeLoginRef}
              setModalState={setModalState}
              setIsModalOpenState={setIsModalOpenState}
              reload={reload}
            />
          )}
          {modalFlag === 2 && (
            <PhoneLogin
              ref={PhoneLoginRef}
              setModalFlag={setModalFlag}
              setIsModalOpenState={setIsModalOpenState}
              reload={reload}
            />
          )}
        </Modal>
      </ConfigProvider>
    </div>
  )
})

export default Login
