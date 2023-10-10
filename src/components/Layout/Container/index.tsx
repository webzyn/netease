import React, { Component, ReactNode } from "react"
import style from "./style.module.css"

interface IProp {
  children?: ReactNode
}

export default class container extends Component<IProp> {
  render() {
    return <div className={style.container}>{this.props.children}</div>
  }
}
