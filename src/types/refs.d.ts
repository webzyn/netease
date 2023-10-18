export interface LoginRef {
  showModal: () => void
}

export interface QrcodeLoginRef {
  qrcodeLogin: () => void
  closeCheckQrTimer: () => void
}

export interface PhoneLoginRef {
  setIsShow: (state: boolean) => void
}

export interface TabsRef {
  tabsDiv: HTMLDivElement
}

export interface DetailHeaderRef {
  rootDiv: HTMLDivElement
}
