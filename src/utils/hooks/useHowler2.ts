// import { Howl, Howler } from 'howler'
// import { useEffect, useState } from 'react'

// import { useSelector } from 'react-redux/es/hooks/useSelector'
// import { useDispatch } from 'react-redux'
// import { setCurrentIndex, setPlayList } from 'store/festures/playList'

// import { Store, PlayList } from 'store/types'
// type UseHowlerReturnType = [
//   play: () => void,
//   mute: () => void,
//   volume: (volume: number) => void,
//   rate: (rate: number) => void,
//   seek: (seek: number) => void,
//   loop: () => void,
//   duration: () => number,
//   unload: () => void,
//   next: () => void,
//   prev: () => void
//   // setplaylist: (playListObj: PlayList) => void
// ]

// // 只要您在自定义 Hook 函数内部使用了 useSelector 来获取 store 中的状态
// // 当这些状态发生变化时，Hook 函数会被重新执行
// export default function useHowler(): UseHowlerReturnType {
//   const playList = useSelector((store: Store) => store.playList)
//   const dispatch = useDispatch()

//   // const [currentTrackIndex, setCurrentTrackIndex] = useState(playList.currentIndex)
//   // const [playlist] = useState(playList.playList) // 歌曲对象列表
//   // const [howl, setHowl] = useState<Howl | null>(null) // 播放器对象

//   const playlist = playList.playList // 歌曲对象列表
//   let currentTrackIndex = playList.currentIndex // 当前播放的歌曲索引
//   // const autoPlay = playList.autoPlay // 是否自动播放
//   let howl: Howl // 播放器对象

//   const [autoPlay, setAutoPlay] = useState(false) // 是否开启自动播放，首次加载不需要自动播放，点击播放、上、下一首后 实例 开启自动播放

//   // 执行顺序 createHowl -> useEffect -> createHowl -> createHowl
//   useEffect(() => {
//     // 将playing设为true，下次实例自动播放
//     setAutoPlay(true)
//     return () => {
//       howl.stop()
//       Howler.unload()
//     }
//   }, [])
//   console.log('useHowler', currentTrackIndex, autoPlay)

//   const next = () => {
//     // 调用 setCurrentIndex 时会将autoPlay设为true
//     if (currentTrackIndex + 1 < playlist.length) {
//       // 如果还有下一个声音
//       // setCurrent(currentTrackIndex + 1)
//       dispatch(setCurrentIndex(currentTrackIndex + 1))
//     } else {
//       // 如果已经播放完整个播放列表，将索引重置为 0
//       dispatch(setCurrentIndex(0))
//       // setCurrent(0)
//     }

//     // setPlaying(true)

//     // let nextTrack = playlist[currentTrackIndex].url // 下一个声音的src
//     // 创建新的声音实例
//     // createHowl(nextTrack, true)
//   }

//   const createHowl = (src: string) => {
//     // 停止当前声音（如果有的话）
//     // if (howl) {
//     Howler.unload()
//     // }

//     howl = new Howl({
//       src,
//       html5: true,
//       onend: next,
//       autoplay: autoPlay
//     })

//     // setPlaying(true)

//     // autoPlay && howl.play()
//   }

//   // 实例化 播放器实例
//   if (currentTrackIndex > -1) {
//     createHowl(playlist[currentTrackIndex].url)
//   }

//   // 替换播放列表、并将索引改为0, 并播放
//   // const setplaylist = (playListObj: PlayList) => {
//   //   // playListObj : { currentIndex, playList }
//   //   dispatch(setPlayList(playListObj))

//   //   // createHowl(playlist[currentTrackIndex].url, true)
//   // }

//   // const setCurrent = (newCurrent: number) => {
//   //   dispatch(setCurrentIndex(newCurrent))
//   //   // setPlaying(true)
//   // }

//   const prev = () => {
//     if (currentTrackIndex - 1 >= 0) {
//       // setCurrent(currentTrackIndex - 1)
//       dispatch(setCurrentIndex(currentTrackIndex - 1))
//     } else {
//       // setCurrent(playlist.length - 1)
//       dispatch(setCurrentIndex(playlist.length - 1))
//     }
//   }

//   // 播放、暂停
//   const play = () => {
//     // 判断当前是否正在播放
//     if (howl.playing()) {
//       howl.pause()
//     } else {
//       howl.play()
//       // setPlaying(true)
//     }
//   }

//   // 静音
//   const mute = () => {
//     howl!.mute()
//   }

//   // 设置音量 0-1
//   const volume = (volume: number) => {
//     howl!.volume(volume)
//   }

//   // 设置速率 0.5-4.0
//   const rate = (rate: number) => {
//     howl!.rate(rate)
//   }

//   // 设置播放位置 seek:单位秒
//   const seek = (seek: number) => {
//     howl!.seek(seek)
//   }

//   // 设置循环
//   const loop = () => {
//     howl!.loop(howl!.loop() ? false : true)
//   }

//   // 获取音频源的持续时间（以秒为单位）
//   const duration = () => {
//     return howl!.duration()
//   }

//   // 卸载并销毁 Howl 对象
//   const unload = () => {
//     Howler.unload()
//   }

//   return [play, mute, volume, rate, seek, loop, duration, unload, next, prev]
// }

export default 1
