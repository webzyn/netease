import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getAlbum, getAlbumDetailDynamic } from 'request/withOutLoginApi'
import { albumSub } from 'request/withLoginApi'

import { converUnits } from 'utils/utils'
import dayjs from 'utils/dayjs'
import usePlayer from 'utils/hooks/usePlayer'

import { Button, message } from 'antd'
import {
  CaretRightOutlined,
  PlusOutlined,
  ShareAltOutlined,
  CloudDownloadOutlined,
  FolderAddOutlined,
  FolderOutlined
} from '@ant-design/icons'

import style from './style.module.css'

import { Album, Track } from 'types'
import { AlbumDetailDynamicRes } from 'request/types/singleApi'

export default function DetailHeader() {
  const { changeSongSheet, addPlayList } = usePlayer()
  const { id } = useParams()
  const [album, setAlbum] = useState<Album>()
  const [dynamic, setDynamic] = useState<AlbumDetailDynamicRes>()
  const [songs, setSongs] = useState<Track[]>()

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    getAlbum(id as string).then((res) => {
      if (res.code === 200) {
        setAlbum(res.album)
        setSongs(res.songs)
      }
    })
    getDynamic()
  }

  const getDynamic = () => {
    getAlbumDetailDynamic(id as string).then((res) => {
      if (res.code === 200) {
        setDynamic(res)
      }
    })
  }

  const collect = () => {
    let type = 1
    if (dynamic?.isSub) {
      type = 0
    }
    albumSub(id as string, type).then((res) => {
      if (res.code) {
        message.success(dynamic?.isSub ? '专辑取消收藏成功' : '收藏成功')
        getDynamic()
      }
    })
  }
  const share = () => {
    alert('分享')
  }
  const downAll = () => {
    alert('下载全部')
  }

  return (
    <div className={style.root}>
      <div className={style.img}>
        <img src={album?.picUrl} alt='' className={style.img} />
      </div>
      <div className={style.main}>
        <div className={style.title}>
          <span className={style.type}>专辑</span>
          <span className={style.name}>{album?.name}</span>
        </div>

        <div className={style.action} style={{ marginTop: '40px' }}>
          <span className={style.compose}>
            <Button type='primary' className={style.left} onClick={() => changeSongSheet(id, songs)}>
              <CaretRightOutlined style={{ fontSize: '18px' }} />
              <span style={{ marginLeft: '0px' }}>播放全部</span>
            </Button>
            <Button type='primary' className={style.right} onClick={addPlayList}>
              <PlusOutlined style={{ fontSize: '18px' }} />
            </Button>
          </span>
          <Button className={style.second} onClick={collect}>
            {dynamic?.isSub ? (
              <FolderOutlined style={{ fontSize: '18px' }} />
            ) : (
              <FolderAddOutlined style={{ fontSize: '18px' }} />
            )}
            {dynamic?.isSub ? '已' : ''}收藏({dynamic ? converUnits(dynamic!.subCount) : 0})
          </Button>
          <Button className={style.second} onClick={downAll}>
            <CloudDownloadOutlined style={{ fontSize: '18px' }} />
            下载全部
          </Button>
          <Button className={style.second} onClick={share}>
            <ShareAltOutlined style={{ fontSize: '18px' }} />
            分享({dynamic ? converUnits(dynamic!.shareCount) : 0})
          </Button>
        </div>

        {album && album.artists.length > 0 && (
          <div className={style.singer}>
            <span>歌手 : </span>
            {album.artists.map((item, i, arr) => (
              <span key={i}>
                <span className={style.link}>{item.name}</span>
                {i === arr.length - 1 ? <></> : <span className={style.text_second}>/</span>}
              </span>
            ))}
          </div>
        )}

        {album && album!.publishTime && (
          <div className={style.time}>
            <span>时间 : </span>
            <span className={style.text_second}>{dayjs(album!.publishTime).format('YYYY-MM-DD')}</span>
          </div>
        )}
      </div>
    </div>
  )
}
