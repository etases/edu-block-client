import { useTitleStore } from '@hooks/use-store'
import { useEffect } from 'react'

const PAGE_TITLE = 'Dashboard'

export function useDashboardPage() {
  const { setTitle } = useTitleStore()

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

  return {}
}
