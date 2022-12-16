import { notifyInformation } from '@utilities/functions'
import { useAtom } from 'jotai'
import { atomWithStorage, RESET } from 'jotai/utils'

const accessTokenAtom = atomWithStorage('accessToken', '')

export function useAccessTokenStore() {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom)

  const resetAccessToken = () => setAccessToken(RESET)

  return {
    accessToken,
    setAccessToken: (token: string) => {
      setAccessToken(token)
      notifyInformation({ message: 'AccessToken updated' })
    },
    resetAccessToken,
  }
}
