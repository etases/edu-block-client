import { TableHeaderProps } from '@components/table'
import { useClassroomCreateForm, useClassroomUpdateForm } from '@hooks/use-form'
import { useClassroomListQuery } from '@hooks/use-query'
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

export function useClassroomListPage() {
  const {
    query: { data: classroomsData },
    state,
  } = useClassroomListQuery()

  const updateClassroomForm = useClassroomUpdateForm()

  const [
    classroomUpdateModalState,
    { close: closeClassroomUpdateModal, open: openClassroomUpdateModal },
  ] = useDisclosure(false)

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
    form: { updateClassroomForm, createClassroomForm },
    state: {
      modal: {
        classroomUpdateModal: {
          classroomUpdateModalState,
          closeClassroomUpdateModal,
          openClassroomUpdateModal,
        },
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
      ...state,
    },
    others: {
      searchSelectOption,
      navigate,
    },
  }
}
