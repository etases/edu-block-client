import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'

interface BodyInterface {
  name: string
  grade: number
  homeroomTeacherId: number
  year: number
}

export function useClassroomCreateMutation() {
  const queryClient = useQueryClient()
  const endpoint = ENDPOINT.CREATE.CLASSROOM

  const mutation = useMutation({
    mutationKey: [endpoint],
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
    onSuccess(data, variables, context) {
      notifyInformation({ message: data.message })
      queryClient.invalidateQueries({
        predicate(query) {
          return (query.queryKey.at(0) as string).includes('classroom')
        },
      })
    },
    onSettled(data, error, variables, context) {},
  })

  return mutation
}
