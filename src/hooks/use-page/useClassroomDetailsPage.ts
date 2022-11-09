import { useClassroomUpdateForm } from '@hooks/use-form'
import { useAccountListByRoleQuery, useClassroomQuery } from '@hooks/use-query'
import { SelectItem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

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

export function useClassroomDetailsPage() {
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
      searchSelectOption,
    },
  }
}
