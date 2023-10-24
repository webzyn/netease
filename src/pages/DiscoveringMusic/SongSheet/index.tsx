import React, { useEffect, useState } from 'react'

import Item from 'components/Item'
import { Button, Pagination, Popover } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import Highquality from './components/Highquality'

import {
  getPlayListCatlist,
  getPlayListHot,
  getTopPlaylist,
  getTopList,
  getHighqualityTags
} from 'request/withOutLoginApi'

import style from './style.module.css'
import custom from 'assets/styles/custom.module.css'
import { PlaylistTag, HotPlaylistTag, Categories, PlayList } from 'types'

export default function SongSheet() {
  const [hotTags, setHotTags] = useState<HotPlaylistTag[]>()
  const [allTag, setAllTag] = useState<PlaylistTag>()
  const [subTags, setSubTags] = useState<PlaylistTag[]>()
  const [categories, setCategories] = useState<string[]>([])
  const [playList, setPlayList] = useState<PlayList[]>([])
  const [cat, setCat] = useState<string>('全部歌单')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState<number>(0)

  const [highqualityTags, setAllTagHighqualityTags] = useState<HotPlaylistTag[]>([])

  useEffect(() => {
    getTags()
    getHotTags()
    getHighTags()
    // getTopList()
  }, [])

  useEffect(() => {
    getPlayList()
  }, [page, cat])

  useEffect(() => {
    setPage(1)
  }, [cat])

  const getHotTags = () => {
    getPlayListHot().then((res) => {
      if (res.code === 200) {
        setHotTags(res.tags)
      }
    })
  }

  const getTags = () => {
    getPlayListCatlist().then((res) => {
      if (res.code === 200) {
        setAllTag(res.all)
        const arr = Object.values(res.categories)
        setCategories(arr)
        setSubTags(res.sub)
      }
    })
  }

  const getPlayList = () => {
    getTopPlaylist(cat, 100, page).then((res) => {
      if (res.code === 200) {
        setPlayList(res.playlists)
        setTotal(res.total)
      }
    })
  }

  const getHighTags = () => {
    getHighqualityTags().then((res) => {
      if (res.code === 200) {
        setAllTagHighqualityTags(res.tags)
      }
    })
  }

  const Tags = (
    <div className={style.pvpover_tags}>
      <div className={style.header}>
        <span
          className={cat === allTag?.name ? style.tag_checked : style.tag}
          onClick={() => {
            setCat(allTag!.name)
          }}
        >
          {allTag?.name}
        </span>
      </div>
      {categories.map((item, index) => (
        <div className={style.content}>
          <div className={style.categorie}>{item}</div>
          <div className={style.other}>
            {subTags?.map((tag) => {
              if (tag.category === index) {
                return (
                  <div className={style.otherTagBox}>
                    <span
                      style={{ position: 'relative' }}
                      className={cat === tag?.name ? style.tag_checked : style.tag}
                      onClick={() => setCat(tag!.name)}
                    >
                      {tag?.name}
                      {tag.hot && <span className={style.hot}>HOT</span>}
                    </span>
                  </div>
                )
              }
            })}
          </div>
          )
        </div>
      ))}
    </div>
  )

  return (
    <div>
      {/* 精品歌单 */}
      {(highqualityTags.find((item) => item.name === cat) || cat === '全部歌单') && (
        <Highquality cat={cat}></Highquality>
      )}
      {/* tags */}
      <div className={style.tags}>
        <span className={custom.button}>
          <Popover placement='bottomLeft' content={Tags} arrow={false}>
            <Button
              style={{
                width: '100px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {cat}
              <RightOutlined style={{ marginLeft: '0px' }} />
            </Button>
          </Popover>
        </span>
        <div>
          {hotTags?.map((item) => (
            <span className={cat === item.name ? style.tag_checked : style.tag} onClick={() => setCat(item.name)}>
              {item.name}
            </span>
          ))}
        </div>
      </div>
      {/* list */}
      <div className={style.list}>
        {playList.map((item) => (
          <div className={style.item} key={item.id}>
            <Item
              key={item.id}
              id={item.id}
              picUrl={item.coverImgUrl}
              name={item.name}
              playcount={item.playCount}
              alg={item.alg}
              nickname={item.creator.nickname}
            ></Item>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {total > 60 && (
          <Pagination
            className={custom.pagination}
            size='small'
            current={page}
            total={total}
            pageSize={100}
            showSizeChanger={false}
            onChange={(page, pageSize) => setPage(page)}
          />
        )}
      </div>
    </div>
  )
}
