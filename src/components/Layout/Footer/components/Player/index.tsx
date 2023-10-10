import React, { useEffect, useState } from 'react'
import { CaretRightOutlined, PauseOutlined, StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons'
import { Slider, ConfigProvider } from 'antd'
import { SliderMarks } from 'antd/es/slider'
import Icon from 'components/Icon'
import { PLAY_MODE } from 'constants/enums'
// import { throttle } from 'lodash'
import { converTime } from 'utils/utils'
import { useSelector } from 'react-redux/es/hooks/useSelector'

import { Store } from 'store/types'
import style from '../../style.module.css'

type IProp = {
  playing: boolean
  play: () => void
  next: () => void
  prev: () => void
  playMode: string
  changeMode: () => void
  getSeek: () => number
  setSeek: (seek: number, id: number) => void
  duration: number
  id: number | undefined
  disabled: boolean
}

export default function Player(props: IProp) {
  const { playing, play, next, prev, playMode, changeMode, id, disabled } = props

  let [Timer, setTimer] = useState<NodeJS.Timer | null>(null)
  let [silder, setSilder] = useState<number>(Math.ceil(props.getSeek()))

  const playList = useSelector((store: Store) => store.playList)
  const currentTrackIndex = playList.currentIndex // 当前播放的歌曲索引
  // 歌曲时长
  const duration = Math.ceil(playList.duration / 1000)
  // 歌曲总时长
  const maxDuration =
    playList.songs.length > 0 && currentTrackIndex >= 0 ? Math.ceil(playList.songs[currentTrackIndex].dt / 1000) : 0

  useEffect(() => {
    setSilder(Math.ceil(props.getSeek()))
    startTimer()

    return () => {
      stopTimer()
    }
  }, [playing, id])

  const startTimer = () => {
    stopTimer()
    if (playing) {
      // 播放时开启定时器，否则关闭
      const timer = setInterval(() => {
        setSilder(Math.ceil(props.getSeek()))
      }, 1000)
      setTimer(timer)
    }
  }

  const stopTimer = (id = Timer) => {
    clearInterval(id as NodeJS.Timer) // 关闭定时器
    setTimer(null) // 清除定时器 ID
  }

  const silderChange = (value: number) => {
    props.setSeek(value, props.id as number)
  }

  return (
    <div className={style.player}>
      <div className={style.icons}>
        {disabled ? (
          <>
            {playMode === PLAY_MODE.SEQUENCE_MODE ? (
              <span title='顺序播放'>
                <Icon
                  type='icon-shunxubofang-disabled'
                  className={style.icon_disabled}
                  style={{ fontSize: '16px' }}
                ></Icon>
              </span>
            ) : playMode === PLAY_MODE.RANDOM_MODE ? (
              <span title='随机播放'>
                <Icon
                  type='icon-gl-shuffle-disabled'
                  className={style.icon_disabled}
                  style={{ fontSize: '16px' }}
                ></Icon>
              </span>
            ) : playMode === PLAY_MODE.LOOP_MODE ? (
              <span title='循环播放'>
                <Icon type='icon-xunhuan-disabled' className={style.icon_disabled}></Icon>
              </span>
            ) : (
              <span title='单曲循环'>
                <Icon type='icon-danquxunhuan-disabled' className={style.icon_disabled}></Icon>
              </span>
            )}
            <StepBackwardOutlined className={style.icon_disabled} style={{ marginLeft: '30px' }} />

            <div className={style.play_disabled}>
              <CaretRightOutlined
                style={{ fontSize: '24px', color: '#adadad', marginLeft: '2px', cursor: 'default' }}
              />
            </div>

            <StepForwardOutlined className={style.icon_disabled} />
            <Icon
              type='icon-geci-disabled'
              className={style.icon_disabled}
              style={{ fontSize: '14px', marginLeft: '30px' }}
            ></Icon>
          </>
        ) : (
          <>
            {playMode === PLAY_MODE.SEQUENCE_MODE ? (
              <span title='顺序播放' onClick={changeMode}>
                <Icon type='icon-shunxubofang' className={style.icon} style={{ fontSize: '16px' }}></Icon>
              </span>
            ) : playMode === PLAY_MODE.RANDOM_MODE ? (
              <span title='随机播放' onClick={changeMode}>
                <Icon type='icon-gl-shuffle' className={style.icon} style={{ fontSize: '16px' }}></Icon>
              </span>
            ) : playMode === PLAY_MODE.LOOP_MODE ? (
              <span title='循环播放' onClick={changeMode}>
                <Icon type='icon-xunhuan' className={style.icon}></Icon>
              </span>
            ) : (
              <span title='单曲循环' onClick={changeMode}>
                <Icon type='icon-danquxunhuan' className={style.icon}></Icon>
              </span>
            )}
            <StepBackwardOutlined className={style.icon} style={{ marginLeft: '30px' }} onClick={prev} />

            <div className={style.play} onClick={play}>
              {playing ? (
                <PauseOutlined className={style.icon} />
              ) : (
                <CaretRightOutlined className={style.icon} style={{ marginLeft: '2px' }} />
              )}
            </div>

            <StepForwardOutlined className={style.icon} onClick={next} />
            <Icon type='icon-geci' className={style.icon} style={{ fontSize: '14px', marginLeft: '30px' }}></Icon>
          </>
        )}
      </div>
      <div className={style.silder}>
        <span className={style.time}>{converTime(silder)}</span>
        <ConfigProvider
          theme={{
            components: {
              Slider: {
                // 滑块
                handleSize: 4,
                handleLineWidth: 4,
                handleSizeHover: 4,
                handleLineWidthHover: 4,
                handleColor: 'var(--theme-background)',

                handleActiveColor: 'var(--theme-background)',

                // 轨道-未输入
                // railBg: 'var(--theme-background)',
                // railHoverBg: 'var(--theme-background)',
                // 轨道-已输入
                trackBg: 'var(--theme-background)'
                // trackHoverBg: 'var(--theme-background)'
              }
            },
            token: {
              colorPrimary: 'var(--theme-background)',
              colorPrimaryBorderHover: 'var(--theme-background)'
            }
          }}
        >
          <Slider
            disabled={disabled}
            style={{ flex: 1, margin: '4px 5px' }}
            tooltip={{ formatter: null }}
            value={silder}
            min={0}
            max={Math.ceil(maxDuration)}
            onAfterChange={(value) => silderChange(value)}
          />
        </ConfigProvider>
        <span className={style.time}>{converTime(maxDuration)}</span>
      </div>
    </div>
  )
}
