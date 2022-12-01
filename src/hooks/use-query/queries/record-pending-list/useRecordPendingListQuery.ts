import { ENDPOINT } from '@constants'
import { RecordApiInterface } from '@constants/api/schemas'
import { request, toQueryString } from '@hooks/use-query/core'
import { useDebouncedState } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import { useState } from 'react'

export const RECORD_PENDING_LIST_QUERY_KEY = {
  currentPage: 0,
  searchText: '',
}

interface DataInterface extends Array<RecordApiInterface> {}

export function useRecordPendingListQuery() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useDebouncedState('', 500)

  const endpoint =
    ENDPOINT.READ.PENDING_VERIFY_RECORD_LIST +
    toQueryString({
      pageNumber: currentPage,
    })

  const query = useQuery({
    queryKey: [endpoint],
    queryFn: async function () {
      return request({
        endpoint,
      })
    },
    select(data) {
      const { data: recordPendingList } = data

      return (recordPendingList as DataInterface).map(
        ({
          finalScore,
          firstHalfScore,
          id: requestId,
          requestDate,
          requester: {
            profile: {
              id: requesterId,
              avatar: requesterAvatar,
              email: requesterEmail,
              firstName: requesterFirstName,
              lastName: requesterLastName,
            },
          },
          secondHalfScore,
          subject: {
            id: subjectId,
            identifier: subjectIdentifier,
            name: subjectName,
          },
          teacher: {
            profile: {
              email: teacherEmail,
              avatar: teacherAvatar,
              firstName: teacherFirstName,
              lastName: teacherLastName,
              id: teacherId,
            },
          },
        }) => ({
          finalScore,
          firstHalfScore,
          requestId,
          requestDate,
          requesterId,
          requesterAvatar,
          requesterEmail,
          requesterFirstName,
          requesterLastName,
          requesterName: `${requesterFirstName} ${requesterLastName}`,
          secondHalfScore,
          subjectId,
          subjectIdentifier,
          subjectName,
          teacherEmail,
          teacherAvatar,
          teacherFirstName,
          teacherLastName,
          teacherName: `${teacherFirstName} ${teacherLastName}`,
          teacherId,
        })
      )
    },
    onError(err) {
      notifyError({ message: endpoint })
    },
    onSuccess(data) {
      notifyInformation({ message: 'Request list synced' })
    },
    onSettled(data, error) {},
  })

  return { query, state: { page: { currentPage, setCurrentPage } } }
}
