import { Howl, Howler } from 'howler'
import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { setCurrentIndex, setPrevCurrentIndex, setVolumn, setMute, setDuration } from 'store/festures/playList'
import { PLAY_MODE } from 'constants/enums'

import { getSongUrlv1 } from 'request/withOutLoginApi'

import { Store } from 'store/types'

type UseHowlerReturnType = [
  id: number | undefined,
  playing: boolean,
  play: () => void,
  next: () => void,
  prev: () => void,
  assign: (index: number) => void,
  mute: boolean,
  _setMute: () => void,
  volume: number,
  setVolume: (volume: number) => void,
  // rate: (rate: number) => void,
  seek: number,
  getSeek: () => number,
  setSeek: (seek: number, id: number) => void,
  // loop: () => void,
  duration: () => number,
  manualPlay: () => void
  // unload: () => void
]

// 只要您在自定义 Hook 函数内部使用了 useSelector 来获取 store 中的状态
// 当这些状态发生变化时，Hook 函数会被重新执行
export default function useHowler(): UseHowlerReturnType {
  const playList = useSelector((store: Store) => store.playList)
  const dispatch = useDispatch()

  const songs = playList.songs // 歌曲对象列表(不包含url)
  const currentTrackIndex = playList.currentIndex // 当前播放的歌曲索引
  const mode = playList.mode
  const history = playList.history

  const [howl, setHowl] = useState<Howl | null>(null)
  const [id, setId] = useState<number | undefined>()
  const [autoPlay, setAutoPlay] = useState(false) // 是否开启自动播放，首次加载不需要自动播放，点击播放、上、下一首后 实例 开启自动播放

  const [flag, setFlag] = useState<boolean>(false) // 用于单曲循环重新生成howl实例(值无其他意义)

  // ! 解决bug 播放列表为空时，添加歌曲并播放时无法播放
  useEffect(() => {
    setAutoPlay(true)
  }, [playList.id])

  useEffect(() => {
    unload()
    if (currentTrackIndex > -1 && songs && songs.length > 0 && currentTrackIndex < songs.length) {
      const id = songs[currentTrackIndex].id
      // 获取歌曲url
      getSongUrlv1(id, 'hires').then((res) => {
        if (res.code === 200) {
          if (!res.data[0].url) {
            alert('资源无法播放，下一首')
            return next()
          }
          createHowl(res.data[0].url)
          dispatch(setDuration(res.data[0].time))
        }
      })
    }

    return () => {
      unload()
    }
  }, [currentTrackIndex, flag, playList.id])

  useEffect(() => {
    // 重新绑定，刷新end函数中的 mode
    if (howl) {
      // 解绑旧的 onend 事件处理函数
      howl.off('end')
      // 绑定新的 onend 事件处理函数
      howl.on('end', end)
    }
  }, [mode])

  const createHowl = (src: string) => {
    const howl = new Howl({
      src,
      html5: true,
      volume: playList.volumn,
      onplay: (id) => {
        // 防止播放进度永远为0
        setId(id)
      },
      onend: end,
      autoplay: autoPlay
    })
    setHowl(howl)
    // 将playing设为true，下次实例自动播放
    setAutoPlay(true)
  }

  let end = () => {
    let nextIndex: number = currentTrackIndex + 1
    switch (mode) {
      case PLAY_MODE.SEQUENCE_MODE:
        if (currentTrackIndex + 1 < songs.length) {
          // 如果还有下一个声音
          nextIndex = currentTrackIndex + 1
        } else {
          nextIndex = -1
        }
        break
      case PLAY_MODE.LOOP_MODE:
        if (currentTrackIndex + 1 < songs.length) {
          // 如果还有下一个声音
          nextIndex = currentTrackIndex + 1
        } else {
          // 如果已经播放完整个播放列表，将索引重置为 0
          nextIndex = 0
        }
        break
      case PLAY_MODE.SINGLE_LOOP_MODE:
        nextIndex = currentTrackIndex
        break
      case PLAY_MODE.RANDOM_MODE:
        nextIndex = nextRandomIndex()
        break
    }
    dispatch(setCurrentIndex(nextIndex))
    if (mode === PLAY_MODE.SINGLE_LOOP_MODE) {
      // 单曲循环-- currentTrackIndex未改变，useEffect无法重新执行
      setFlag(!flag)
    }
  }

  // 生成未播放过的songs的索引数组
  const createOtherIndexArr = () => {
    // 生成songs的全部索引数组
    let songsIndexArray = Array.from({ length: songs.length }, (_, index) => index)
    // 未播放过的songs的索引数组
    return songsIndexArray.filter((number) => !history.includes(number))
  }

  // 生成未播放的songs的索引
  const createOtherIndex = (otherIndexArr: number[]) => {
    // 生成otherIndexArr的随机索引
    const randomOtherIndex = Math.floor(Math.random() * otherIndexArr.length)
    // 拿出otherIndexArr的值，即未播放的索引
    return otherIndexArr[randomOtherIndex]
  }

  const nextRandomIndex = () => {
    // 历史记录中最后一条
    if (currentTrackIndex === history[history.length - 1]) {
      // 生成未播放过的songs的索引数组
      let otherIndexArr = createOtherIndexArr()
      // 全部播放过，从历史记录开始读取
      if (otherIndexArr.length === 0) {
        return history[0]
      } else {
        // 生成未播放的songs的索引
        return createOtherIndex(otherIndexArr)
      }
    } else {
      // 历史记录中的下一条
      return history[history.indexOf(currentTrackIndex) + 1]
    }
  }

  const prevRandomIndex = () => {
    // 历史记录第一条
    if (currentTrackIndex === history[0]) {
      // 生成未播放过的songs的索引数组
      let otherIndexArr = createOtherIndexArr()
      // 全部播放过，从历史记录读取
      if (otherIndexArr.length === 0) {
        return history[history.length - 1]
      } else {
        // 生成未播放的songs的索引
        return createOtherIndex(otherIndexArr)
      }
    } else {
      // 历史记录中的上一条
      return history[history.indexOf(currentTrackIndex) - 1]
    }
  }

  const next = () => {
    let nextIndex
    if (mode === PLAY_MODE.RANDOM_MODE) {
      nextIndex = nextRandomIndex()
    } else {
      if (currentTrackIndex + 1 < songs.length) {
        nextIndex = currentTrackIndex + 1
      } else {
        nextIndex = 0
      }
    }
    dispatch(setCurrentIndex(nextIndex))
  }

  const prev = () => {
    let nextIndex
    if (mode === PLAY_MODE.RANDOM_MODE) {
      nextIndex = prevRandomIndex()
    } else {
      if (currentTrackIndex - 1 >= 0) {
        nextIndex = currentTrackIndex - 1
      } else {
        nextIndex = songs.length - 1
      }
    }
    dispatch(setPrevCurrentIndex(nextIndex))
  }

  // 播放指定歌曲
  const assign = (index: number) => {
    dispatch(setCurrentIndex(index))
  }

  const playing = howl ? howl.playing() : false

  // 播放、暂停
  const play = () => {
    if (!howl) {
      setAutoPlay(true)
      dispatch(setCurrentIndex(0))
    } else {
      // 判断当前是否正在播放
      if (howl.playing()) {
        howl.pause()
      } else {
        howl.play()
      }
    }
  }

  const mute = playList.mute

  // 静音、取消静音
  const _setMute = () => {
    howl!.mute(!howl!.mute())
    dispatch(setMute(howl!.mute()))
  }

  // 设置音量 0-1
  const setVolume = (volume: number) => {
    if (volume === 0) {
      howl!.mute(true)
    } else {
      howl!.mute(false)
    }
    howl!.volume(volume)
    dispatch(setVolumn(volume))
    dispatch(setMute(howl!.mute()))
  }

  const volume = playList.volumn

  // 设置速率 0.5-4.0
  const rate = (rate: number) => {
    howl!.rate(rate)
  }

  // 设置播放位置 seek:单位秒
  // const seek = (seek: number | undefined) => {
  //   if (typeof seek === 'number') {
  //     howl!.seek(seek)
  //   } else {
  //     return howl?.seek()
  //   }
  // }
  const seek: number = howl ? (howl!.seek() as number) : 0

  const getSeek = () => {
    return howl ? (howl!.seek() as number) : 0
  }

  const setSeek = (seek: number, id: number) => {
    howl!.seek(seek, id)
  }

  // 设置循环
  const loop = () => {
    howl!.loop(!howl!.loop())
  }

  // 获取音频源的持续时间（以秒为单位）
  const duration = () => {
    if (howl) {
      return howl!.duration()
    } else {
      return 0
    }
  }

  // 卸载并销毁 Howl 对象
  const unload = () => {
    Howler.unload()
    setHowl(null)
  }

  // 播放歌曲索引、歌单id改变时能自动播放，其他情况可以调用该接口手动播放
  const manualPlay = () => {
    howl && !howl.playing() && howl!.play()
  }

  return [
    id,
    playing,
    play,
    next,
    prev,
    assign,
    mute,
    _setMute,
    volume,
    setVolume,
    seek,
    getSeek,
    setSeek,
    duration,
    manualPlay
  ]
}
