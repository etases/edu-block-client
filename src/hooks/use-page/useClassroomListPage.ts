import { TableHeaderProps } from '@components/table'
import { useClassroomCreateForm } from '@hooks/use-form'
import {
  useAccountListByRoleQuery,
  useClassroomListQuery,
} from '@hooks/use-query'
import { SelectItem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useNavigate } from 'react-router-dom'

const tableHeaders: TableHeaderProps<
  | 'classroomId'
  | 'classroomName'
  | 'classroomGrade'
  | 'teacherId'
  | 'teacherFirstName'
  | 'teacherLastName'
  | 'teacherAvatar'
  | 'teacherEmail'
  | 'teacherPhone'
  | 'teacherName'
  | 'actions'
>[] = [
  {
    identifier: 'classroomId',
    label: 'Class Id',
  },
  {
    identifier: 'classroomName',
    label: 'Class name',
  },
  {
    identifier: 'classroomGrade',
    label: 'Grade',
  },
  {
    identifier: 'teacherName',
    label: 'Teacher name',
  },
  {
    identifier: 'teacherAvatar',
    label: 'Teacher avatar',
  },
  {
    identifier: 'teacherEmail',
    label: 'Teacher Email',
  },
  {
    identifier: 'teacherPhone',
    label: 'Teacher phone',
  },
  {
    identifier: 'actions',
    label: 'Actions',
  },
]

const searchSelectCategoryGroup = {
  classroom: 'Classroom',
  teacher: 'Homeroom Teacher',
}

const searchSelectOption: SelectItem[] = [
  {
    value: 'id',
    label: 'Id',
    group: searchSelectCategoryGroup.classroom,
  },
  {
    value: 'name',
    label: 'Name',
    group: searchSelectCategoryGroup.classroom,
  },
  {
    value: 'grade',
    label: 'Grade',
    group: searchSelectCategoryGroup.classroom,
  },
  {
    value: 'homeroomTeacherId',
    label: 'Id',
    group: searchSelectCategoryGroup.teacher,
  },
  {
    value: 'homeroomTeacherUserName',
    label: 'Username',
    group: searchSelectCategoryGroup.teacher,
  },
  {
    value: 'homeroomTeacherFirstName',
    label: 'First name',
    group: searchSelectCategoryGroup.teacher,
  },
  {
    value: 'homeroomTeacherLastName',
    label: 'Last name',
    group: searchSelectCategoryGroup.teacher,
  },
  {
    value: 'homeroomTeacherEmail',
    label: 'Email',
    group: searchSelectCategoryGroup.teacher,
  },
  {
    value: 'homeroomTeacherPhone',
    label: 'Phone number',
    group: searchSelectCategoryGroup.teacher,
  },
]

const searchSelectTeacherCategoryGroup = {
  id: 'Identity',
  name: 'Name',
  misc: 'Misc',
}

const searchSelectTeacherOption: SelectItem[] = [
  {
    value: 'id',
    label: 'Id',
    group: searchSelectTeacherCategoryGroup.id,
  },
  {
    value: 'username',
    label: 'Username',
    group: searchSelectTeacherCategoryGroup.id,
  },
  {
    value: 'firstname',
    label: 'First name',
    group: searchSelectTeacherCategoryGroup.name,
  },
  {
    value: 'lastname',
    label: 'Last name',
    group: searchSelectTeacherCategoryGroup.name,
  },
  {
    value: 'email',
    label: 'Email',
    group: searchSelectTeacherCategoryGroup.id,
  },
  {
    value: 'phone',
    label: 'Phone number',
    group: searchSelectTeacherCategoryGroup.misc,
  },
]

export function useClassroomListPage() {
  const {
    query: { data: classroomsData },
    state: classListState,
  } = useClassroomListQuery()

  const {
    query: { data: teacherList },
    state: teacherListState,
  } = useAccountListByRoleQuery({ role: 'TEACHER', limit: 5 })

  const [searchViewState, { close: closeSearchView, open: openSearchView }] =
    useDisclosure(false)

  const [
    classroomCreateModalState,
    { close: closeClassroomCreateModal, open: openClassroomCreateModal },
  ] = useDisclosure(false)

  const createClassroomForm = useClassroomCreateForm()

  const navigate = useNavigate()

  return {
    table: { tableHeaders, classroomList: classroomsData || [] },
    form: { createClassroomForm },
    state: {
      modal: {
        searchView: {
          searchViewState,
          closeSearchView,
          openSearchView,
        },
        classroomCreateModal: {
          classroomCreateModalState,
          closeClassroomCreateModal,
          openClassroomCreateModal,
        },
      },
      classListState,
      teacherListState,
    },
    others: {
      searchSelectOption,
      searchSelectTeacherOption,
      navigate,
      teacherList: teacherList || [],
    },
  }
}
