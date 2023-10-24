import React, { useState, useContext, useRef, useEffect } from 'react'
import PlayerContext from 'context/PlayerContext'
import { useParams } from 'react-router-dom'

import { ConfigProvider, Table } from 'antd'
import { HeartOutlined, DownloadOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux/es/hooks/useSelector'

import { converTime } from 'utils/utils'

import style from './style.module.css'

import { Track } from 'types'
import type { ColumnsType } from 'antd/es/table'
import { Store } from 'store/types'
interface IProp {
  songs: Track[]
  scroll?: {
    x: number
    y: number
  }
}

export default function SongList(props: IProp) {
  const [hoverIndex, setHoverIndex] = useState(-1)
  const playList = useSelector((store: Store) => store.playList)
  const { songs, scroll } = props
  const { manualPlay, playSongSheet } = useContext(PlayerContext)
  let { id } = useParams()

  const goSinger = (id: number) => {
    alert('歌手详情' + id)
  }

  const goSongSheet = () => {
    alert('歌单详情')
  }
  const onLike = () => {
    alert('喜欢')
  }
  const onDownLoad = () => {
    alert('下载')
  }
  const playSong = (index: number) => {
    if (playList.songs[playList.currentIndex].id === songs[index].id) {
      manualPlay()
    } else {
      playSongSheet(id, songs, index)
    }
  }

  const columns: ColumnsType<Track> = [
    {
      dataIndex: 'id',
      key: 'id',
      width: 55,
      align: 'right',
      render(value, record, index) {
        return <span style={{ color: '#ccc', cursor: 'default' }}>{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
      }
    },
    {
      title: '操作',
      width: 55,
      key: 'id',
      render: () => (
        <>
          <span onClick={onLike}>
            <HeartOutlined className={style.icon} style={{ paddingRight: '10px' }} />
          </span>
          <span onClick={onDownLoad}>
            <DownloadOutlined className={style.icon} />
          </span>
        </>
      )
    },
    {
      title: '标题',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (text, record, index) => (
        <span>
          <span
            style={{
              color:
                playList.songs.length > 0 && playList.songs[playList.currentIndex].id === record.id
                  ? 'var(--theme-background)'
                  : hoverIndex === index
                  ? '#000'
                  : '#333',
              cursor: 'default'
            }}
          >
            {text}
          </span>
          {record.tns && record.tns.length > 0 && (
            <span style={{ color: '#969696', cursor: 'default' }}>({record.tns.join(' / ')})</span>
          )}
        </span>
      )
    },
    {
      title: '歌手',
      dataIndex: 'ar',
      key: 'ar',
      ellipsis: true,
      width: '25%',
      render: (text, record, index) => (
        <>
          {record.ar.map((item, i, arr) => (
            <>
              <span className={style.info} onClick={() => goSinger(item.id)}>
                {item.name}
              </span>
              {i === arr.length - 1 ? (
                <></>
              ) : (
                <span style={{ color: 'var(--text-second-color)', cursor: 'default' }}> / </span>
              )}
            </>
          ))}
        </>
      )
    },
    {
      title: '专辑',
      dataIndex: 'al',
      key: 'al',
      ellipsis: true,
      width: '20%',
      render: (text, record, index) => (
        <span onClick={() => goSinger(record.al.id)}>
          <span className={style.info}>{record.al.name}</span>
          {record.al.tns && record.al.tns.length > 0 && (
            <span style={{ color: '#969696', cursor: 'pointer' }}>({record.al.tns.join('/')})</span>
          )}
        </span>
      )
    },
    {
      title: '时间',
      dataIndex: 'dt',
      key: 'dt',
      ellipsis: true,
      width: '10%',
      render: (text, record, index) => (
        <span style={{ color: 'var(--text-second-color)', cursor: 'default' }}>{converTime(text / 1000)}</span>
      )
    }
  ]

  return (
    <>
      {songs && songs!.length > 0 && (
        <ConfigProvider
          theme={{
            components: {
              Table: {
                rowHoverBg: '#f5f5f5',
                headerBg: '#fff',
                headerSplitColor: '#fff',
                headerColor: '#888'
              }
            }
          }}
        >
          <Table
            className={style.table}
            columns={columns}
            dataSource={songs}
            pagination={false}
            size='small'
            rowClassName={(record, index) => (index % 2 === 1 ? style.stripe : '')}
            onRow={(record, index) => {
              return {
                onClick: (event) => {}, // 点击行
                onDoubleClick: (event) => {
                  playSong(index as number)
                },
                onContextMenu: (event) => {},
                onMouseEnter: (event) => {
                  setHoverIndex(index as number)
                },
                onMouseLeave: (event) => {
                  setHoverIndex(-1)
                }
              }
            }}
          />
        </ConfigProvider>
      )}
    </>
  )
}
