import { TableHeaderProps } from '@components/table'
import { useClassroomStudentQuery } from '@hooks/use-query'

const tableHeaders: TableHeaderProps<
  'studentId' | 'avatar' | 'firstName' | 'lastName' | 'name' | 'actions'
>[] = [
  {
    identifier: 'studentId',
    label: 'ID',
  },
  {
    identifier: 'firstName',
    label: 'First name',
  },
  {
    identifier: 'lastName',
    label: 'Last name',
  },
  {
    identifier: 'avatar',
    label: 'Avatar',
  },
  {
    identifier: 'actions',
    label: 'Actions',
  },
]

export function useClassroomStudentsPage() {
  const {
    query: { data: classroomStudents },
  } = useClassroomStudentQuery()

  return { table: { tableData: classroomStudents || [], tableHeaders } }
}
