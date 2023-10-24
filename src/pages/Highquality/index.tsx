import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Base64 } from 'js-base64'
import { getTopPlayListHighquality, getHighqualityTags } from 'request/withOutLoginApi'

import HighqualityItem from './components/HighqualityItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Button, Popover, List } from 'antd'
import { FormatPainterOutlined } from '@ant-design/icons'

import custom from 'assets/styles/custom.module.css'
import style from './style.module.css'

import PlayList from 'types/Playlist'
import { HotPlaylistTag } from 'types'

export default function Highquality() {
  const { cat: catParams } = useParams()
  const [cat, setCat] = useState(Base64.decode(catParams as string))
  const [lasttime, setLasttime] = useState<number>()
  const [more, setMore] = useState<boolean>(false)
  const [playlists, setPlaylists] = useState<PlayList[]>([])
  const [tags, setTags] = useState<HotPlaylistTag[]>()

  useEffect(() => {
    getTags()
    getPlaylists()
  }, [])

  useEffect(() => {
    getTopPlayListHighquality(cat, 18).then((res) => {
      if (res.code === 200) {
        setPlaylists(res.playlists)
        setLasttime(res.lasttime)
        setMore(res.more)
      }
    })
  }, [cat])

  const getPlaylists = () => {
    getTopPlayListHighquality(cat, 18, lasttime).then((res) => {
      if (res.code === 200) {
        setPlaylists([...playlists, ...res.playlists])
        setLasttime(res.lasttime)
        setMore(res.more)
      }
    })
  }

  const getTags = () => {
    getHighqualityTags().then((res) => {
      if (res.code === 200) {
        setTags(res.tags)
      }
    })
  }

  const Tags = (
    <div className={style.pvpover_tags}>
      <div className={style.header}>
        <span
          className={cat === '全部歌单' ? style.tag_checked : style.tag}
          onClick={() => {
            setCat('全部歌单')
          }}
        >
          全部歌单
        </span>
      </div>
      <div style={{ paddingTop: '20px' }}>
        {tags?.map((tag) => (
          <div className={style.otherTagBox}>
            <span
              style={{ position: 'relative' }}
              className={cat === tag?.name ? style.tag_checked : style.tag}
              onClick={() => setCat(tag!.name)}
            >
              {tag?.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className={style.root} id='scrollableDiv'>
      <InfiniteScroll
        dataLength={playlists.length}
        next={getPlaylists}
        hasMore={more}
        loader={<div></div>}
        scrollableTarget='scrollableDiv'
      >
        <div className={style.title}>
          <span>精品歌单</span>
          <div className={custom.button}>
            <Popover placement='bottomLeft' content={Tags} arrow={false}>
              <Button
                style={{
                  width: '100px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '15px'
                }}
              >
                <FormatPainterOutlined style={{ marginLeft: 0 }} />
                全部歌单
              </Button>
            </Popover>
          </div>
        </div>
        <div className={style.content}>
          <List
            dataSource={playlists}
            grid={{ column: 2 }}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <HighqualityItem playlist={item} />
              </List.Item>
            )}
          />
        </div>
      </InfiniteScroll>
    </div>
  )
}
