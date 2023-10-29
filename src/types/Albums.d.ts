export default interface Albums {
  id: number
  name: string
  picUrl: string
  artist: {
    id: number
    name: string
  }
  [key: string]: any
}
