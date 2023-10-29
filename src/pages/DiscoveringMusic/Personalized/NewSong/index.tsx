import React, { useEffect, useState } from 'react'
import { CaretRightOutlined } from '@ant-design/icons'

import usePlayer from 'utils/hooks/usePlayer'
import { getTopSong, getSongDetail } from 'request/withOutLoginApi'

import style from './style.module.css'
import { NewSong, Track } from 'types'
export default function NewSongs() {
  const [newSongs, setNewSongs] = useState<NewSong[]>([])
  // 最新100首音乐
  const [songs, setSongs] = useState<Track[]>([])
  const { playSong } = usePlayer()
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    getTopSong().then((res) => {
      if (res.code === 200) {
        setNewSongs(res.data.slice(0, 12))
        // 所有歌曲
        getSongDetail(res.data.map((item) => item.id).join(',')).then((res) => {
          if (res.code === 200) {
            setSongs(res.songs)
          }
        })
      }
    })
  }

  const toUserDetail = (id: number, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()
    alert('歌手详情' + id)
  }

  return (
    <div className={style.root}>
      {newSongs?.map((item, repertory) => (
        <div key={item.id} className={style.item} onDoubleClick={() => playSong('最新音乐_全部', songs, repertory)}>
          <div className={style.img_wrap}>
            <img className={style.img} src={item.album.picUrl} alt='' />
            <div className={style.circle}>
              <CaretRightOutlined
                style={{
                  fontSize: '16px',
                  color: 'var(--theme-background)'
                }}
              />
            </div>
          </div>
          <div className={style.info}>
            <div className={style.ellipsis}>
              <span className={style.name}>{item.name}</span>
              {item.alias && item.alias.length > 0 && (
                <span style={{ color: '#999' }}>
                  (
                  {item.alias.map((i, index) => (
                    <span key={index}>
                      <span className={style.alias}>{i}</span>
                      {index !== item.alias.length - 1 && <span> / </span>}
                    </span>
                  ))}
                  )
                </span>
              )}
            </div>
            <div className={style.ellipsis}>
              {item.artists.map((i, index) => (
                <span key={index}>
                  <span className={style.artists} onClick={(e) => toUserDetail(i.id, e)}>
                    {i.name}
                  </span>
                  {index !== item.artists.length - 1 && <span style={{ color: '#999' }}> / </span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
