import { useRoutes } from 'react-router-dom'

import routes from 'routes'

import style from './style.module.css'

export default function Main() {
  const element = useRoutes(routes)

  return <div className={style.main}>{element}</div>
}
