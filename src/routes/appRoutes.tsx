import { App, Dashboard, Home, Login, NotFound, Root, Test } from '@pages'
import { Navigate, RouteObject } from 'react-router-dom'

const routes: RouteObject = {
  path: '/',
  element: <Root />,
  children: [
    {
      index: true,
      element: <Navigate to={'home'} />,
    },
    {
      path: 'home',
      element: <Home />,
    },
    { path: 'login', element: <Login /> },
    {
      path: 'app',
      element: <App />,
      children: [
        {
          index: true,
          element: <Navigate to={'dashboard'} />,
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
      ],
    },
    {
      path: 'test',
      element: <Test />,
    },
    { path: 'not-found', element: <NotFound /> },
    { path: '*', element: <Navigate to={'not-found'} /> },
  ],
}

export function appRoutes(): RouteObject[] {
  return [routes]
}
