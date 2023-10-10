import React, { useState } from 'react'

import { MenuOutlined, LinkOutlined } from '@ant-design/icons'
import { Popover, Space, Slider, ConfigProvider, Drawer, Table } from 'antd'
import Icon from 'components/Icon'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { resetPlayList } from 'store/festures/playList'
import { converTime } from 'utils/utils'

import style from '../../style.module.css'

import type { ColumnsType } from 'antd/es/table'
import { Song } from 'types'
import { Store } from 'store/types'
interface SongListDrawerIProp {
  open: boolean
  onClose: () => void
  assign: (index: number) => void
}
interface IProp {
  volume: number
  setVolume: (volumn: number) => void
  setMute: () => void
  mute: boolean
  assign: (index: number) => void
}

export const SongListDrawer: React.FC<SongListDrawerIProp> = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const playList = useSelector((store: Store) => store.playList)
  const songs = playList.songs
  const songsId = playList.id
  const currentIndex = playList.currentIndex

  const { open, onClose } = props
  const [hoverIndex, setHoverIndex] = useState(-1)

  const goSinger = (id: number) => {
    console.log(id)
    alert('歌手详情' + id)
  }

  const goSongSheet = () => {
    alert('歌单详情' + songsId)
  }

  const goHome = () => {
    onClose()
    navigate('/discoveringMusic/personalized')
  }

  const cleanSongList = () => {
    dispatch(resetPlayList())
    console.log('cleanSongList')
  }

  const columns: ColumnsType<Song> = [
    {
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: '50%',
      render: (text, record, index) => (
        <span>
          <span
            style={{
              color: currentIndex === index ? 'var(--theme-background)' : hoverIndex === index ? '#000' : '#333',
              cursor: 'default'
            }}
          >
            {text}
          </span>
          {record.alia[0] && <span style={{ color: '#ccc', cursor: 'default' }}>({record.alia[0]})</span>}
        </span>
      )
    },
    {
      dataIndex: 'singer',
      key: 'singer',
      ellipsis: true,
      width: '25%',
      render: (text, record, index) => (
        <>
          {record.ar.map((item, i, arr) => (
            <>
              <span
                style={{
                  cursor: 'pointer',
                  color: currentIndex === index ? 'var(--theme-background)' : hoverIndex === index ? '#000' : '#666'
                }}
                onClick={() => goSinger(item.id)}
              >
                {item.name}
              </span>
              {i === arr.length - 1 ? (
                <></>
              ) : (
                <span style={{ color: hoverIndex === index ? '#000' : '#666', cursor: 'default' }}> / </span>
              )}
            </>
          ))}
        </>
      )
    },
    {
      dataIndex: 'dt',
      key: 'dt',
      ellipsis: true,
      width: '25%',
      render: (text, record, index) => (
        <span>
          <LinkOutlined
            style={{ color: hoverIndex === index ? '#717171' : '#ACACAC', marginRight: '16px', cursor: 'pointer' }}
            onClick={goSongSheet}
          />
          <span style={{ color: hoverIndex === index ? '#000' : '#ccc', cursor: 'default' }}>
            {converTime(text / 1000)}
          </span>
        </span>
      )
    }
  ]

  const title = (
    <>
      <div style={{ fontSize: '20px', marginBottom: '14px' }}>当前播放</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#ccc', flex: 1 }}>总{songs.length}首</span>
        <span style={{ fontSize: '14px', color: '#333', marginRight: '20px', cursor: 'pointer' }}>收藏全部</span>
        <span style={{ fontSize: '14px', color: '#507daf', cursor: 'pointer' }} onClick={cleanSongList}>
          清空列表
        </span>
      </div>
    </>
  )
  return (
    <>
      <Drawer
        className={style.drawer}
        title={title}
        placement='right'
        closeIcon={null}
        onClose={onClose}
        open={open}
        size='large'
        headerStyle={{ height: '88px' }}
      >
        {songs.length > 0 ? (
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  rowHoverBg: '#f5f5f5'
                }
              }
            }}
          >
            <Table
              className={style.table}
              columns={columns}
              dataSource={songs}
              showHeader={false}
              pagination={false}
              size='small'
              rowClassName={(record, index) => (index % 2 === 1 ? style.stripe : '')}
              onRow={(record, index) => {
                return {
                  onClick: (event) => {}, // 点击行
                  onDoubleClick: (event) => {
                    props.assign(index as number)
                  },
                  onContextMenu: (event) => {},
                  onMouseEnter: (event) => {
                    setHoverIndex(index as number)
                  }, // 鼠标移入行
                  onMouseLeave: (event) => {
                    setHoverIndex(-1)
                  }
                }
              }}
            />
          </ConfigProvider>
        ) : (
          <div style={{ height: '100%', paddingTop: '25%', color: '#999', textAlign: 'center', cursor: 'default' }}>
            <div style={{ marginBottom: '30px' }}>你还没有添加任何歌曲!</div>
            <div>
              去首页
              <span style={{ color: 'var(--theme-background)', cursor: 'pointer' }} onClick={goHome}>
                发现音乐
              </span>
            </div>
          </div>
        )}
      </Drawer>
    </>
  )
}

export default function Oper(props: IProp) {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const content = (
    <div style={{ height: '100px' }}>
      <ConfigProvider
        theme={{
          components: {
            Slider: {
              // dotActiveBorderColor: 'var(--theme-background)',
              // dotBorderColor: 'var(--theme-background)',

              // dotSize: 1,
              // controlSize: 1,

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
          defaultValue={props.volume}
          min={0}
          max={1}
          step={0.01}
          vertical
          style={{ margin: 0 }}
          tooltip={{ formatter: null }}
          onAfterChange={(value) => props.setVolume(value)}
        />
      </ConfigProvider>
    </div>
  )
  return (
    <div className={style.oper_wrapper}>
      <div className={style.label}>标准</div>
      <Icon type='icon-yinxiao' style={{ fontSize: '19px', paddingLeft: '20px', cursor: 'pointer' }}></Icon>

      {!props.mute ? (
        <Space wrap style={{ paddingLeft: '20px' }}>
          <Popover content={content} trigger='hover'>
            <span>
              <span onClick={() => props.setMute()}>
                <Icon type='icon-shengyin' style={{ fontSize: '20px', cursor: 'pointer' }}></Icon>
              </span>
            </span>
          </Popover>
        </Space>
      ) : (
        <Space wrap style={{ paddingLeft: '14px' }}>
          <Popover content={content} trigger='hover'>
            <span>
              <span onClick={() => props.setMute()}>
                <Icon type='icon-jingyin' style={{ fontSize: '26px', cursor: 'pointer' }}></Icon>
              </span>
            </span>
          </Popover>
        </Space>
      )}
      <Icon type='icon-shuangren' style={{ fontSize: '22px', paddingLeft: '20px', cursor: 'pointer' }}></Icon>
      <MenuOutlined
        style={{ fontSize: '18px', paddingLeft: '20px', cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
      />
      <>
        <SongListDrawer open={open} onClose={onClose} assign={props.assign} />
      </>
    </div>
  )
}
