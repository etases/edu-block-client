import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useAccountStore } from '@hooks/use-store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'

const RECORD_REQUEST_UPDATE_MUTATION_KEY = {}

interface BodyInterface {
  studentId: number
  classroomId: number
  firstHalfScore: number
  secondHalfScore: number
  finalScore: number
  subjectId: number
  teacherId: number
}

export function useRecordUpdateRequestMutation() {
  const { account } = useAccountStore()
  const queryClient = useQueryClient()

  const endpoint = ENDPOINT.CREATE.RECORD_UPDATE_REQUEST

  const mutation = useMutation({
    mutationKey: [endpoint],
    mutationFn: async function ({ teacherId, ...variables }: BodyInterface) {
      return await request({
        endpoint:
          account.id === teacherId ? ENDPOINT.UPDATE.RECORD_UPDATE : endpoint,
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
    onSuccess(data, variables, context) {
      notifyInformation({ message: data.message })
      queryClient.invalidateQueries({
        predicate(query) {
          return (query.queryKey.at(0) as string).includes('record')
        },
      })
    },
    onSettled(data, error, variables, context) {},
  })

  return { mutation }
}
