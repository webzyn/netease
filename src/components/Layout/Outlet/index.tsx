import { useOutlet } from "react-router-dom"

export default function Outlet() {
  return <div>{useOutlet()}</div>
}
