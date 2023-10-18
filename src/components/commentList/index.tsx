import React, { useState } from 'react'

import dayjs from 'utils/dayjs'
import { List, Modal, Button, Input, message } from 'antd'
import { LikeOutlined, ShareAltOutlined, MessageOutlined } from '@ant-design/icons'
import { comment } from 'request/withLoginApi'

import { useSelector } from 'react-redux/es/hooks/useSelector'

import style from './style.module.css'
import custom from 'assets/styles/custom.module.css'

import { Comment } from 'types'
import { useParams } from 'react-router-dom'

import { Store } from 'store/types'

const { TextArea } = Input

interface IProp {
  dataSource: Comment[]
  like: (cid: number | string, liked: boolean) => void
  share: () => void
  reply: (commentId: number, nickname: string) => void
  onDelete: (commentId: number) => void
  // 精彩评论需要
  hasModal?: boolean
}
interface AddModalProp {
  open: boolean
  setOpen: (flag: boolean) => void
  commentId: number
  placeholder: string
}

const CommentModal = (props: AddModalProp) => {
  const { id, type } = useParams()
  const { open, setOpen, commentId, placeholder } = props
  const [textAreaValue, setTextAreaValue] = useState<string>('')

  const handleCancel = () => {
    setOpen(false)
  }
  const onReply = () => {
    comment(id as string, textAreaValue, 2, Number(type) as 0 | 1 | 2 | 3 | 4 | 5 | 6, commentId).then((res) => {
      if (res.code === 200) {
        handleCancel()
        message.success('回复成功')
      }
    })
  }
  return (
    <Modal
      open={open}
      title=''
      keyboard={false}
      mask={false}
      maskClosable={false}
      onCancel={handleCancel}
      footer={(_, { OkBtn, CancelBtn }) => (
        <div className={custom.button} style={{ textAlign: 'center' }}>
          <Button type='primary' disabled={textAreaValue.length === 0} onClick={onReply}>
            <span style={{ padding: '0 25px' }}>发布</span>
          </Button>
        </div>
      )}
    >
      <div className={style.modal_warp}>
        <div className={style.title}>评论</div>
        <div className={custom.textarea} style={{ margin: '15px 0' }}>
          <TextArea
            autoSize={{ minRows: 6, maxRows: 6 }}
            maxLength={140}
            showCount
            bordered={false}
            value={textAreaValue}
            placeholder={placeholder}
            onChange={(e) => setTextAreaValue(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  )
}

export default function CommentList(prop: IProp) {
  const user = useSelector((store: Store) => store.user)
  const { dataSource, like, share, reply, onDelete, hasModal } = prop

  // const [hover, setHover] = useState(false)
  const [hoverCommentId, setHoverCommentId] = useState<number>()

  const [open, setOpen] = useState(false)
  const [commentId, setCommentId] = useState<number>()
  const [placeholder, setPlaceholder] = useState<string>('')

  const mouseEnter = (commentId: number) => {
    // setHover(true)
    setHoverCommentId(commentId)
  }

  const mouseLeave = () => {
    // setHover(true)
    setHoverCommentId(-1)
  }

  const onReply = (commentId: number, nickname: string) => {
    if (hasModal) {
      setCommentId(commentId)
      setPlaceholder(`回复${nickname}:`)
      setOpen(true)
    } else {
      reply(commentId, nickname)
    }
  }

  return (
    <>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item key={item.commentId}>
            <div className={style.wrap} onMouseEnter={() => mouseEnter(item.commentId)} onMouseLeave={mouseLeave}>
              <div className={style.img}>
                <img src={item.user.avatarUrl} className={style.img} alt='' />
              </div>
              <div className={style.info}>
                <div>
                  <span className={style.nickname}>{item.user.nickname}</span>
                  <span> : </span>
                  <span>{item.content}</span>
                </div>
                {item.beReplied && item.beReplied.length > 0 && (
                  <div className={style.beReplied}>
                    {item.beReplied[0].content ? (
                      <>
                        <span className={style.nickname}>@{item.beReplied[0].user.nickname}</span>
                        <span> : </span>
                        <span>{item.beReplied[0].content}</span>
                      </>
                    ) : (
                      <div style={{ textAlign: 'center', color: '#626262' }}>该评论已删除</div>
                    )}
                  </div>
                )}
                <div className={style.action}>
                  {/* <div className={style.time}>{dayjs(item.time).format('YYYY-MM-DD hh:mm')}</div> */}
                  <div className={style.time}>{item.timeStr}</div>
                  <div className={style.icons}>
                    {(item.owner || item.user.userId === user.id) && item.commentId === hoverCommentId && (
                      <>
                        <span style={{ color: '#EC4141', cursor: 'pointer' }} onClick={() => onDelete(item.commentId)}>
                          删除
                        </span>
                        <span className={style.line}></span>
                      </>
                    )}
                    <div
                      style={{ display: 'inline-block', cursor: 'pointer' }}
                      onClick={() => like(item.commentId, item.liked as boolean)}
                    >
                      {item.liked ? (
                        <LikeOutlined className={style.icon_like} />
                      ) : (
                        <LikeOutlined className={style.icon} />
                      )}
                      <span style={{ marginLeft: '2px' }}>{item.likedCount}</span>
                    </div>
                    <span className={style.line}></span>
                    <ShareAltOutlined className={style.icon} onClick={share} />
                    <span className={style.line}></span>
                    <MessageOutlined
                      className={style.icon}
                      onClick={() => onReply(item.commentId, item.user.nickname)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
      <CommentModal
        open={open}
        setOpen={setOpen}
        commentId={commentId as number}
        placeholder={placeholder}
      ></CommentModal>
    </>
  )
}
