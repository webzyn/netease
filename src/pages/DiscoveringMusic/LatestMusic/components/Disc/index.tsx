import React, { useState, useEffect } from 'react'
import { CaretRightOutlined } from '@ant-design/icons'
import { Pagination } from 'antd'
import { getnewAlbum } from 'request/withOutLoginApi'
import useJump from 'utils/hooks/useJump'
import usePlayer from 'utils/hooks/usePlayer'

import loadImg from 'utils/loadImg'

import style from './style.module.css'
import custom from 'assets/styles/custom.module.css'

import { Album } from 'types'
export default function Disc() {
  const [disc, setDisc] = useState<Album[]>([])
  const [type, setType] = useState('ALL')
  const [total, setTotal] = useState(0)
  const [currentHover, setCurrentHover] = useState(-1)
  const [page, setPage] = useState<number>(1)
  const { goAlbumDetail } = useJump()
  const { setAlbumList } = usePlayer()

  useEffect(() => {
    getData(type)
  }, [type, page])

  useEffect(() => {
    setPage(1)
  }, [type])

  useEffect(() => {
    loadImg()
  }, [disc])

  const getData = (type: string) => {
    getnewAlbum(type, page, 20).then((res) => {
      if (res.code === 200) {
        setDisc(res.albums)
        setTotal(res.total)
      }
    })
  }

  const onChange = (page: number, pageSize: number) => {
    setPage(page)
  }

  const play = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setAlbumList(id)
  }

  const types = [
    { key: 'ALL', label: '全部' },
    { key: 'ZH', label: '华语' },
    { key: 'EA', label: '欧美' },
    { key: 'KR', label: '韩国' },
    { key: 'JP', label: '日本' }
  ]

  return (
    <div className={style.root} id='scrollableDiv'>
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
      </div>

      <div className={style.list}>
        {disc.map((item, index) => (
          <div className={style.item} key={item.id}>
            <div
              className={style.pic}
              onMouseEnter={() => setCurrentHover(index)}
              onMouseLeave={() => setCurrentHover(-1)}
              onClick={() => goAlbumDetail(item.id)}
            >
              <img
                src='/img/default.jpg'
                data-src={item.picUrl}
                style={{ width: '100%', height: '100%', borderRadius: '4px' }}
              />
              {currentHover === index && (
                <div className={style.circle} onClick={(e) => play(e, item.id)}>
                  <CaretRightOutlined
                    style={{
                      fontSize: '30px',
                      color: 'var(--theme-background)',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-45%, -50%)'
                    }}
                  />
                </div>
              )}
            </div>
            <div className={style.name} onClick={() => goAlbumDetail(item.id)}>
              {item.name}
            </div>
            <div className={style.artistName}>{item.artist.name}</div>
          </div>
        ))}
      </div>
      {total > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            className={custom.pagination}
            size='small'
            current={page}
            total={total}
            pageSize={20}
            showSizeChanger={false}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  )
}
