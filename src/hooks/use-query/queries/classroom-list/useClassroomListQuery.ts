import { ENDPOINT } from '@constants'
import { ClassroomApiInterface } from '@constants/api/schemas'
import { request, toQueryString } from '@hooks/use-query/core'
import { useDebouncedState } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import { useState } from 'react'

interface DataInterface extends Array<ClassroomApiInterface> {}

export function useClassroomListQuery() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useDebouncedState('', 500)
  const [selectedSearchField, setSelectedSearchField] = useState('')
  const [totalPages, setTotalPages] = useState(1)

  function resetCurrentPage() {
    setCurrentPage(0)
  }

  function resetSearchText() {
    setSearchText('')
    resetCurrentPage()
  }

  const endpoint =
    ENDPOINT.READ.CLASSROOM_LIST +
    toQueryString({
      pageNumber: currentPage,
      filter: selectedSearchField,
      input: searchText,
    })

  const query = useQuery({
    queryKey: [endpoint],
    queryFn: async function () {
      return await request({
        endpoint,
      })
    },
    select(data) {
      const { data: classroomListData } = data

      return (classroomListData as DataInterface).map(
        ({
          grade: classroomGrade,
          homeroomTeacher: {
            profile: {
              avatar: teacherAvatar,
              email: teacherEmail,
              firstName: teacherFirstName,
              id: teacherId,
              lastName: teacherLastName,
              phone: teacherPhone,
            },
          },
          id: classroomId,
          name: classroomName,
        }) => ({
          classroomGrade,
          classroomId,
          classroomName,
          teacherAvatar,
          teacherEmail,
          teacherFirstName,
          teacherId,
          teacherLastName,
          teacherName: `${teacherFirstName} ${teacherLastName}`,
          teacherPhone,
        })
      )
    },
    onError(err) {
      notifyError({ message: endpoint })
    },
    onSuccess(data) {
      notifyInformation({ message: 'List of classrooms synced' })
    },
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
        selectedSearchField,
        setSelectedSearchField,
      },
      total: {
        totalPages,
      },
    },
  }
}
