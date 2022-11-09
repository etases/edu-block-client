import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'

const ACCOUNT_LIST_MUTATION_KEY = {}

interface AccountInterface {
  firstName: string
  lastName: string
  role: string
}

interface BodyInterface {
  accounts: AccountInterface[]
}

export function useAccountListCreateMutation() {
  const queryClient = useQueryClient()

  const endpoint = ENDPOINT.CREATE.ACCOUNTS
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
      notifyError({
        message: endpoint,
      })
    },
    onSuccess(data, variables, context) {
      notifyInformation({ message: data.message })
      queryClient.invalidateQueries({
        predicate(query) {
          return (query.queryKey.at(0) as string).includes('account')
        },
      })
    },
    onSettled(data, error, variables, context) {},
  })

  return mutation
}
