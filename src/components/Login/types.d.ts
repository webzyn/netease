export interface Qrcode {
  code: number
  data: Unikey
}
interface Unikey {
  code: number
  unikey: string
}

export interface Create {
  code: number
  data: Qrurl
}
interface Qrurl {
  qrimg: string
  qrurl: string
}

export interface Check {
  code: number
  cookie: string
  message: string
  avatarUrl?: string
  nickname?: string
}

export type QrcodeStatus = 'active' | 'expired' | 'loading'
