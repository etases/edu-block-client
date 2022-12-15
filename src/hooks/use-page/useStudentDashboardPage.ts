import { TableHeaderProps } from '@components/table'
import { useStudentClassroomListQuery } from '@hooks/use-query'
import { useAccountStore } from '@hooks/use-store'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '@hooks/use-translation'

const tableHeaders: TableHeaderProps<
  | 'classroomId'
  | 'classroomName'
  | 'classroomGrade'
  | 'teacherAvatar'
  | 'teacherEmail'
  | 'teacherName'
  | 'actions'
>[] = [
  {
    identifier: 'classroomId',
    label: 'STUDENT_DASHBOARD.TABLE.CLASSROOM_ID',
  },
  {
    identifier: 'classroomName',
    label: 'STUDENT_DASHBOARD.TABLE.CLASSROOM_NAME',
  },
  {
    identifier: 'classroomGrade',
    label: 'STUDENT_DASHBOARD.TABLE.GRADE',
  },
  {
    identifier: 'teacherName',
    label: 'STUDENT_DASHBOARD.TABLE.TEACHER',
  },
  {
    identifier: 'teacherAvatar',
    label: 'STUDENT_DASHBOARD.TABLE.TEACHER AVATAR',
  },
  {
    identifier: 'teacherEmail',
    label: 'STUDENT_DASHBOARD.TABLE.TEACHER EMAIL',
  },
  {
    identifier: 'actions',
    label: 'STUDENT_DASHBOARD.TABLE.ACTIONS',
  },
]

export function useStudentDashboardPage() {
  const {
    query: { data: classroomList },
  } = useStudentClassroomListQuery()

  const navigate = useNavigate()

  const { account } = useAccountStore()
  // Verified Statistic Access Token
  const { translatedObject } = useTranslation(tableHeaders.reduce((result, {label}) => ({
    ...result,
    [label]: null
  }), {} as any))

  return {
    table: {
      tableData: classroomList || [],
      tableHeaders: tableHeaders.map(({label,...item}) => ({...item,label: translatedObject?.[label]})) as typeof tableHeaders,
    },
    others: { navigate, account },
  }
}
