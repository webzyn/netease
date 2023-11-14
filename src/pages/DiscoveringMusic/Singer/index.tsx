import React, { useState, useEffect, Fragment } from 'react'

import useJump from 'utils/hooks/useJump'
import loadImg from 'utils/loadImg'
import { getArtistList } from 'request/withOutLoginApi'

import style from './style.module.css'

import { Artist } from 'types'
interface SearchOptipnIProp {
  currentValue: number | string
  setCurrentValue: (val: number | string) => void
  title: string
  types: { label: string; value: number | string }[]
}
const SearchOptipn = (props: SearchOptipnIProp) => {
  const { title, types, currentValue, setCurrentValue } = props
  return (
    <div className={style.types_wrapper}>
      <div className={style.title}>{title}</div>
      <div className={style.types}>
        {types.map((item, index, arr) => (
          <Fragment key={item.label}>
            <div
              className={`${style.type} ${item.value === currentValue && style.action}`}
              onClick={() => setCurrentValue(item.value)}
            >
              {item.label}
            </div>
            {index !== arr.length - 1 && <div className={style.line}></div>}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default function Singer() {
  const [area, setArea] = useState<number | string>(-1)
  const [type, setType] = useState<number | string>(-1)
  const [initial, setInitial] = useState<number | string>(-1)

  const [page, setPage] = useState(1)
  const [artists, setArtists] = useState<Artist[]>([])
  const [more, setMore] = useState(false)

  const { goSingerDetail } = useJump()

  const languages = [
    { label: '全部', value: -1 },
    { label: '华语', value: 7 },
    { label: '欧美', value: 96 },
    { label: '日本', value: 8 },
    { label: '韩国', value: 16 },
    { label: '其他', value: 0 }
  ]

  const types = [
    { label: '全部', value: -1 },
    { label: '男歌手', value: 1 },
    { label: '女歌手', value: 2 },
    { label: '乐队', value: 3 }
  ]

  const initials = [
    { label: '热门', value: -1 },
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'C', value: 'c' },
    { label: 'D', value: 'd' },
    { label: 'E', value: 'e' },
    { label: 'F', value: 'f' },
    { label: 'G', value: 'g' },
    { label: 'H', value: 'h' },
    { label: 'I', value: 'i' },
    { label: 'J', value: 'j' },
    { label: 'K', value: 'k' },
    { label: 'L', value: 'l' },
    { label: 'M', value: 'm' },
    { label: 'N', value: 'n' },
    { label: 'O', value: 'o' },
    { label: 'P', value: 'p' },
    { label: 'Q', value: 'q' },
    { label: 'R', value: 'r' },
    { label: 'S', value: 's' },
    { label: 'T', value: 't' },
    { label: 'U', value: 'u' },
    { label: 'V', value: 'v' },
    { label: 'W', value: 'w' },
    { label: 'X', value: 'x' },
    { label: 'Y', value: 'y' },
    { label: 'Z', value: 'z' },
    { label: '#', value: 0 }
  ]

  useEffect(() => {
    page === 1 ? getData() : setPage(1)
  }, [area, type, initial])

  useEffect(() => {
    getData()
  }, [page])

  useEffect(() => {
    loadImg()
  }, [artists])

  const getData = (p?: number) => {
    getArtistList(area, type, initial, p || page, 25).then((res) => {
      if (res.code === 200) {
        page === 1 ? setArtists(res.artists) : setArtists([...artists, ...res.artists])
        setMore(res.more)
      }
    })
  }

  return (
    <>
      <SearchOptipn title='语种' types={languages} currentValue={area} setCurrentValue={setArea}></SearchOptipn>
      <SearchOptipn title='分类' types={types} currentValue={type} setCurrentValue={setType}></SearchOptipn>
      <SearchOptipn title='筛选' types={initials} currentValue={initial} setCurrentValue={setInitial}></SearchOptipn>
      <div className={style.singer_wrapper}>
        {artists.map((item) => (
          <div className={style.singer} key={item.id}>
            <div className={style.img_wrap}>
              <img
                className={style.img}
                src='/img/default.jpg'
                data-src={item.img1v1Url}
                onClick={() => goSingerDetail(item.id, item)}
              />
            </div>
            <div className={style.info}>
              <div onClick={() => goSingerDetail(item.id)} className={style.name}>
                {item.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ margin: '30px auto', fontSize: '14px', textAlign: 'center', cursor: 'pointer', color: '#666' }}>
        {more ? <span onClick={() => setPage(page + 1)}>加载更多</span> : <span>到底啦~</span>}
      </div>
    </>
  )
}
