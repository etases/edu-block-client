import { notifyInformation } from '@utilities/functions'
import { useAtom } from 'jotai'
import { atomWithStorage, RESET } from 'jotai/utils'
import { useTranslation } from '@hooks/use-translation'

const translation = {
  'USE_STORE.USE_ACCESS_TOKEN_STORE.MSG': null,
}

const { translate } = useTranslation(translation)

const accessTokenAtom = atomWithStorage('accessToken', '')

export function useAccessTokenStore() {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom)

  const resetAccessToken = () => setAccessToken(RESET)

  return {
    accessToken,
    setAccessToken: (token: string) => {
      setAccessToken(token)
      notifyInformation({ message: translate("USE_STORE.USE_ACCESS_TOKEN_STORE.MSG") })
    },
    resetAccessToken,
  }
}
