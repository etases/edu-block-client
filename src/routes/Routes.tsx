import { useRoutes } from 'react-router-dom'
import { appRoutes } from './appRoutes'

export function Routes() {
  const routes = useRoutes(appRoutes())
  return routes
}
