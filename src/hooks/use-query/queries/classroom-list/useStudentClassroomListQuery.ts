import { ENDPOINT } from '@constants'
import { ClassroomApiInterface } from '@constants/api/schemas'
import { request } from '@hooks/use-query/core'
import { useDebouncedState } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { notifyError } from '@utilities/functions'
import { useState } from 'react'

interface DataInterface extends Array<ClassroomApiInterface> {}

export function useStudentClassroomListQuery() {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchText, setSearchText] = useDebouncedState('', 500)

  function resetCurrentPage() {
    setCurrentPage(0)
  }

  function resetSearchText() {
    setSearchText('')
    resetCurrentPage()
  }

  const endpoint = ENDPOINT.READ.STUDENT_CLASSROOM_LIST

  const query = useQuery({
    queryKey: [endpoint],
    queryFn: async function () {
      return request({
        endpoint,
      })
    },
    select(data) {
      const { data: classroomListData } = data

      return (classroomListData as DataInterface).map(
        ({
          id: classroomId,
          grade: classroomGrade,
          name: classroomName,
          homeroomTeacher: {
            profile: {
              avatar: teacherAvatar,
              email: teacherEmail,
              firstName: teacherFirstName,
              lastName: teacherLastName,
              id: teacherId,
              phone: teacherPhone,
            },
          },
        }) => ({
          classroomId,
          classroomGrade,
          classroomName,
          teacherAvatar,
          teacherEmail,
          teacherFirstName,
          teacherLastName,
          teacherId,
          teacherPhone,
          teacherName: `${teacherFirstName} ${teacherLastName}`,
        })
      )
    },
    onError(err) {
      notifyError({ message: endpoint })
    },
    onSuccess(data) {},
    onSettled(data, error) {},
  })

  return {
    query,
    state: {
      page: {
        currentPage,
        setCurrentPage,
        resetCurrentPage,
      },
      search: {
        searchText,
        setSearchText,
        resetSearchText,
      },
    },
  }
}
