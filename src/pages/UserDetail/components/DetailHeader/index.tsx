import React, { useEffect, useState, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import useJump from 'utils/hooks/useJump'
import city from 'constants/city'

import { getUserDetail } from 'request/withOutLoginApi'
import { UserDetailRes } from 'request/types/singleApi'
import { Button } from 'antd'
import {
  ManOutlined,
  WomanOutlined,
  MailOutlined,
  SolutionOutlined,
  PlusOutlined,
  EditOutlined,
  WeiboCircleOutlined
} from '@ant-design/icons'

import style from './style.module.css'
import custom from 'assets/styles/custom.module.css'

export default function DetailHeader() {
  const user = useSelector((store: any) => store.user)
  const { id } = useParams()
  const [detail, setDetail] = useState<UserDetailRes>()
  const { goSingerDetail } = useJump()

  useEffect(() => {
    getUserDetail(id as string).then((res) => {
      if (res.code === 200) {
        setDetail(res)
      }
    })
  }, [])

  return (
    <div className={style.root}>
      <div className={style.img}>
        <img src={detail?.profile.avatarUrl} alt='' className={style.img} />
      </div>
      <div className={style.main}>
        <div className={style.title}>
          <span className={style.name}>{detail?.profile.nickname}</span>
        </div>

        <div className={style.tagsInfo}>
          <div className={style.tags}>
            {detail &&
              detail.profile &&
              detail.profile.allAuthTypes &&
              detail.profile.allAuthTypes.length > 0 &&
              detail.profile.allAuthTypes.map(
                (item, index) =>
                  item.desc &&
                  item.desc !== '' && (
                    <span
                      className={style.tag}
                      style={{
                        backgroundColor: item.type <= 10 ? '#FDE4E2' : '#FFF3DC',
                        color: item.type <= 10 ? '#F0483B' : '#FFB055'
                      }}
                      key={index}
                    >
                      {item.desc}
                      {item.tags && item.tags.map((tag, i) => <Fragment key={i}>、{tag}</Fragment>)}
                    </span>
                  )
              )}
            <div className={style.tag} style={{ backgroundColor: '#F0F0F0' }}>
              Lv{detail?.level}
            </div>
            {detail?.profile.gender === 1 ? (
              <div className={style.iconBox}>
                <ManOutlined style={{ fontSize: '12px', color: '#359CCF' }} />
              </div>
            ) : (
              <div
                className={style.iconBox}
                style={{
                  backgroundColor: '#ffcce7'
                }}
              >
                <WomanOutlined style={{ fontSize: '12px', color: '#E64888' }} />
              </div>
            )}
          </div>
          <div className={custom.button}>
            {id == user.id ? (
              <Button style={{ marginLeft: '5px' }}>
                <EditOutlined />
                <span>编辑个人信息</span>
              </Button>
            ) : (
              <>
                {detail && detail.profile && detail?.profile.artistId && (
                  <Button style={{ marginLeft: '5px' }} onClick={() => goSingerDetail(detail.profile.artistId)}>
                    <SolutionOutlined />
                    <span>歌手页</span>
                  </Button>
                )}
                <Button style={{ marginLeft: '5px' }}>
                  <MailOutlined />
                  <span>发私信</span>
                </Button>
                <Button style={{ marginLeft: '5px' }}>
                  <PlusOutlined style={{ color: '#EC4141' }} />
                  <span>关注</span>
                </Button>
              </>
            )}
          </div>
        </div>

        <div className={style.nums}>
          <div className={style.item}>
            <div className={style.count}>{detail?.profile.eventCount}</div>
            <div className={style.text}>动态</div>
          </div>
          <div className={style.line}></div>
          <div className={style.item}>
            <div className={style.count}>{detail?.profile.follows}</div>
            <div className={style.text}>关注</div>
          </div>
          <div className={style.line}></div>
          <div className={style.item}>
            <div className={style.count}>{detail?.profile.followeds}</div>
            <div className={style.text}>粉丝</div>
          </div>
        </div>

        <div>
          所在地区:
          {detail && detail.profile && (
            <>
              {detail!.profile.province && (
                <span style={{ color: '#666', marginLeft: '5px' }}>{city[detail!.profile.province]}</span>
              )}
              {detail!.profile.city && (
                <span style={{ color: '#666', marginLeft: '5px' }}>{city[detail!.profile.city]}</span>
              )}
            </>
          )}
        </div>

        <div style={{ margin: '10px 0' }}>
          <span style={{ marginRight: '5px' }}>社交网络:</span>
          {detail &&
            detail.bindings &&
            detail?.bindings.map(
              (binding) =>
                binding.type === 2 && (
                  <Fragment key={binding.id}>
                    {binding.url && binding.url !== '' ? (
                      <WeiboCircleOutlined
                        style={{ fontSize: '20px', color: '#E64B4E', cursor: 'pointer' }}
                        onClick={() => {
                          window.open(binding.url)
                        }}
                      />
                    ) : (
                      <span style={{ color: '#666' }}>未绑定</span>
                    )}
                  </Fragment>
                )
            )}
          {detail &&
            detail.bindings &&
            !detail?.bindings.find((binding) => binding.type === 2) &&
            (user.id === detail?.profile.userId ? (
              <WeiboCircleOutlined style={{ fontSize: '20px', color: '#B5B4B4', cursor: 'pointer' }} />
            ) : (
              <span style={{ color: '#666' }}>未绑定</span>
            ))}
        </div>

        <div>
          个人介绍:
          {detail && detail.profile && detail.profile.signature && detail!.profile.signature !== '' ? (
            <span
              style={{ color: '#666', marginLeft: '5px' }}
              dangerouslySetInnerHTML={{ __html: detail!.profile.signature.replace(/\n/g, '<br>') }}
            ></span>
          ) : (
            <span style={{ color: '#666', marginLeft: '5px' }}>暂无介绍</span>
          )}
        </div>
      </div>
    </div>
  )
}
