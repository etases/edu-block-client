import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation } from '@tanstack/react-query'
import { notifyError } from '@utilities/functions'

interface BodyInterface {
  name: string
  grade: number
  homeroomTeacherId: number
  year: number
}

export function useClassroomCreateMutation() {
  const endpoint = ENDPOINT.CREATE.CLASSROOM

  const mutation = useMutation({
    mutationKey: [],
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
