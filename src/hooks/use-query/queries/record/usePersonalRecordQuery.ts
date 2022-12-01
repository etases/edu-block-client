import { ENDPOINT } from '@constants'
import {
  ClassroomApiInterface,
  EntryApiInterface,
} from '@constants/api/schemas'
import { request } from '@hooks/use-query/core'
import { useQuery } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import { useState } from 'react'

export const PERSONAL_RECORD_QUERY_KEY = {}

interface DataInterface {
  classroom: ClassroomApiInterface
  entries: EntryApiInterface[]
}

export function usePersonalRecordQuery() {
  const [classroomId, setClassroomId] = useState(0)

  function resetClassroomId() {
    setClassroomId(0)
  }

  const endpoint = ENDPOINT.READ.PERSONAL_RECORD_INFORMATION.replace(
    '{classroomId}',
    classroomId.toString()
  )

  const query = useQuery({
    enabled: classroomId !== 0,
    queryKey: [
      endpoint,
      { ...PERSONAL_RECORD_QUERY_KEY } as typeof PERSONAL_RECORD_QUERY_KEY,
    ],
    queryFn: async function () {
      return await request({
        endpoint,
      })
    },
    select(data) {
      const { data: recordData } = data
      return recordData as DataInterface
    },
    onError(err) {
      notifyError({ message: endpoint })
    },
    onSuccess(data) {
      notifyInformation({ message: 'Personal record synced' })
    },
    onSettled(data, error) {},
  })

  return {
    query,
    state: {
      classroom: { classroomId, setClassroomId, resetClassroomId },
    },
  }
}
