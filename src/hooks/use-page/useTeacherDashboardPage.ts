import { TableHeaderProps } from '@components/table'
import { useTeacherClassroomListQuery } from '@hooks/use-query'
import { useTranslation } from '@hooks/use-translation'
import { useNavigate } from 'react-router-dom'






const tableHeaders: TableHeaderProps<
  'classroomId' | 'classroomName' | 'classroomGrade' | 'actions'
>[] = [
  {
    identifier: 'classroomId',
    label: "TEACHER.DASHBOARD.CLASSROOM_ID",
  },
  {
    identifier: 'classroomName',
    label: "TEACHER.DASHBOARD.CLASSROOM_NAME",
  },
  {
    identifier: 'classroomGrade',
    label: "TEACHER.DASHBOARD.GRADE",
  },
  {
    identifier: 'actions',
    label: "TEACHER.DASHBOARD.ACTIONS",
  },
]

export function useTeacherDashboardPage() {
  const { translatedObject } = useTranslation(tableHeaders.reduce((result, {label}) => ({
    ...result,
    [label]: null
  }), {} as any))

  const {
    query: { data: classroomList },
  } = useTeacherClassroomListQuery()

  const navigate = useNavigate()

  return {
    table: { tableData: classroomList || [], tableHeaders: tableHeaders.map(({label,...item}) => ({...item,label: translatedObject?.[label]})) as typeof tableHeaders },
    others: { navigate },
  }
}
