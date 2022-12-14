import { TableHeaderProps } from '@components/table'
import {
  useAccountListCreateForm,
  useAccountListPasswordUpdateForm,
  useProfileUpdateForm
} from '@hooks/use-form'
import { useAccountListQuery } from '@hooks/use-query'
import { useAccountStore, useTitleStore } from '@hooks/use-store'
import { useTranslation } from '@hooks/use-translation'
import { SelectItem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const tableHeaders: TableHeaderProps<
  | 'id'
  | 'role'
  | 'avatar'
  | 'dob'
  | 'username'
  | 'firstName'
  | 'lastName'
  | 'isMale'
  | 'actions'
>[] = [
  {
    identifier: 'id',
    label: 'ID',
  },
  {
    identifier: 'username',
    label: 'Username',
    align: 'left',
  },
  {
    identifier: 'firstName',
    label: 'ACCOUNT_LIST_PAGE.TABLE.HEADER.FIRST_NAME',
    align: 'left',
  },
  {
    identifier: 'lastName',
    label: 'Last Name',
    align: 'left',
  },
  {
    identifier: 'avatar',
    label: 'Avatar',
  },
  {
    identifier: 'dob',
    label: 'Date of Birth',
  },
  {
    identifier: 'isMale',
    label: 'Gender',
  },
  {
    identifier: 'role',
    label: 'Role',
  },
  {
    identifier: 'actions',
    label: 'Actions',
  },
]

const searchSelectCategoryGroup = {
  id: 'Identity',
  name: 'Name',
  misc: 'Misc',
}

const searchSelectOption: SelectItem[] = [
  {
    value: 'id',
    label: 'Id',
    group: searchSelectCategoryGroup.id,
  },
  {
    value: 'username',
    label: 'Username',
    group: searchSelectCategoryGroup.id,
  },
  {
    value: 'firstname',
    label: 'First name',
    group: searchSelectCategoryGroup.name,
  },
  {
    value: 'lastname',
    label: 'Last name',
    group: searchSelectCategoryGroup.name,
  },
  {
    value: 'email',
    label: 'Email',
    group: searchSelectCategoryGroup.id,
  },
  {
    value: 'phone',
    label: 'Phone number',
    group: searchSelectCategoryGroup.misc,
  },
]

const roleColor = {
  ADMIN: 'red',
  STAFF: 'orange',
  TEACHER: 'blue',
  STUDENT: 'violet',
}

const PAGE_TITLE = 'Account list'

export function useAccountListPage() {
  const { setTitle } = useTitleStore()

  const { translatedObject } = useTranslation(tableHeaders.reduce((result, {label}) => ({
    ...result,
    [label]: null
  }), {} as any))

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

  const {
    query: { data },
    state,
  } = useAccountListQuery()

  const profileForm = useProfileUpdateForm()

  const { account } = useAccountStore()

  const [
    profileUpdateModalState,
    { close: closeProfileUpdateModal, open: openProfileUpdateModal },
  ] = useDisclosure(false)

  const [searchViewState, { close: closeSearchView, open: openSearchView }] =
    useDisclosure(false)

  const createForm = useAccountListCreateForm()

  const [createModalState, { open: openCreateModal, close: closeCreateModal }] =
    useDisclosure(false)

  const passwordForm = useAccountListPasswordUpdateForm()

  const [
    passwordUpdateModalState,
    { close: closePasswordUpdateModal, open: openPasswordUpdateModal },
  ] = useDisclosure(false)

  const navigate = useNavigate()

  return {
    table: {
      accountList: data?.accounts || [],
      tableHeaders: tableHeaders.map(({label,...item}) => ({...item,label: translatedObject?.[label]})) as typeof tableHeaders,
    },
    state: {
      profileUpdateModal: {
        profileUpdateModalState,
        closeProfileUpdateModal,
        openProfileUpdateModal,
      },
      searchPopover: {
        searchViewState,
        closeSearchView,
        openSearchView,
      },
      createModal: {
        createModalState,
        openCreateModal,
        closeCreateModal,
      },
      passwordModal: {
        passwordUpdateModalState,
        closePasswordUpdateModal,
        openPasswordUpdateModal,
      },
      ...state,
    },
    others: {
      searchSelectOption,
      roleColor,
      navigate,
    },
    form: { profileForm, createForm, passwordForm },
    account,
  }
}
