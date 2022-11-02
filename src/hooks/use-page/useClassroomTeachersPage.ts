import { TableHeaderProps } from '@components/table'
import { useClassroomTeacherQuery } from '@hooks/use-query'

const tableHeaders: TableHeaderProps<
  | 'teacherId'
  | 'teacherAvatar'
  | 'teacherFirstName'
  | 'teacherLastName'
  | 'teacherName'
  | 'subjectId'
  | 'subjectName'
  | 'actions'
>[] = [
  {
    identifier: 'subjectName',
    label: 'Subject',
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
    identifier: 'actions',
    label: 'Actions',
  },
]

export function useClassroomTeachersPage() {
  const {
    query: { data: classroomTeachers },
  } = useClassroomTeacherQuery()

  return {
    table: {
      tableHeaders,
      tableData: classroomTeachers || [],
    },
  }
}
