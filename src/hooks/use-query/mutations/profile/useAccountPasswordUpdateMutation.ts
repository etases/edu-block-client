import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import { useTranslation } from '@hooks/use-translation'

interface BodyInterface {
  oldPassword: string
  newPassword: string
}

const translation = {
  'MUTATION.PROFILE.USE_ACCOUNT_PASSWORD_UPDATED': null,
}

const { translate } = useTranslation(translation)

export function useAccountPasswordUpdateMutation() {
  const endpoint = ENDPOINT.UPDATE.PERSONAL_PASSWORD

  const mutation = useMutation({
    mutationKey: [],
    mutationFn: async function (variables: BodyInterface) {
      return await request({
        method: 'PUT',
        endpoint,
        body: { ...variables },
      })
    },
    onError(error, variables, context) {
      notifyError({ message: (error as any).message || endpoint })
    },
    onSuccess(data, variables, context) {
      notifyInformation({ message: data.message || translate("MUTATION.PROFILE.USE_ACCOUNT_PASSWORD_UPDATED") })
    },
  })

  return { mutation }
}
