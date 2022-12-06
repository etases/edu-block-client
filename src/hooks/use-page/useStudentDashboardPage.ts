import { TableHeaderProps } from '@components/table'
import { useStudentClassroomListQuery } from '@hooks/use-query'
import { useAccountStore } from '@hooks/use-store'
import { useNavigate } from 'react-router-dom'

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
    label: 'Classroom Id',
  },
  {
    identifier: 'classroomName',
    label: 'Classroom name',
  },
  {
    identifier: 'classroomGrade',
    label: 'Grade',
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

export function useStudentDashboardPage() {
  const {
    query: { data: classroomList },
  } = useStudentClassroomListQuery()

  const navigate = useNavigate()

  const { account } = useAccountStore()

  return {
    table: {
      tableData: classroomList || [],
      tableHeaders,
    },
    others: { navigate, account },
  }
}
