import { useLoginForm } from '@hooks/use-form'
import {
  useAccessTokenStore,
  useAccountStore,
  useTitleStore,
} from '@hooks/use-store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PAGE_TITLE = 'Login'

export function useLoginPage() {
  const navigate = useNavigate()

  const { accessToken } = useAccessTokenStore()
  const {
    account: { role: accountRole },
  } = useAccountStore()
  const { setTitle } = useTitleStore()

  if (accessToken.length !== 0) navigate(`/app`)

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

  const form = useLoginForm()

  return { form }
}
