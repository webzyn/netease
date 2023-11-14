import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PlayCircleOutlined, FolderAddOutlined, CaretRightOutlined } from '@ant-design/icons'

import { converTime } from 'utils/utils'
import { getTopSong, getSongDetail } from 'request/withOutLoginApi'
import usePlayer from 'utils/hooks/usePlayer'
import loadImg from 'utils/loadImg'

import custom from 'assets/styles/custom.module.css'
import style from './style.module.css'

import { Track } from 'types'
export default function Songs() {
  // 全部:0 华语:7 欧美:96 日本:8 韩国:16
  const [type, setType] = useState(0)
  const [songs, setSongs] = useState<Track[]>([])
  const [currentMove, setCurrentMove] = useState(-1)
  const { playSong, addSongAndPlay, changeSongSheet } = usePlayer()

  useEffect(() => {
    getData(type)
  }, [type])

  useEffect(() => {
    loadImg()
  }, [songs])

  const getData = (type: number) => {
    getTopSong(type).then((res) => {
      if (res.code === 200) {
        // 所有歌曲
        getSongDetail(res.data.map((item) => item.id).join(',')).then((res) => {
          if (res.code === 200) {
            setSongs(res.songs)
          }
        })
      }
    })
  }

  const goSinger = (id: number) => {}

  const doubleClick = (index: number) => {
    playSong(`最新音乐_${types.find((item) => item.key === type)?.label}`, songs, index)
  }

  const playAll = () => {
    changeSongSheet(`最新音乐_${types.find((item) => item.key === type)?.label}`, songs)
  }

  const types = [
    { key: 0, label: '全部' },
    { key: 7, label: '华语' },
    { key: 96, label: '欧美' },
    { key: 16, label: '韩国' },
    { key: 8, label: '日本' }
  ]
  return (
    <div className={style.root}>
      <div className={style.title}>
        <div className={style.types}>
          {types.map((item) => (
            <span
              key={item.key}
              className={`${style.type} ${type === item.key ? style.action : ''}`}
              onClick={() => setType(item.key)}
            >
              {item.label}
            </span>
          ))}
        </div>
        <div className={custom.button}>
          <Button type='primary' size='small' onClick={playAll}>
            <PlayCircleOutlined style={{ marginRight: '-6px' }} />
            播放全部
          </Button>
          <Button size='small' style={{ marginLeft: '6px' }}>
            <FolderAddOutlined style={{ fontSize: '12px', marginRight: '-7px' }} />
            收藏全部
          </Button>
        </div>
      </div>
      <>
        {songs.map((song, index) => (
          <div
            className={style.song}
            key={song.id}
            style={{ background: currentMove === index ? '#F2F2F3' : index % 2 === 0 ? '#fafafa' : '#fff' }}
            onMouseEnter={(e) => setCurrentMove(index)}
            onMouseLeave={() => setCurrentMove(-1)}
            onDoubleClick={() => doubleClick(index)}
          >
            <div style={{ color: '#ccc', fontSize: '12px' }}>{index < 9 ? '0' + (index + 1) : index + 1}</div>
            <div className={style.img_wrap} onClick={() => addSongAndPlay(song.id)}>
              <img className={style.img} src='/img/default.jpg' data-src={song.al.picUrl} alt='' />
              <div className={style.circle}>
                <CaretRightOutlined
                  style={{
                    fontSize: '16px',
                    color: 'var(--theme-background)'
                  }}
                />
              </div>
            </div>
            <div className={style.name}>{song.name}</div>
            <div className={style.ars}>
              {song.ar.map((item, i, arr) => (
                <span key={i}>
                  <span className={style.ar} onClick={() => goSinger(item.id)}>
                    {item.name}
                  </span>
                  {i === arr.length - 1 ? (
                    <></>
                  ) : (
                    <span style={{ color: 'var(--text-second-color)', cursor: 'default' }}> / </span>
                  )}
                </span>
              ))}
            </div>
            <div className={style.al_wrap}>
              <span className={style.al}>{song.al.name}</span>
            </div>
            <span className={style.dt}>{converTime(song.dt / 1000)}</span>
          </div>
        ))}
      </>
    </div>
  )
}
