import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import usePlayer from 'utils/hooks/usePlayer'
import useJump from 'utils/hooks/useJump'
import { converTime } from 'utils/utils'

import { ConfigProvider, Table } from 'antd'
import { PlayCircleOutlined, FolderAddOutlined, HeartOutlined, DownloadOutlined } from '@ant-design/icons'

import { getAlbum } from 'request/withOutLoginApi'

import style from './style.module.css'

import { Track, Album } from 'types'
import { Store } from 'store/types'
import type { ColumnsType } from 'antd/es/table'
interface IProp {
  id: number | string // 专辑id
}
export default function AlbumForTable(props: IProp) {
  const { id } = props
  const [album, setAlbum] = useState<Album>()
  const [songs, setSongs] = useState<Track[]>([])
  const playList = useSelector((store: Store) => store.playList)
  const { playSong, changeSongSheet, addPlayList } = usePlayer()
  const { goAlbumDetail } = useJump()
  const [hoverIndex, setHoverIndex] = useState(-1)

  useEffect(() => {
    getAlbum(id).then((res) => {
      if (res.code === 200) {
        setSongs(res.songs)
        setAlbum(res.album)
      }
    })
  }, [])

  const onLike = () => {
    alert('喜欢')
  }
  const onDownLoad = () => {
    alert('下载')
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
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (text, record, index) => (
        <span>
          <span
            style={{
              color:
                playList.songs.length > 0 &&
                playList.currentIndex > -1 &&
                playList.songs[playList.currentIndex].id === record.id
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
      dataIndex: 'dt',
      key: 'dt',
      ellipsis: true,
      width: 80,
      render: (text, record, index) => (
        <span style={{ color: 'var(--text-second-color)', cursor: 'default' }}>{converTime(text / 1000)}</span>
      )
    }
  ]

  return (
    <div className={style.root}>
      <div className={style.img_wrap}>
        <img className={style.img} src={album?.picUrl} alt='' />
      </div>
      <div className={style.main}>
        <div className={style.title}>
          <div className={style.name}>{album?.name}</div>
          <div className={style.btns}>
            <PlayCircleOutlined className={style.play} onClick={() => changeSongSheet(id + 'top50', songs)} />
            <div className={style.line}></div>
            <FolderAddOutlined className={style.addSong} onClick={() => addPlayList(id + 'top50', songs)} />
          </div>
        </div>

        <div style={{ width: '100%' }}>
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
              <>
                <Table
                  className={style.table}
                  columns={columns}
                  dataSource={songs.slice(0, 10)}
                  pagination={false}
                  rowKey='id'
                  size='small'
                  rowClassName={(record, index) => (index % 2 === 0 ? style.stripe : '')}
                  onRow={(record, index) => {
                    return {
                      onClick: (event) => {}, // 点击行
                      onDoubleClick: (event) => {
                        playSong(id as string, songs, index as number)
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
                {songs.length > 10 && (
                  <div className={style.more} onClick={() => goAlbumDetail(Number(id))}>
                    查看全部{songs.length}首{' >'}
                  </div>
                )}
              </>
            </ConfigProvider>
          )}
        </div>
      </div>
    </div>
  )
}
