import { useClassroomQuery } from '@hooks/use-query'

export function useClassroomDetailsPage() {
  const {
    query: { data: classroomDetails },
  } = useClassroomQuery()

  return {
    classroomDetails,
  }
}
