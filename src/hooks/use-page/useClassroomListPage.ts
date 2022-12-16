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
  classroom: 'CLASS.SEARCH.CATEGORY.CLASS',
  teacher: 'CLASS.SEARCH.CATEGORY.HOMEROOM',
}

const searchSelectOption: SelectItem[] = [
  {
    value: 'id',
    label: "SEARCH.CLASSROOM.ID",
    group: searchSelectCategoryGroup.classroom,
  },
  {
    value: 'name',
    label: 'SEARCH.CLASSROOM.NAME',
    group: searchSelectCategoryGroup.classroom,
  },
  {
    value: 'grade',
    label: 'SEARCH.CLASSROOM.GRADE',
    group: searchSelectCategoryGroup.classroom,
  },
  {
    value: 'homeroomTeacherId',
    label: 'SEARCH.HOMEROOM.HOMEROOMID',
    group: searchSelectCategoryGroup.teacher,
  },
  {
    value: 'homeroomTeacherUserName',
    label: 'SEARCH.HOMEROOM.USERNAME',
    group: searchSelectCategoryGroup.teacher,
  },
  {
    value: 'homeroomTeacherFirstName',
    label: 'SEARCH.HOMEROOM.FIRST',
    group: searchSelectCategoryGroup.teacher,
  },
  {
    value: 'homeroomTeacherLastName',
    label: 'SEARCH.HOMEROOM.LAST',
    group: searchSelectCategoryGroup.teacher,
  },
  {
    value: 'homeroomTeacherEmail',
    label: 'SEARCH.HOMEROOM.EMAIL',
    group: searchSelectCategoryGroup.teacher,
  },
  {
    value: 'homeroomTeacherPhone',
    label: 'SEARCH.HOMEROOM.PHONE',
    group: searchSelectCategoryGroup.teacher,
  },
]

const searchSelectTeacherCategoryGroup = {
  id: 'ID',
  name: 'CLASS.TEACHER.ADD.SEARCH.TITLE.NAME',
  misc: 'CLASS.TEACHER.ADD.SEARCH.TITLE.MISC',
}

const searchSelectTeacherOption: SelectItem[] = [
  {
    value: 'id',
    label: 'CLASS.TEACHER.ADD.SEARCH.ID',
    group: searchSelectTeacherCategoryGroup.id,
  },
  {
    value: 'username',
    label: 'CLASS.TEACHER.ADD.SEARCH.USERNAME',
    group: searchSelectTeacherCategoryGroup.id,
  },
  {
    value: 'firstname',
    label: 'CLASS.TEACHER.ADD.SEARCH.FIRST',
    group: searchSelectTeacherCategoryGroup.name,
  },
  {
    value: 'lastname',
    label: 'CLASS.TEACHER.ADD.SEARCH.LAST',
    group: searchSelectTeacherCategoryGroup.name,
  },
  {
    value: 'email',
    label: 'CLASS.TEACHER.ADD.SEARCH.EMAIL',
    group: searchSelectTeacherCategoryGroup.id,
  },
  {
    value: 'phone',
    label: 'CLASS.TEACHER.ADD.SEARCH.PHONE',
    group: searchSelectTeacherCategoryGroup.misc,
  },
]

const PAGE_TITLE = 'Classroom list'

export function useClassroomListPage() {
  const { translatedObject: translatedSearchItems } = useTranslation(searchSelectOption.reduce((result, {label="", group=""}) => ({
    ...result,
    [label]: null,
    [group]: null
  }), {} as any))


  const { translatedObject: translatedSearchSelectTeacherOption } = useTranslation(searchSelectTeacherOption.reduce((result, {label="", group=""}) => ({
    ...result,
    [label]: null,
    [group]: null
  }), {} as any))

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
      searchSelectOption: searchSelectOption.map(({label="", group="", ...item}) => ({...item,label: translatedSearchItems?.[label], group: translatedSearchItems?.[group]})) as typeof searchSelectOption,
      searchSelectTeacherOption: searchSelectTeacherOption.map(({label="", group="", ...item}) => ({...item,label: translatedSearchSelectTeacherOption?.[label], group: translatedSearchSelectTeacherOption?.[group]})) as typeof searchSelectTeacherOption,
      navigate,
      teacherList: teacherList || [],
      account,
    },
  }
}
