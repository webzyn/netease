import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { Input, Button, Select, QRCode, Tooltip, ConfigProvider, Checkbox, message } from 'antd'
import { CaretDownOutlined, QqCircleFilled, WeiboCircleFilled } from '@ant-design/icons'

import { useDispatch } from 'react-redux/es/exports'
import { setUser } from 'store/festures/user'
import { setCookie } from 'store/festures/cookie'
import { setToken } from 'store/festures/token'

import { get, post } from 'request'
import Icon from 'components/Icon'

import { ForwardedRef } from 'react'
import { CellPhone, Countries, CountryList } from './types'
import { PhoneLoginRef } from 'types/refs'

import style from './style.module.css'

const { Option } = Select
interface IProps {
  setModalFlag: (state: 1 | 2 | 3) => void
  setIsModalOpenState: (flag: React.SetStateAction<boolean>) => void
  reload: (id: number) => void
}
const PhoneLogin = forwardRef((props: IProps, ref: ForwardedRef<PhoneLoginRef>) => {
  // store
  const dispatch = useDispatch()

  const [messageApi, contextHolder] = message.useMessage()

  const [qrcode, setQrcode] = React.useState('https://ant.design/')
  const [phoneSearch, setPhoneSearch] = useState<{
    phone: string
    password?: string
    countrycode?: string
    captcha?: string
  }>({
    phone: '',
    password: '',
    countrycode: '',
    captcha: ''
  })
  const [countryList, setCountryList] = useState<CountryList[]>()
  const [isShow, setIsShow] = useState<boolean>(true)
  const [isAutoLogin, setIsAutoLogin] = useState(false)
  const [checkedTerm, setCheckedTerm] = useState(false)
  const [verify, setVerify] = useState(false) //是否验证码登录
  const [haveVerify, setHaveVerify] = useState(false) //是否到获取验证码登录
  const [countdown, setCountdown] = useState(60) // 倒计时

  useEffect(() => {
    getCountriesCode()
  }, [])

  useImperativeHandle(ref, () => {
    return {
      setIsShow
    }
  })

  const toQrcodeLogin = () => {
    props.setModalFlag(1)
  }

  const getCountriesCode = async () => {
    const res = (await get('/countries/code/list')) as Countries
    if (res.code === 200 && res.data.length > 0) {
      const newCountryList = res.data.reduce((init: CountryList[], country) => {
        country.countryList.forEach((item) => {
          item.label = country.label
        })
        return [...init, ...country.countryList]
      }, [])
      setCountryList(newCountryList)
      getPhoneSearchAsValue(newCountryList[0].code, 'countrycode')
    }
  }

  const getPhoneSearch = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const { value } = e.target
    setPhoneSearch({
      ...phoneSearch,
      [key]: value
    })
  }
  const getPhoneSearchAsValue = (value: string, key: string) => {
    setPhoneSearch({
      ...phoneSearch,
      [key]: value
    })
  }

  const getVerify = async () => {
    const query = {
      phone: phoneSearch.phone,
      ctcode: phoneSearch.countrycode
    }
    const res = (await get('/captcha/sent', query)) as { code: number; data: boolean; message?: string }
    if (res.code === 200 && res.data) {
      setCountdown(60)
      setHaveVerify(true)
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          console.log(prevCountdown)

          if (prevCountdown > 1) {
            return prevCountdown - 1
          } else {
            setHaveVerify(false)
            clearInterval(timer)
            return 0
          }
        })
      }, 1000)
    } else {
      messageApi.open({
        type: 'error',
        content: res.message
      })
    }
  }

  const phoneLogin = async () => {
    if (!checkedTerm)
      return messageApi.open({
        type: 'error',
        content: '请先勾选同意《服务条款》《隐私政策》《儿童隐私政策》'
      })
    const res: CellPhone = (await post('/login/cellphone', phoneSearch)) as CellPhone
    const { userId: id, nickname, avatarUrl } = res.profile
    const { cookie, token } = res
    dispatch(setUser({ id, nickname, avatarUrl }))
    dispatch(setCookie(cookie))
    dispatch(setToken(token))
    props.setIsModalOpenState(false)
    get('/login/status').then(async (statusRes: any) => {
      const { userId: id, nickname, avatarUrl } = statusRes.data.profile
      dispatch(setUser({ id, nickname, avatarUrl }))
      dispatch(setCookie(cookie))
      props.reload(id)
    })
  }

  const selectBefore = (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionFontSize: 10,
            paddingSM: 8
          }
        }
      }}
    >
      <Select
        value={phoneSearch.countrycode}
        style={{ width: '85px' }}
        optionLabelProp='label'
        popupMatchSelectWidth={260}
        suffixIcon={<CaretDownOutlined style={{ pointerEvents: 'none', color: '#999' }} />}
        onChange={(value) => getPhoneSearchAsValue(value, 'countrycode')}
      >
        {countryList?.map((item) => (
          <Option
            value={item.code}
            key={item.code}
            label={
              <span style={{ display: 'inline-block', width: '70px' }}>
                <span style={{ float: 'left', padding: '2px 0 0 3px' }}>
                  <Icon type='icon-phone' />
                </span>
                <span className={style.login_select_code}>+{item.code}</span>
              </span>
            }
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{item.zh}</span>
              <span>+{item.code}</span>
            </div>
          </Option>
        ))}
      </Select>
    </ConfigProvider>
  )

  return (
    <div>
      {contextHolder}
      <ConfigProvider
        theme={{
          components: {
            Tooltip: {
              colorBgElevated: '#999999',
              fontSize: 10,
              lineHeight: 2,
              controlHeight: 26,
              borderRadius: 4,
              sizePopupArrow: 12
            }
          },
          token: {}
        }}
      >
        <Tooltip
          title={<span>扫码登录更安全</span>}
          overlayStyle={{ padding: 0 }}
          placement='right'
          color='#999999'
          trigger='click'
          open={isShow}
          destroyTooltipOnHide={true}
        >
          <div className={style.qrcode} onClick={toQrcodeLogin}>
            <QRCode value={qrcode || '-'} errorLevel='H' size={38} bordered={false} status='active' />
            <div className={style.triangle}></div>
          </div>
        </Tooltip>
      </ConfigProvider>

      <div className={style.main}>
        <div className={style.logo}>
          <Icon type='icon-wangyiyunyinleclick' style={{ fontSize: '56px' }}></Icon>
        </div>
        <div>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  activeBorderColor: '#d9d9d9',
                  hoverBorderColor: '#d9d9d9',
                  activeShadow: '#d9d9d9',
                  controlHeight: 40,
                  colorFillAlter: 'rgba(0, 0, 0, 0)'
                }
              },
              token: {
                colorTextPlaceholder: '#757575'
              }
            }}
          >
            <Input
              value={phoneSearch.phone}
              addonBefore={selectBefore}
              placeholder='请输入手机号'
              className={style.login_input}
              styles={{ input: { borderRadius: '0 6px 0 0' }, affixWrapper: { borderRadius: 0 } }}
              onChange={(e) => getPhoneSearch(e, 'phone')}
            />
            {!verify ? (
              <Input
                value={phoneSearch.password}
                placeholder='请输入密码'
                className={style.login_input}
                type='password'
                prefix={
                  <span style={{ marginRight: '6px' }}>
                    <Icon type='icon-suo' />
                  </span>
                }
                style={{ borderRadius: '0 0 6px 6px', borderTop: 'none' }}
                onChange={(e) => getPhoneSearch(e, 'password')}
              />
            ) : (
              <Input
                value={phoneSearch.captcha}
                placeholder='请输入验证码'
                className={style.login_input_code}
                prefix={
                  <span style={{ marginRight: '6px' }}>
                    <Icon type='icon-yaoshi' />
                  </span>
                }
                addonAfter={
                  !haveVerify ? (
                    <span className={style.getCode} onClick={getVerify}>
                      获取验证码
                    </span>
                  ) : (
                    <span className={style.getCode}>00:{countdown >= 10 ? countdown : '0' + countdown}</span>
                  )
                }
                styles={{
                  affixWrapper: { borderRadius: '0  0 0 6px', borderTop: 'none', borderRight: 'none' }
                }}
                onChange={(e) => getPhoneSearch(e, 'captcha')}
              />
            )}
          </ConfigProvider>
          <div className={style.buttonAreaWrapper}>
            <div className={style.buttonArea}>
              <span className={style.checked}>
                <input
                  type='checkbox'
                  className={style.customCheckbox}
                  id='myCheckbox'
                  checked={isAutoLogin}
                  onChange={() => setIsAutoLogin(!isAutoLogin)}
                />
                <label className={style.customLabel} htmlFor='myCheckbox'>
                  自动登录
                </label>
              </span>
              <span className={style.link}>
                {!verify ? (
                  <>
                    <span>忘记密码</span>
                    <span style={{ color: '#e5e5e5', margin: '0 12px' }}>|</span>
                    <span onClick={() => setVerify(true)}>验证码登录</span>
                  </>
                ) : (
                  <span onClick={() => setVerify(false)}>密码登录</span>
                )}
              </span>
            </div>
          </div>
          <Button type='primary' danger size='large' style={{ width: '260px' }} onClick={phoneLogin}>
            登录
          </Button>
          <div className={style.register}>注册</div>
          <div className={style.icons}>
            <Icon type='icon-weixin' style={{ fontSize: '30px', cursor: 'pointer' }}></Icon>
            <QqCircleFilled style={{ fontSize: '30px', color: '#1991FF', cursor: 'pointer' }} />
            <WeiboCircleFilled style={{ fontSize: '30px', color: '#ED462F', cursor: 'pointer' }} />
            <Icon type='icon-wangyi' style={{ fontSize: '30px', cursor: 'pointer' }}></Icon>
          </div>
          <div className={style.term}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#EC4141',
                  controlInteractiveSize: 13,
                  borderRadiusSM: 3,
                  fontSize: 10,
                  colorText: '#999'
                }
              }}
            >
              <Checkbox checked={checkedTerm} onChange={() => setCheckedTerm(!checkedTerm)}>
                同意
              </Checkbox>
            </ConfigProvider>
            <span className={style.link} onClick={() => window.open('https://st.music.163.com/official-terms/service')}>
              《服务条款》
            </span>
            <span className={style.link} onClick={() => window.open('https://st.music.163.com/official-terms/privacy')}>
              《隐私政策》
            </span>
            <span
              className={style.link}
              onClick={() => window.open('https://st.music.163.com/official-terms/children')}
            >
              《儿童隐私政策》
            </span>
          </div>
        </div>
      </div>
    </div>
  )
})

export default PhoneLogin
