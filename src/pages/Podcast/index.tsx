import React, { Component, useMemo, useState } from 'react'

const Podcast = () => {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  const memo = useMemo(() => {
    return a + b
  }, [a, b])

  return (
    <div>
      <button onClick={() => setA(a + 1)}>a+1</button>
      <button onClick={() => setB(b + 1)}>b+1</button>
      <div>a:{a}</div>
      <div>b:{b}</div>
      <div>meno:{memo}</div>
    </div>
  )
}

export default Podcast
