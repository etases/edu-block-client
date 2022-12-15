import { TableHeaderProps } from '@components/table'
import { useClassroomAddTeacherForm } from '@hooks/use-form'
import {
  useAccountListByRoleQuery,
  useClassroomTeacherDeleteMutation,
  useClassroomTeacherQuery,
  useSubjectQuery,
} from '@hooks/use-query'
import { useAccountStore, useTitleStore } from '@hooks/use-store'
import { useTranslation } from '@hooks/use-translation'
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
    label: 'CLASS.TEACHER.SUBJECT',
  },
  {
    identifier: 'teacherName',
    label: 'CLASS.TEACHER.NAME',
  },
  {
    identifier: 'teacherAvatar',
    label: 'CLASS.TEACHER.AVATAR',
  },
  {
    identifier: 'teacherEmail',
    label: 'CLASS.TEACHER.EMAIL',
  },
  {
    identifier: 'actions',
    label: 'CLASS.TEACHER.ACTION',
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
  const { translatedObject } = useTranslation(tableHeaders.reduce((result, {label}) => ({
    ...result,
    [label]: null
  }), {} as any))
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
      tableHeaders: tableHeaders.map(({label,...item}) => ({...item,label: translatedObject?.[label]})) as typeof tableHeaders,
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
