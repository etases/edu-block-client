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
    label: 'ACCOUNT_LIST_PAGE.TABLE.HEADER.USERNAME',
    align: 'left',
  },
  {
    identifier: 'firstName',
    label: 'ACCOUNT_LIST_PAGE.TABLE.HEADER.FIRST_NAME',
    align: 'left',
  },
  {
    identifier: 'lastName',
    label: 'ACCOUNT_LIST_PAGE.TABLE.HEADER.LAST_NAME',
    align: 'left',
  },
  {
    identifier: 'avatar',
    label: 'ACCOUNT_LIST_PAGE.TABLE.HEADER.AVATAR',
  },
  {
    identifier: 'dob',
    label: 'ACCOUNT_LIST_PAGE.TABLE.HEADER.DOB',
  },
  {
    identifier: 'isMale',
    label: 'ACCOUNT_LIST_PAGE.TABLE.HEADER.GENDER',
  },
  {
    identifier: 'role',
    label: 'ACCOUNT_LIST_PAGE.TABLE.HEADER.ROLE',
  },
  {
    identifier: 'actions',
    label: 'ACCOUNT_LIST_PAGE.TABLE.HEADER.ACTIONS',
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
    label: 'ACCOUNT_PROFILE.TEXT.USERNAME',
    group: searchSelectCategoryGroup.id,
  },
  {
    value: 'firstname',
    label: 'ACCOUNT_PROFILE.TEXT_INPUT.FIRST_NAME',
    group: searchSelectCategoryGroup.name,
  },
  {
    value: 'lastname',
    label: 'ACCOUNT_PROFILE.TEXT_INPUT.LAST_NAME',
    group: searchSelectCategoryGroup.name,
  },
  {
    value: 'email',
    label: 'ACCOUNT_PROFILE.TEXT_INPUT.EMAIL',
    group: searchSelectCategoryGroup.id,
  },
  {
    value: 'phone',
    label: 'ACCOUNT_PROFILE.TEXT_INPUT.PHONE',
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

const translationsButtons = {
  "ACCOUNT.BUTTON.SEARCH": null,
  "ACCOUNT.BUTTON.CREATE": null,
  "STUDENT_PROFILE.BUTTON.SUBMIT": null,
  "ACCOUNT_PROFILE.BUTTON.UPDATE": null,
  "STUDENT_DASHBOARD.TABLE.DETAILS": null
}

const translationsPlaceHolder = {
  "ACCOUNT.BUTTON.SEARCH_IN": null,
  "ACCOUNT.BUTTON.SEARCH_TEXT": null,
  "ACCOUNT_PROFILE.TEXT_INPUT.FIRST_NAME": null,
  "ACCOUNT_PROFILE.TEXT_INPUT.LAST_NAME": null,
  "PROFILE.ROLE": null
}

const translationText = {
  "ACCOUNT.TEXT.UPDATE_ACCOUNT_PROFILE": null,
  "ACCOUNT.TEXT.UPDATE_PASSWORD": null,
  "ACCOUNT.TEXT.CREATE_ACCOUNT": null,
  "ACCOUNT_LIST.LABEL.REMOVE": null,
  "ACCOUNT_LIST.LABEL.CLEAR_ALL": null,
  "ACCOUNT_LIST.LABEL.ADD_ACCOUNT": null,
  "ACCOUNT_LIST.LABEL.CREATE_ACCOUNTS": null,
  "ACCOUNT_LIST.SELECT_INPUT.ADMIN": null,
  "ACCOUNT_LIST.SELECT_INPUT.STAFF": null,
  "ACCOUNT_LIST.SELECT_INPUT.TEACHER": null,
  "ACCOUNT_LIST.SELECT_INPUT.STUDENT": null,
  "ACCOUNT_PROFILE.TEXT_INPUT.FIRST_NAME": null,
  "ACCOUNT_PROFILE.TEXT_INPUT.LAST_NAME": null,
  "ACCOUNT_PROFILE.TEXT_INPUT.GENDER": null,
  "ACCOUNT_PROFILE.TEXT_INPUT.GENDER_MALE": null,
  "ACCOUNT_PROFILE.TEXT_INPUT.GENDER_FEMALE": null,
  "ACCOUNT_PROFILE.TEXT_INPUT.DOB": null,
  "ACCOUNT_PROFILE.TEXT_INPUT.PHONE": null,
  "ACCOUNT_PROFILE.TEXT_INPUT.EMAIL": null,
  "ACCOUNT_PROFILE.TEXT_INPUT.ADDRESS": null,
  "ACCOUNT_PROFILE.BUTTON.UPDATE_PROFILE": null,
  "ACCOUNT_PROFILE.BUTTON.UPDATE": null
} 

const translationTextRoot = {
  "ACCOUNT_LIST_PAGE.TITLE": null
}

export function useAccountListPage() {
  const { setTitle } = useTitleStore()

  const { translatedObject: translatedSearchItems } = useTranslation(searchSelectOption.reduce((result, {label=""}) => ({
    ...result,
    [label]: null
  }), {} as any))

  const { translatedObject: translatedObjectPlaceHolder } = useTranslation(translationsPlaceHolder)
  
  const { translatedObject: translatedTextRoot } = useTranslation(translationTextRoot)

  const { translatedObject: translatedText } = useTranslation(translationText)

  const { translatedObject: translatedObjectAccountListButtons } = useTranslation(translationsButtons)
  
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
      roleColor,
      navigate,
      translatedObjectAccountListButtons,
      translatedObjectPlaceHolder,
      translatedText,
      translationsButtons,
      searchSelectOption: searchSelectOption.map(({label="",...item}) => ({...item,label: translatedSearchItems?.[label]})) as typeof searchSelectOption
    },
    form: { profileForm, createForm, passwordForm },
    account,
    translatedTextRoot,
  }
}
