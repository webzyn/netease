type FreeTrialPrivilege = {
  resConsumable: boolean
  userConsumable: boolean
  listenType: null
}

type ChargeInfoList = {
  rate: number
  chargeUrl: null
  chargeMessage: null
  chargeType: number
}

export default interface Privilege {
  id: number
  fee: number
  payed: number
  st: number
  pl: number
  dl: number
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number
  fl: number
  toast: boolean
  flag: number
  preSell: boolean
  playMaxbr: number
  downloadMaxbr: number
  maxBrLevel: string
  playMaxBrLevel: string
  downloadMaxBrLevel: string
  plLevel: string
  dlLevel: string
  flLevel: string
  rscl: null
  freeTrialPrivilege: FreeTrialPrivilege
  chargeInfoList: Array<ChargeInfoList>
}
