import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation } from '@tanstack/react-query'
import { notifyError } from '@utilities/functions'

const RECORD_REQUEST_UPDATE_MUTATION_KEY = {}

interface BodyInterface {
  studentId: number | string
  classroomId: number | string
  firstHalfScore: number | string
  secondHalfScore: number | string
  finalScore: number | string
  subjectId: number | string
}

export function useRecordUpdateRequestMutation() {
  const endpoint = ENDPOINT.CREATE.RECORD_UPDATE_REQUEST

  const mutation = useMutation({
    mutationKey: [
      endpoint,
      {
        ...RECORD_REQUEST_UPDATE_MUTATION_KEY,
      } as typeof RECORD_REQUEST_UPDATE_MUTATION_KEY,
    ],
    mutationFn: async function (variables: BodyInterface) {
      return await request({
        endpoint,
        method: 'POST',
        body: { ...variables },
      })
    },
    onMutate(variables) {},
    onError(error, variables, context) {
      notifyError({ message: endpoint })
    },
    onSuccess(data, variables, context) {},
    onSettled(data, error, variables, context) {},
  })

  return mutation
}
