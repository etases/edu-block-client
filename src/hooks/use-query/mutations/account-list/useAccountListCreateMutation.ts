import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation } from '@tanstack/react-query'
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
    },
    onSettled(data, error, variables, context) {},
  })

  return mutation
}
