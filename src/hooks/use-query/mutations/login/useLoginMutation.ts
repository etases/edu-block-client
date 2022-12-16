import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useAccessTokenStore } from '@hooks/use-store'
import { useMutation } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import { useNavigate } from 'react-router-dom'

export const LOGIN_MUTATION_KEY = {}

interface BodyInterface {
  username: string
  password: string
}

export function useLoginMutation() {
  const { setAccessToken, resetAccessToken } = useAccessTokenStore()
  const navigate = useNavigate()

  const endpoint = ENDPOINT.MISC.LOGIN

  const mutation = useMutation({
    mutationKey: [],
    mutationFn: async function (variables: BodyInterface) {
      const { username, password } = variables
      return await request({
        method: 'POST',
        endpoint,
        body: {
          username,
          password,
        },
      })
    },
    onMutate(variables) {
      resetAccessToken()
    },
    onError(error, variables, context) {
      notifyError({ message: endpoint })
    },
    onSuccess(data, variables, context) {
      if (data.status !== 0) {
        notifyError({
          message: data.message || 'Something went wrong!',
        })
        return
      }

      const { data: token } = data

      setAccessToken(token)

      notifyInformation({
        message: data.message || 'Something went wrong!',
      })

      navigate('/app')
    },
    onSettled(data, error, variables, context) {},
  })

  return mutation
}
