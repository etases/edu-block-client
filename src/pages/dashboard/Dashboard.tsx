import { useDashboardPage } from '@hooks/use-page'
import { Outlet } from 'react-router-dom'

const PAGE_TITLE = 'Dashboard'

export function Dashboard() {
  const {} = useDashboardPage()

  return <Outlet />
}
