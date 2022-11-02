import { useRoutes } from 'react-router-dom'
import { routes as appRoutes } from './appRoutes'

/**
 * @deprecated
 */
export function Routes() {
  const routes = useRoutes([appRoutes({ role: 'ADMIN' })])
  return routes
}
