import { ENDPOINT } from '@constants'
import { ClassroomApiInterface } from '@constants/api/schemas'
import { request } from '@hooks/use-query/core'
import { useAccountStore } from '@hooks/use-store'
import { useDebouncedState } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from '@hooks/use-translation'

const translation = {
  'QUERIES.CLASSROOM_LIST.USE_CLASSROOM_LIST_QUERY_MSG': null,
}

const { translate } = useTranslation(translation)

interface DataInterface extends Array<ClassroomApiInterface> {}

export function useStudentClassroomListQuery() {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchText, setSearchText] = useDebouncedState('', 500)
  const { account } = useAccountStore()
  const { accountId } = useParams()

  function resetCurrentPage() {
    setCurrentPage(0)
  }

  function resetSearchText() {
    setSearchText('')
    resetCurrentPage()
  }

  const endpoint =
    account.role !== 'STUDENT' && !!accountId
      ? ENDPOINT.READ.SPECIFIC_STUDENT_CLASSROOM_LIST.replace(
          '{studentId}',
          accountId
        )
      : ENDPOINT.READ.STUDENT_CLASSROOM_LIST

  const query = useQuery({
    // enabled: account.role === 'STUDENT',
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
    onSuccess(data) {
      notifyInformation({ message: translate("QUERIES.CLASSROOM_LIST.USE_CLASSROOM_LIST_QUERY_MSG") })
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
      },
    },
  }
}
