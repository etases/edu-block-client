import { ENDPOINT } from '@constants'
import { RecordApiInterface } from '@constants/api/schemas'
import { request } from '@hooks/use-query/core'
import { useDebouncedState } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { notifyError } from '@utilities/functions'
import { useState } from 'react'

export const RECORD_PENDING_LIST_QUERY_KEY = {
  currentPage: 0,
  searchText: '',
}

interface DataInterface extends Array<RecordApiInterface> {}

export function useRecordPendingListQuery() {
  const endpoint = ENDPOINT.READ.PENDING_VERIFY_RECORD_LIST

  const [currentPage, setCurrentPage] = useState(0)
  const [searchText, setSearchText] = useDebouncedState('', 500)

  const query = useQuery({
    queryKey: [
      endpoint,
      {
        ...RECORD_PENDING_LIST_QUERY_KEY,
        currentPage,
        searchText,
      } as typeof RECORD_PENDING_LIST_QUERY_KEY,
    ],
    queryFn: async function () {
      return request({
        endpoint,
      })
    },
    select(data) {
      const { data: recordPendingList } = data

      return recordPendingList as DataInterface
    },
    onError(err) {
      notifyError({ message: endpoint })
    },
    onSuccess(data) {},
    onSettled(data, error) {},
  })

  return query
}
