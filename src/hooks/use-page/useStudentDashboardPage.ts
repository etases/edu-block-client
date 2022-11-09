import { TableHeaderProps } from '@components/table'
import { useStudentClassroomListQuery } from '@hooks/use-query'

const tableHeaders: TableHeaderProps<
  | 'classroomId'
  | 'classroomName'
  | 'classroomGrade'
  | 'teacherAvatar'
  | 'teacherEmail'
  | 'teacherName'
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
]

export function useStudentDashboardPage() {
  const {
    query: { data: classroomList },
  } = useStudentClassroomListQuery()

  return {
    table: { tableData: classroomList || [], tableHeaders },
  }
}
