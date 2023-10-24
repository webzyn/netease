import React, { useEffect } from 'react'
import { personalized } from 'request/withOutLoginApi'

export default function Customization() {
  useEffect(() => {
    personalized().then((res) => {
      console.log(res)
    })
  })
  return <div>Customization</div>
}
