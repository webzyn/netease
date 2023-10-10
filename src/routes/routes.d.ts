export interface Meta {
  jump: Boolean // 是否可跳转
  showNav: Boolean // 是否显示在左侧导航栏
  child?: Boolean // 是否子节点
  icon?: string // 左侧图标
  iconTwo?: string // 右侧图标
  collapsible?: boolean // 是否可折叠(一级菜单有效)
  search?: string // search参数
  searchValue?: {
    // search值->NavLink使用
    [key]: any
  }
}

export interface NavMenuObject {
  path: string
  name: string
  element?: ReactNode
  meta: Meta
  children?: NavMenuObject[]
}
