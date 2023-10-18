import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import CommentList from 'components/commentList'
import { commentLike, comment, deleteComment } from 'request/withLoginApi'
import { getCommentOfPlaylist } from 'request/withOutLoginApi'

import { Input, Pagination, Button, message } from 'antd'

import style from './style.module.css'
import custom from 'assets/styles/custom.module.css'

import { Comment } from 'types'

const { TextArea } = Input

export default function CommentCom() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>()
  const [hotComments, setHotComments] = useState<Comment[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [textAreaValue, setTextAreaValue] = useState<string>('')
  const [replyText, setReplyText] = useState<string>('')
  const [commentId, setCommentId] = useState<number>(-1)

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    return new Promise((resolve, reject) => {
      getCommentOfPlaylist(id as string, 60, (page - 1) * 60).then((res) => {
        if (res.code === 200) {
          setTotal(res.total)
          setHotComments(res.hotComments)
          setComments(res.comments)
          resolve(res)
        }
      })
    })
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

  const more = () => {
    navigate(`/excitingComments/${id}/${2}`)
  }

  const onChange = (page: number, pageSize: number) => {
    setPage(page)
  }

  // 评论start
  useEffect(() => {
    if (textAreaValue && textAreaValue.length > 0) {
      if (replyText.length > 0 && textAreaValue.indexOf(replyText) !== 0) {
        setCommentId(-1)
      }
    }
  }, [textAreaValue])
  const sendComment = () => {
    if (textAreaValue && textAreaValue.length > 0) {
      let type: 1 | 2 = 1
      let content = textAreaValue
      if (commentId !== -1) {
        type = 2
        content = textAreaValue.replace(replyText, '')
      }
      if (content.length <= 0) {
        return message.info('请输入评论')
      }

      comment(id as string, content, type, 2, commentId).then((res) => {
        if (res.code === 200) {
          setPage(1)
          setTextAreaValue('')
          setTimeout(() => {
            getData()
          }, 3000)
        }
      })
    }
  }
  const reply = (commentId: number, nickname: string) => {
    const replyText = `回复${nickname}:`
    setTextAreaValue(replyText)
    setReplyText(replyText)
    setCommentId(commentId)
  }
  // 评论end

  const onDelete = (commentId: number) => {
    deleteComment(id as string, 2, commentId).then((res) => {
      if (res.code === 200) {
        message.info('删除成功')
        setTimeout(() => {
          getData()
        }, 2000)
      }
    })
  }

  return (
    <div style={{ padding: '0px 30px 30px' }}>
      <div className={custom.textarea} style={{}}>
        <TextArea
          autoSize={{ minRows: 3, maxRows: 3 }}
          maxLength={140}
          showCount
          bordered={false}
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.target.value)}
        />
      </div>
      <div className={style.commentAction}>
        <div></div>
        <span className={custom.button}>
          <Button className={style.second} onClick={sendComment}>
            评论
          </Button>
        </span>
      </div>
      {hotComments && hotComments.length > 0 && (
        <>
          <div className={style.title}>精彩评论</div>
          <CommentList
            dataSource={hotComments?.filter((item, index) => index < 10) as Comment[]}
            like={like}
            share={share}
            reply={reply}
            onDelete={onDelete}
          ></CommentList>
          <div className={style.more} onClick={more}>
            更多精彩评论 {'>'}
          </div>
        </>
      )}
      {comments && comments.length > 0 && (
        <>
          <div className={style.title}>最新评论({total})</div>
          <CommentList
            dataSource={comments as Comment[]}
            like={like}
            share={share}
            reply={reply}
            onDelete={onDelete}
          ></CommentList>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {comments.length > 60 && (
              <Pagination
                className={custom.pagination}
                size='small'
                current={page}
                total={total}
                pageSize={60}
                showSizeChanger={false}
                onChange={onChange}
              />
            )}
          </div>
        </>
      )}
      {comments.length === 0 && hotComments.length === 0 && (
        <div style={{ fontSize: '14px', color: '#999', textAlign: 'center' }}>还没有评论, 快来抢沙发~</div>
      )}
    </div>
  )
}
