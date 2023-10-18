import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCommentHot } from 'request/withOutLoginApi'
import { commentLike, deleteComment } from 'request/withLoginApi'

import CommentList from 'components/commentList'
import { Divider } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

import style from './style.module.css'

import { Comment } from 'types'

export default function ExcitingComments() {
  const { id, type } = useParams()

  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState<Comment[]>([])

  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    if (hasMore) {
      setPage(page + 1)
      getCommentHot(id as string, Number(type) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7, 20, (page - 1) * 20).then((res) => {
        if (res.code === 200) {
          setData([...data, ...res.hotComments])
          setHasMore(true)
        } else {
          setHasMore(false)
        }
      })
    }
  }

  const like = (cid: number | string, liked: boolean) => {
    let t: 0 | 1 = liked ? 0 : 1
    commentLike(id as string, cid, t, 2).then((res) => {
      if (res.code === 200) {
        getData()
      }
    })
  }

  const share = () => {
    alert('分享')
  }

  const reply = () => {}

  const onDelete = (commentId: number) => {
    deleteComment(id as string, 2, commentId).then((res) => {
      if (res.code === 200) {
        setTimeout(() => {
          getData()
        }, 2000)
      }
    })
  }

  return (
    <div className={style.root} id='scrollableDiv'>
      <InfiniteScroll
        dataLength={data.length}
        next={getData}
        hasMore={hasMore}
        loader={<Divider plain>到底了🤐</Divider>}
        endMessage={<Divider plain>到底了🤐</Divider>}
        scrollableTarget='scrollableDiv'
      >
        <div className={style.main}>
          <div className={style.title}>精彩评论</div>
          <CommentList
            dataSource={data as Comment[]}
            like={like}
            share={share}
            reply={reply}
            hasModal
            onDelete={onDelete}
          ></CommentList>
        </div>
      </InfiniteScroll>
    </div>
  )
}
