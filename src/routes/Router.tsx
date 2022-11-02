import { useAccountStore } from '@hooks/use-store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ROLE, routes } from './appRoutes'

export function Router() {
  const { account } = useAccountStore()
  const router = createBrowserRouter([
    routes({ role: (account.role as ROLE) || 'GUEST' }),
  ])
  return <RouterProvider router={router} />
}
