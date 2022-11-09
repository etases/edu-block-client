import { TableHeaderProps } from '@components/table'
import { useTeacherClassroomListQuery } from '@hooks/use-query'
import { useNavigate } from 'react-router-dom'

const tableHeaders: TableHeaderProps<
  'classroomId' | 'classroomName' | 'classroomGrade' | 'actions'
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
    identifier: 'actions',
    label: 'Actions',
  },
]

export function useTeacherDashboardPage() {
  const {
    query: { data: classroomList },
  } = useTeacherClassroomListQuery()

  const navigate = useNavigate()

  return {
    table: { tableData: classroomList || [], tableHeaders },
    others: { navigate },
  }
}
