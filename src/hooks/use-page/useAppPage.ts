import { usePersonalInfoQuery } from '@hooks/use-query'
import { useAccessTokenStore, useAccountStore } from '@hooks/use-store'
import { useMantineTheme } from '@mantine/core'
import { notifyInformation } from '@utilities/functions'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function useAppPage() {
  // navigating function
  const navigate = useNavigate()

  const { accessToken, resetAccessToken } = useAccessTokenStore()
  const { resetAccount } = useAccountStore()

  // return to login if no accessToken found
  if (accessToken.length === 0) navigate('/login')

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
