import { TableHeaderProps } from '@components/table'
import { useClassroomCreateForm } from '@hooks/use-form'
import {
  useAccountListByRoleQuery,
  useClassroomListQuery,
} from '@hooks/use-query'
import { useAccountStore, useTitleStore } from '@hooks/use-store'
import { useTranslation } from '@hooks/use-translation'
import { SelectItem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const translate = {
  "CLASSROOM_LIST.CLASSID": null,
  "CLASSROOM_LIST.CLASSNAME": null,
  "CLASSROOM_LIST.GRADE": null,
  "CLASSROOM_LIST.TEACHER": null,
  "CLASSROOM_LIST.TEACHER_AVATAR": null,
  "CLASSROOM_LIST.TEACHER_EMAIL": null,
  "CLASSROOM_LIST.TEACHER_PHONE": null,
  "CLASSROOM_LIST.ACTIONS": null,
  "SEARCH.CLASSROOM.ID": null,
  "SEARCH.CLASSROOM.NAME": null,
  "SEARCH.CLASSROOM.GRADE": null,
  "SEARCH.HOMEROOM.HOMEROOMID": null,
  "SEARCH.HOMEROOM.USERNAME": null,
  "SEARCH.HOMEROOM.FIRST": null,
  "SEARCH.HOMEROOM.LAST": null,
  "SEARCH.HOMEROOM.EMAIL": null,
  "SEARCH.HOMEROOM.PHONE": null
}

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
    label: "CLASSROOM_LIST.CLASSID",
  },
  {
    identifier: 'classroomName',
    label: "CLASSROOM_LIST.CLASSNAME",
  },
  {
    identifier: 'classroomGrade',
    label: "CLASSROOM_LIST.GRADE",
  },
  {
    identifier: 'teacherName',
    label: "CLASSROOM_LIST.TEACHER",
  },
  {
    identifier: 'teacherAvatar',
    label: "CLASSROOM_LIST.TEACHER_AVATAR"
  },
  {
    identifier: 'teacherEmail',
    label: "CLASSROOM_LIST.TEACHER_EMAIL",
  },
  {
    identifier: 'teacherPhone',
    label: "CLASSROOM_LIST.TEACHER_PHONE",
  },
  {
    identifier: 'actions',
    label: "CLASSROOM_LIST.ACTIONS",
  },
]

const searchSelectCategoryGroup = {
  classroom: 'Classroom',
  teacher: 'Homeroom Teacher',
}

const searchSelectOption: SelectItem[] = [
  {
    value: 'id',
    label: "Class Id",
    group: searchSelectCategoryGroup.classroom,
  },
  {
    value: 'name',
    label: 'Class name',
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

const PAGE_TITLE = 'Classroom list'

export function useClassroomListPage() {
  const { translatedObject } = useTranslation(tableHeaders.reduce((result, {label}) => ({
    ...result,
    [label]: null
  }), {} as any))
  const { setTitle } = useTitleStore()

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

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

  const { account } = useAccountStore()

  return {
    table: { tableHeaders: tableHeaders.map(({label,...item}) => ({...item,label: translatedObject?.[label]})) as typeof tableHeaders, classroomList: classroomsData || [] },
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
      account,
    },
  }
}
