import { useAccountStore, useTitleStore } from '@hooks/use-store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PAGE_TITLE = 'Dashboard'

export function useDashboardPage() {
  const { setTitle } = useTitleStore()
  const navigate = useNavigate()

  const { account } = useAccountStore()

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

  useEffect(() => {
    if (account.role?.length > 0) navigate(account.role.toLowerCase())
  }, [account.role])

  return {}
}
