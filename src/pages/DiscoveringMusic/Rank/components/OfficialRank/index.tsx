import React, { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import useJump from 'utils/hooks/useJump'
import usePlayer from 'utils/hooks/usePlayer'
import loadImg from 'utils/loadImg'
import { getSongSheetDetail } from 'request/withOutLoginApi'

import { ConfigProvider, Table } from 'antd'
import { RightOutlined, CaretRightOutlined } from '@ant-design/icons'

import style from './style.module.css'
import { PlayList, Track } from 'types'
import { Store } from 'store/types'
import type { ColumnsType } from 'antd/es/table'
interface IProps {
  playList: PlayList
}
export default function OfficialRank(props: IProps) {
  const playList = useSelector((store: Store) => store.playList)
  const { playList: track } = props
  const [songs, setSongs] = useState<Track[]>([])
  const { goSongSheetDetail } = useJump()
  const { setPlaylist, playSong } = usePlayer()
  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    getSongSheetDetail(track.id).then((res) => {
      if (res.code === 200) {
        setSongs(res.playlist.tracks.slice(0, 5))
      }
    })
  }, [])

  useEffect(() => {
    loadImg()
  }, [playList])

  const goSinger = (id: number) => {
    alert('歌手详情' + id)
  }

  const play = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPlaylist(track.id)
  }

  const columns: ColumnsType<Track> = [
    {
      dataIndex: 'id',
      key: 'id',
      width: 20,
      align: 'left',
      render(value, record, index) {
        return <span style={{ color: '#ccc', cursor: 'default' }}>{index + 1}</span>
      }
    },
    {
      title: '标题',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (text, record, index) => (
        <span style={{ fontSize: '12px' }}>
          <span style={{ color: '#333', cursor: 'default' }}>{text}</span>
          {record.alia && record.alia.length > 0 && (
            <span style={{ color: '#969696', cursor: 'default' }}>({record.alia.join(' / ')})</span>
          )}
        </span>
      )
    },
    {
      title: '歌手',
      dataIndex: 'ar',
      key: 'ar',
      ellipsis: true,
      align: 'right',
      width: '25%',
      render: (text, record, index) => (
        <>
          {record.ar.map((item, i, arr) => (
            <span key={i}>
              <span style={{ color: '#969696', fontSize: '12px' }} onClick={() => goSinger(item.id)}>
                {item.name}
              </span>
              {i === arr.length - 1 ? <></> : <span style={{ color: '#969696', cursor: 'default' }}> / </span>}
            </span>
          ))}
        </>
      )
    }
  ]

  return (
    <div className={style.root}>
      <div
        className={style.img}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => goSongSheetDetail(track.id)}
      >
        <img className={style.img} src='/img/default.jpg' data-src={track.coverImgUrl} />
        {isHover && (
          <div className={style.circle} onClick={play}>
            <CaretRightOutlined
              style={{
                fontSize: '24px',
                color: 'var(--theme-background)',
                position: 'absolute',
                top: '6px',
                left: '6px'
              }}
            />
          </div>
        )}
      </div>
      <div>
        {songs && songs.length > 0 && (
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
              showHeader={false}
              rowKey='id'
              size='small'
              rowClassName={(record, index) => (index % 2 === 0 ? style.stripe : '')}
              onRow={(record, index) => {
                return {
                  onClick: (event) => {}, // 点击行
                  onDoubleClick: (event) => {
                    playSong(track.id, songs, index as number)
                  },
                  onContextMenu: (event) => {},
                  onMouseEnter: (event) => {},
                  onMouseLeave: (event) => {}
                }
              }}
            />
          </ConfigProvider>
        )}
        <div
          style={{ color: '#666', fontSize: '12px', margin: '10px 0 30px', cursor: 'pointer' }}
          onClick={() => goSongSheetDetail(track.id)}
        >
          查看更多 <RightOutlined style={{ fontSize: '10px' }} />
        </div>
      </div>
    </div>
  )
}
