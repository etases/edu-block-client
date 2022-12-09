import {
  useAccountUpdatePasswordForm,
  useProfileUpdateForm,
} from '@hooks/use-form'
import { useAccountInfoQuery } from '@hooks/use-query'
import { useAccountStore, useTitleStore } from '@hooks/use-store'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'

const PAGE_TITLE = 'Profile'

export function useAccountProfilePage() {
  const { setTitle } = useTitleStore()

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

  const {
    query: { data },
  } = useAccountInfoQuery()

  const { account } = useAccountStore()

  const [
    profileUpdateModalState,
    { close: closeProfileUpdateModal, open: openProfileUpdateModal },
  ] = useDisclosure(false)

  const [
    passwordUpdateModalState,
    { close: closePasswordUpdateModal, open: openPasswordUpdateModal },
  ] = useDisclosure(false)

  const profileForm = useProfileUpdateForm()

  const passwordForm = useAccountUpdatePasswordForm()

  return {
    accountProfile: data,
    modals: {
      profile: {
        profileUpdateModalState,
        closeProfileUpdateModal,
        openProfileUpdateModal,
      },
      password: {
        passwordUpdateModalState,
        closePasswordUpdateModal,
        openPasswordUpdateModal,
      },
    },
    forms: { profileForm, passwordForm },
    others: { account },
  }
}
