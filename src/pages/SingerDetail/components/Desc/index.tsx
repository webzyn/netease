import React, { useEffect, useState, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { getArtistDesc } from 'request/withOutLoginApi'
export default function Desc() {
  const { id } = useParams()
  const [briefDesc, setBriefDesc] = useState('')
  const [introduction, setIntroduction] = useState<{ ti: string; txt: string }[]>([])

  useEffect(() => {
    getArtistDesc(id as string).then((res) => {
      if (res.code === 200) {
        setBriefDesc(res.briefDesc)
        setIntroduction(res.introduction)
      }
    })
  }, [])

  const conver = (txt: string) => (
    <>
      {txt.split('\n').map((line, index) => (
        <p key={index} style={{ textIndent: '2em', lineHeight: 2 }}>
          {line}
        </p>
      ))}
    </>
  )

  return (
    <div style={{ padding: '0 30px', fontSize: '14px' }}>
      {briefDesc.length > 0 && (
        <>
          <div style={{ fontWeight: '900', padding: '30px 0 20px' }}>专辑详情</div>
          <div style={{ color: '#666666' }}>{conver(briefDesc)}</div>
        </>
      )}

      {introduction.map((item, index) => (
        <Fragment key={index}>
          <div style={{ fontWeight: '900', padding: '30px 0 20px' }}>{item.ti}</div>
          <div style={{ color: '#666666' }}>{conver(item.txt)}</div>
        </Fragment>
      ))}

      {briefDesc.length === 0 && introduction.length === 0 && (
        <div style={{ color: '#666666', fontSize: '14px', textAlign: 'center' }}>暂无数据</div>
      )}
    </div>
  )
}
