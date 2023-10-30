type Artist = {
  id: number
  name: string
  [key: string]: any
}
export default interface Album {
  id: number
  name: string
  picUrl: string
  artist: Artist
  artists: Artist[]
  description: string
  [key: string]: any
}
