import { ENDPOINT } from '@constants'
import {
  ClassroomApiInterface,
  EntryApiInterface,
} from '@constants/api/schemas'
import { request } from '@hooks/use-query/core'
import { useQuery } from '@tanstack/react-query'
import { notifyError } from '@utilities/functions'
import { useState } from 'react'

export const STUDENT_RECORD_QUERY_KEY = {}

interface DataInterface {
  classroom: ClassroomApiInterface
  entries: EntryApiInterface[]
}

export function useStudentRecordQuery() {
  const [selectedStudentId, setSelectedStudentId] = useState(0)
  const [selectedClassroomId, setSelectedClassroomId] = useState(0)

  function resetSelectedStudentId() {
    setSelectedStudentId(0)
  }

  function resetSelectedClassroomId() {
    setSelectedClassroomId(0)
  }

  const endpoint = ENDPOINT.READ.STUDENT_RECORD.replace(
    '{classroomId}',
    selectedClassroomId.toString()
  ).replace('{studentId}', selectedStudentId.toString())

  const query = useQuery({
    queryKey: [
      endpoint,
      { ...STUDENT_RECORD_QUERY_KEY } as typeof STUDENT_RECORD_QUERY_KEY,
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
    onSuccess(data) {},
    onSettled(data, error) {},
  })

  return {
    query,
    state: {
      classroom: {
        selectedClassroomId,
        setSelectedClassroomId,
        resetSelectedClassroomId,
      },
      student: {
        selectedStudentId,
        setSelectedStudentId,
        resetSelectedStudentId,
      },
    },
  }
}
