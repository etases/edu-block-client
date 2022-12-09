import { TableHeaderProps } from '@components/table'
import { useClassroomAddTeacherForm } from '@hooks/use-form'
import {
  useAccountListByRoleQuery,
  useClassroomTeacherDeleteMutation,
  useClassroomTeacherQuery,
  useSubjectQuery,
} from '@hooks/use-query'
import { useAccountStore, useTitleStore } from '@hooks/use-store'
import { SelectItem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'

const tableHeaders: TableHeaderProps<
  | 'teacherId'
  | 'teacherAvatar'
  | 'teacherFirstName'
  | 'teacherLastName'
  | 'teacherName'
  | 'teacherEmail'
  | 'subjectId'
  | 'subjectName'
  | 'subjectIdentifier'
  | 'actions'
>[] = [
  {
    identifier: 'subjectIdentifier',
    label: 'Subject',
  },
  {
    identifier: 'teacherName',
    label: 'Teacher',
  },
  {
    identifier: 'teacherAvatar',
    label: 'Teacher avatar',
  },
  {
    identifier: 'teacherEmail',
    label: 'Teacher email',
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

const PAGE_TITLE = 'Classroom teachers'

export function useClassroomTeachersPage() {
  const { setTitle } = useTitleStore()

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])
  const {
    query: { data: classroomTeachers },
  } = useClassroomTeacherQuery()

  const {
    query: { data: teacherList },
    state: teacherListState,
  } = useAccountListByRoleQuery({ role: 'TEACHER', limit: 5 })

  const {
    query: { data: subjectList },
  } = useSubjectQuery()

  const addForm = useClassroomAddTeacherForm()

  const {
    mutation: { mutate: removeTeacher },
  } = useClassroomTeacherDeleteMutation()

  const [
    addTeacherModalState,
    { close: closeAddTeacherModal, open: openAddTeacherModal },
  ] = useDisclosure(false)

  const { account } = useAccountStore()

  return {
    table: {
      tableHeaders,
      tableData: classroomTeachers || [],
    },
    form: { addForm },
    others: {
      teacherList: teacherList || [],
      subjectList: subjectList || [],
      searchSelectOption,
      removeTeacher,
      account,
    },
    state: {
      teacherListState,
      modal: {
        addTeacher: {
          addTeacherModalState,
          closeAddTeacherModal,
          openAddTeacherModal,
        },
      },
    },
  }
}
