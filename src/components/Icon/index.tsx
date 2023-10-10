import { createFromIconfontCN } from '@ant-design/icons'

interface IProp {
  type: string
  style?: IStyle
  className?: string
}

interface IStyle {
  fontSize?: string
  [key: string]: any
  // color?: string // 不生效
}

const Icon: React.FC<IProp> = ({ type, style, className }) => {
  // 初始值
  const defaultStyle: IStyle = {
    fontSize: '16px'
    // color: '#ffffff'
  }
  const mergedStyle: IStyle = {
    ...defaultStyle,
    ...style
  }
  const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_4252679_jd3chn7adj.js', // 在 iconfont.cn 上生成
    extraCommonProps: {
      className,
      style: mergedStyle
      // style: {
      //   fontSize: mergedStyle.fontSize
      //   // color: mergedStyle.color
      // }
    }
  })
  return <MyIcon type={type} />
}

export default Icon
