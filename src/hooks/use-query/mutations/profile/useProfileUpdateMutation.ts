import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import { useState } from 'react'

interface BodyInterface {
  firstName: string
  lastName: string
  male: boolean
  avatar: string
  birthDate: string
  address: string
  phone: string
  email: string
}

export function useProfileUpdateMutation() {
  const [selectedProfileId, setSelectedProfileId] = useState(0)
  const queryClient = useQueryClient()

  function resetSelectedProfileId() {
    setSelectedProfileId(0)
  }

  const endpoint = ENDPOINT.UPDATE.ACCOUNT_PROFILE.replace(
    '{id}',
    selectedProfileId.toString()
  )

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
    onSuccess(data, variables, context) {
      notifyInformation({ message: endpoint })
      queryClient.invalidateQueries({
        predicate(query) {
          return (query.queryKey[0] as string).includes('account')
        },
      })
    },
    onSettled(data, error, variables, context) {},
  })

  return {
    mutation,
    state: {
      profile: {
        selectedProfileId,
        setSelectedProfileId,
        resetSelectedProfileId,
      },
    },
  }
}
