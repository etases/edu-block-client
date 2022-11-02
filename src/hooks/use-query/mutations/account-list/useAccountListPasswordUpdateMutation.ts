import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation } from '@tanstack/react-query'
import { notifyError } from '@utilities/functions'

interface AccountsInterface {
  username: string
  password: string
}

interface BodyInterface {
  accounts: AccountsInterface[]
}

export function useAccountListPasswordUpdateMutation() {
  const endpoint = ENDPOINT.UPDATE.ACCOUNT_PASSWORD

  const mutation = useMutation({
    mutationKey: [],
    mutationFn: async function (variables: BodyInterface) {
      return await request({
        endpoint,
        method: 'PUT',
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
