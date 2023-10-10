import Header from 'components/Layout/Header'
import Footer from 'components/Layout/Footer'
import Container from 'components/Layout/Container'
import Nav from 'components/Layout/Nav'
import Main from 'components/Layout/Main'

import { get } from 'request'
import { useEffect } from 'react'

import { useDispatch } from 'react-redux/es/exports'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { setSongSheetList, resetSongSheetList } from 'store/festures/songSheetList'

import './App.css'

import { SongSheetList } from 'types/api'
interface Result {
  code: number
  more: Boolean
  playlist: SongSheetList
  version: string
}

function App() {
  const user = useSelector((store: any) => store.user)
  const dispatch = useDispatch()

  useEffect(() => {
    getPlayList()
  }, [])

  const getPlayList = async () => {
    if (user.isLogin) {
      const res: Result = (await get('/user/playlist', { uid: user.id })) as Result
      if (res.code === 200 && res.playlist) {
        dispatch(setSongSheetList(res.playlist))
      }
    } else {
      dispatch(resetSongSheetList())
    }
  }
  return (
    <div className='App'>
      <Header />
      <Container>
        <Nav />
        <Main />
      </Container>
      <Footer />
    </div>
  )
}

export default App
