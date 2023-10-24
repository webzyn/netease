import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import dayjs from 'utils/dayjs'
import { converUnits } from 'utils/utils'
import { subscribe } from 'request/withLoginApi'

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

import { DetailHeaderRef } from 'types/refs'
import { SongSheetDetailRes } from 'request/types/singleApi'
interface IProp {
  detail: SongSheetDetailRes
  addPlayList: () => void
  changeSongSheet: () => void
}

const DetailHeader = React.forwardRef((props: IProp, ref: React.ForwardedRef<DetailHeaderRef>) => {
  const { id } = useParams()
  const {
    playlist,
    playlist: { creator }
  } = props.detail
  const { addPlayList, changeSongSheet } = props
  const rootRef = React.useRef<HTMLDivElement>()
  const [subscribed, setSubscribed] = useState(playlist.subscribed)
  React.useImperativeHandle(ref, () => {
    return {
      rootDiv: rootRef.current as HTMLDivElement
    }
  })

  const collect = () => {
    let type = 1
    if (subscribed) {
      type = 2
    }
    subscribe(type, id as string).then((res) => {
      if (res.code) {
        message.success(subscribed ? '歌单取消收藏成功' : '收藏成功')
        setSubscribed(!subscribed)
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
    <div className={style.root} ref={rootRef as React.ForwardedRef<HTMLDivElement>}>
      <div className={style.img}>
        <img src={playlist.coverImgUrl} alt='' className={style.img} />
      </div>
      <div className={style.main}>
        <div className={style.name}>{playlist.name}</div>
        <div className={style.user}>
          <div className={style.avatarUrl}>
            <img src={creator.avatarUrl} alt='' className={style.avatarUrl} />
          </div>
          <span className={style.nickname}>{creator.nickname}</span>
          <span>{dayjs(playlist.createTime).format('YYYY-MM-DD')}创建</span>
        </div>

        <div className={style.action}>
          <span className={style.compose}>
            <Button type='primary' className={style.left} onClick={changeSongSheet}>
              <CaretRightOutlined style={{ fontSize: '18px' }} />
              <span style={{ marginLeft: '0px' }}>播放全部</span>
            </Button>
            <Button type='primary' className={style.right} onClick={addPlayList}>
              <PlusOutlined style={{ fontSize: '18px' }} />
            </Button>
          </span>
          <Button
            className={style.second}
            disabled={playlist.trialMode === 10 || playlist.trialMode === 11}
            onClick={collect}
          >
            {subscribed ? (
              <FolderOutlined style={{ fontSize: '18px' }} />
            ) : (
              <FolderAddOutlined style={{ fontSize: '18px' }} />
            )}
            {subscribed ? '已' : ''}收藏({converUnits(playlist.subscribedCount)})
          </Button>
          <Button className={style.second} onClick={share}>
            <ShareAltOutlined style={{ fontSize: '18px' }} />
            分享({converUnits(playlist.shareCount)})
          </Button>
          <Button className={style.second} onClick={downAll}>
            <CloudDownloadOutlined style={{ fontSize: '18px' }} />
            下载全部
          </Button>
        </div>

        {playlist.trialMode !== 10 && playlist.tags && playlist.tags.length > 0 ? (
          <div className={style.tags}>
            标签 :{' '}
            {playlist.tags.map((item, i, arr) => (
              <span key={i}>
                <span className={style.link}>{item}</span>
                {i === arr.length - 1 ? <></> : <span className={style.text_second}>/</span>}
              </span>
            ))}
          </div>
        ) : playlist.trialMode === 11 ? (
          <div className={style.tags}>
            标签 : <span className={style.link}>添加标签</span>
          </div>
        ) : (
          <></>
        )}
        <div className={style.count}>
          <span>
            歌曲 : <span className={style.text_second}>{playlist.trackCount}</span>
          </span>
          <span style={{ marginLeft: '12px' }}>
            播放 : <span className={style.text_second}>{converUnits(playlist.playCount)}</span>
          </span>
        </div>
        {playlist.trialMode !== 10 && playlist.description ? (
          <div className={style.description}>
            <span>简介 : </span>
            {playlist.description && (
              <span
                className={style.text_second}
                dangerouslySetInnerHTML={{ __html: playlist.description.replace(/\n/g, '<br>') }}
              ></span>
            )}
          </div>
        ) : playlist.trialMode === 11 ? (
          <div className={style.description}>
            <span>简介 : </span>
            <span className={style.link}>添加简介</span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
})

export default DetailHeader
