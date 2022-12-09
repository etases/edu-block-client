import { useClassroomUpdateForm } from '@hooks/use-form'
import {
  useAccountListByRoleQuery,
  useClassroomQuery,
  useReportQuery,
} from '@hooks/use-query'
import { useAccountStore, useTitleStore } from '@hooks/use-store'
import { SelectItem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'

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

const PAGE_TITLE = 'Classroom details'

export function useClassroomDetailsPage() {
  const { setTitle } = useTitleStore()

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

  const {
    query: { data: classroomDetails },
  } = useClassroomQuery()

  const {
    query: { data: teacherList },
    state: accountListState,
  } = useAccountListByRoleQuery({ role: 'TEACHER', limit: 5 })

  const updateForm = useClassroomUpdateForm()

  const [updateModalState, { close: closeUpdateModal, open: openUpdateModal }] =
    useDisclosure(false)

  const { account } = useAccountStore()

  const {
    utils: { generateSubjectReport, generateSemesterReport },
  } = useReportQuery()

  return {
    classroomDetails,
    teacherList: teacherList || [],
    form: { updateForm },
    state: {
      modal: {
        update: {
          updateModalState,
          closeUpdateModal,
          openUpdateModal,
        },
      },
      ...accountListState,
    },
    others: {
      account,
      searchSelectOption,
      generateSubjectReport,
      generateSemesterReport,
    },
  }
}
