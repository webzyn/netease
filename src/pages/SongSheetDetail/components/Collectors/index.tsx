import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSubscribers } from 'request/withOutLoginApi'

import { List, Pagination } from 'antd'
import { ManOutlined, WomanOutlined } from '@ant-design/icons'

import style from './style.module.css'
import custom from 'assets/styles/custom.module.css'

import { User } from 'types'
export default function Collectors() {
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>()
  const [subscribers, setSubscribers] = useState<User[]>()
  const { id } = useParams()
  useEffect(() => {
    getSubscribers(id as string, 60, (page - 1) * 60).then((res) => {
      if (res.code === 200) {
        setTotal(res.total)
        setSubscribers(res.subscribers)
      }
    })
  }, [page])
  const onChange = (page: number, pageSize: number) => {
    setPage(page)
  }
  return (
    <div style={{ padding: '0px 30px 30px' }}>
      {subscribers && subscribers.length > 0 ? (
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={subscribers}
          renderItem={(item) => (
            <List.Item>
              <div className={style.wrap}>
                <div className={style.img}>
                  <img src={item.avatarUrl} className={style.img} alt='' />
                </div>
                <div className={style.info}>
                  <div className={style.nickname}>
                    {item.nickname}
                    {item.gender === 1 && (
                      <div className={style.iconBox}>
                        <ManOutlined style={{ fontSize: '12px', color: '#359CCF' }} />
                      </div>
                    )}
                    {item.gender === 2 && (
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
                  <div className={style.signature}>{item.signature}</div>
                </div>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <div style={{ fontSize: '14px', color: '#999999', margin: '30px auto 0', textAlign: 'center' }}>暂无收藏者</div>
      )}
      {subscribers && subscribers.length > 60 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            className={custom.pagination}
            size='small'
            current={page}
            total={total}
            pageSize={60}
            showSizeChanger={false}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  )
}
