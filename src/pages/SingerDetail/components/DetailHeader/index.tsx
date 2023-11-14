import React, { useEffect, useState, Fragment } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getArtistDetail } from 'request/withOutLoginApi'
import { artistSub } from 'request/withLoginApi'
import useJump from 'utils/hooks/useJump'

import { Button, message } from 'antd'
import { FolderAddOutlined, FolderOutlined, UserOutlined } from '@ant-design/icons'

import style from './style.module.css'
import { Artist, User } from 'types'

export default function DetailHeader() {
  const { id } = useParams()
  // 通过state传参将歌手信息传递过来
  const { state } = useLocation()
  const { goSingerDetail, goUserDetail } = useJump()
  const [artist, setArtist] = useState<Artist>()
  const [followed, setFollowed] = useState<boolean>(false)
  const [user, setUser] = useState<User>()

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    getArtistDetail(id as string).then((res) => {
      if (res.code === 200) {
        setArtist({ ...artist, ...res.data.artist })
        setUser(res.data.user)
      }
    })
  }

  const collect = () => {
    let type = 1
    if (followed) {
      type = 0
    }
    artistSub(id as string, type).then((res) => {
      if (res.code) {
        message.success(followed ? '取消成功' : '收藏成功')
        setFollowed(!followed)
        // 更新state参数
        goSingerDetail(id as string)
      }
    })
  }

  return (
    <div className={style.root}>
      <div className={style.img}>
        <img src={artist?.avatar} alt='' className={style.img} />
      </div>
      <div className={style.main}>
        <div className={style.title}>
          <span className={style.name}>{artist?.name}</span>
        </div>

        <div className={style.alias}>
          {artist?.alias.map((item, index, arr) => (
            <Fragment key={item}>
              <span>{item}</span>
              {index !== arr.length - 1 && <span>; </span>}
            </Fragment>
          ))}
        </div>

        <div className={style.action}>
          <Button onClick={collect} disabled>
            {followed ? (
              <FolderOutlined style={{ fontSize: '18px' }} />
            ) : (
              <FolderAddOutlined style={{ fontSize: '18px' }} />
            )}
            {followed ? '已' : ''}收藏
          </Button>

          {user && (
            <Button className={style.second} onClick={() => goUserDetail(user.userId)}>
              <UserOutlined />
              <span style={{ marginLeft: '2px' }}>个人主页</span>
            </Button>
          )}
        </div>

        <div>
          <span style={{ marginRight: '20px' }}>单曲数:{artist?.musicSize}</span>
          <span style={{ marginRight: '20px' }}>专辑数:{artist?.albumSize}</span>
          <span>MV数:{artist?.mvSize}</span>
        </div>
      </div>
    </div>
  )
}
