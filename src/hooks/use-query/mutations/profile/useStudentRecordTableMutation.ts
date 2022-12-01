import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'

interface BodyInterface {
  requests: {
    studentId: number
    classroomId: number
    subjectId: number
    firstHalfScore: number
    secondHalfScore: number
    finalScore: number
  }[]
}

export function useStudentRecordTableMutation() {
  const endpoint = ENDPOINT.UPDATE.STUDENT_RECORD_TABLE

  const mutation = useMutation({
    mutationKey: [],
    mutationFn: async function (values: BodyInterface) {
      return await request({
        method: 'POST',
        endpoint,
        body: { ...values },
      })
    },
    onError(error, variables, context) {
      notifyError({
        message: 'Something went wrong! Please retry in a few minutes',
      })
    },
    onSuccess(data, variables, context) {
      notifyInformation({ message: data.message })
    },
  })

  return { mutation }
}
