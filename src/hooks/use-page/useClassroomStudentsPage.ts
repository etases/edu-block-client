import { TableHeaderProps } from '@components/table'
import { useClassroomAddStudentForm } from '@hooks/use-form'
import {
  useAccountListByRoleQuery,
  useClassroomStudentDeleteMutation,
  useClassroomStudentQuery,
} from '@hooks/use-query'
import { useAccountStore } from '@hooks/use-store'
import { SelectItem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useNavigate, useParams } from 'react-router-dom'

const tableHeaders: TableHeaderProps<
  'studentId' | 'avatar' | 'firstName' | 'lastName' | 'name' | 'actions'
>[] = [
  {
    identifier: 'studentId',
    label: 'ID',
  },
  {
    identifier: 'firstName',
    label: 'First name',
  },
  {
    identifier: 'lastName',
    label: 'Last name',
  },
  {
    identifier: 'avatar',
    label: 'Avatar',
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

export function useClassroomStudentsPage() {
  const {
    query: { data: classroomStudents },
  } = useClassroomStudentQuery()

  const {
    query: { data: studentList },
    state: studentListState,
  } = useAccountListByRoleQuery({ role: 'STUDENT', limit: 5 })

  const addForm = useClassroomAddStudentForm()

  const {
    mutation: { mutate: deleteStudent },
  } = useClassroomStudentDeleteMutation()

  const [
    addStudentModalState,
    { close: closeAddStudentModal, open: openAddStudentModal },
  ] = useDisclosure(false)

  const navigate = useNavigate()
  const { classroomId } = useParams()
  const { account } = useAccountStore()

  return {
    table: { tableData: classroomStudents || [], tableHeaders },
    form: { addForm },
    state: {
      modal: {
        addStudent: {
          addStudentModalState,
          closeAddStudentModal,
          openAddStudentModal,
        },
      },
      studentListState,
    },
    others: {
      account,
      classroomId,
      deleteStudent,
      searchSelectOption,
      studentList: studentList || [],
      navigate,
    },
  }
}
