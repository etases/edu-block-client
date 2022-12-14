import { usePersonalInfoQuery } from '@hooks/use-query'
import {
  useAccessTokenStore,
  useAccountStore,
  useTitleStore,
} from '@hooks/use-store'
import { useMantineTheme } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { notifyInformation } from '@utilities/functions'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PAGE_TITLE = 'App'

export function useAppPage() {
  const { setTitle } = useTitleStore()

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

  // navigating function
  const navigate = useNavigate()

  const { accessToken, resetAccessToken } = useAccessTokenStore()
  const { resetAccount } = useAccountStore()
  const queryClient = useQueryClient()

  // return to login if no accessToken found
  if (accessToken.length === 0) {
    queryClient.getQueryCache().clear()
    navigate('/login')
  }

  const { refetch: fetchPersonalData } = usePersonalInfoQuery()

  useEffect(() => {
    fetchPersonalData()
  }, [])

  function logout() {
    notifyInformation({ message: 'User logged out' })
    resetAccount()
    resetAccessToken()
  }

  const {
    colors: { gray },
  } = useMantineTheme()

  return { logout, colors: { gray } }
}
