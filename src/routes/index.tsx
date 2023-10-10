import navMenuList from './navMenuList'

import { RouteObject } from 'react-router-dom'
import { NavMenuObject } from './routes'

const routes: RouteObject[] = navMenuList.map((item: NavMenuObject): RouteObject => {
  return {
    path: item.path + (item.meta.search ? item.meta.search : ''),
    element: item.element,
    children: item.children
  }
})

// const routes: RouteObject[] = [
//   {
//     path: "/",
//     element: <Navigate to="discoveringMusic" />,
//   },
//   {
//     path: "discoveringMusic",
//     element: <DiscoveringMusic />,
//   },
//   {
//     path: "podcast",
//     element: <Podcast />,
//   },
//   {
//     path: "myMusic",
//     children: [
//       {
//         path: "favoriteMusic",
//         element: <DiscoveringMusic />,
//       },
//     ],
//   },
// ]

export default routes
