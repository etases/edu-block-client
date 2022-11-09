import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation } from '@tanstack/react-query'
import { notifyError } from '@utilities/functions'

const RECORD_REQUEST_UPDATE_MUTATION_KEY = {}

interface BodyInterface {
  studentId: number
  classroomId: number
  firstHalfScore: number
  secondHalfScore: number
  finalScore: number
  subjectId: number
}

export function useRecordUpdateRequestMutation() {
  const endpoint = ENDPOINT.CREATE.RECORD_UPDATE_REQUEST

  const mutation = useMutation({
    mutationKey: [endpoint],
    mutationFn: async function (variables: BodyInterface) {
      return await request({
        endpoint,
        method: 'POST',
        body: {
          ...variables,
        },
      })
    },
    onMutate(variables) {},
    onError(error, variables, context) {
      notifyError({ message: endpoint })
    },
    onSuccess(data, variables, context) {},
    onSettled(data, error, variables, context) {},
  })

  return { mutation }
}
