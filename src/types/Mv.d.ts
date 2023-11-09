import { Artist } from 'types'

export default interface Mv {
  artist: Artist
  artistName: string
  duration: number
  id: number
  imgurl: string
  imgurl16v9: string
  name: string
  playCount: number
  publishTime: string
  status: number
  subed: boolean
}
