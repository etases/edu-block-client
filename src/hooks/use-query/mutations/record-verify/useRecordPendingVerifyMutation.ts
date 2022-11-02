import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation } from '@tanstack/react-query'
import { notifyError } from '@utilities/functions'

const RECORD_VERIFY_MUTATION_KEY = {}

interface BodyInterface {
  id: number
  accepted: boolean
}

export function useRecordPendingVerifyMutation() {
  const endpoint = ENDPOINT.UPDATE.STUDENT_PENDING_RECORD_APPROVAL_STATE

  const mutation = useMutation({
    mutationKey: [
      endpoint,
      {
        ...RECORD_VERIFY_MUTATION_KEY,
      } as typeof RECORD_VERIFY_MUTATION_KEY,
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
