import { TableHeaderProps } from '@components/table'
import { useClassroomAddStudentForm } from '@hooks/use-form'
import {
  useAccountListByRoleQuery,
  useClassroomStudentDeleteMutation,
  useClassroomStudentQuery,
} from '@hooks/use-query'
import { useAccountStore, useTitleStore } from '@hooks/use-store'
import { useTranslation } from '@hooks/use-translation'
import { SelectItem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const tableHeaders: TableHeaderProps<
  'studentId' | 'avatar' | 'firstName' | 'lastName' | 'name' | 'actions'
>[] = [
  {
    identifier: 'studentId',
    label: "CLASS.STUDENT.ID",
  },
  {
    identifier: 'firstName',
    label: 'CLASS.STUDENT.FIRSTNAME',
  },
  {
    identifier: 'lastName',
    label: 'CLASS.STUDENT.LASTNAME',
  },
  {
    identifier: 'avatar',
    label: 'CLASS.STUDENT.AVATAR',
  },
  {
    identifier: 'actions',
    label: 'CLASS.STUDENT.ACTION',
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

const PAGE_TITLE = 'Classroom students'

export function useClassroomStudentsPage() {
  const { translatedObject } = useTranslation(tableHeaders.reduce((result, {label}) => ({
    ...result,
    [label]: null
  }), {} as any))
  const { setTitle } = useTitleStore()

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

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
    table: { tableData: classroomStudents || [], tableHeaders: tableHeaders.map(({label,...item}) => ({...item,label: translatedObject?.[label]})) as typeof tableHeaders },
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
