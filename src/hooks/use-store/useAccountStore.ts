import { notifyInformation } from '@utilities/functions'
import { useAtom } from 'jotai'
import { atomWithStorage, RESET } from 'jotai/utils'

interface AccountInterface {
  [key: string]: string | number | boolean | null
  id: number
  firstName: string
  lastName: string
  userName: string
  role: string
  isMale: boolean
  avatar: string
  dateOfBirth: string
  address: string
  phone: string
  email: string
}

const accountAtom = atomWithStorage('account', {} as AccountInterface)

export function useAccountStore() {
  const [account, setAccount] = useAtom(accountAtom)

  const resetAccount = () => setAccount(RESET)

  return {
    account,
    setAccount: (a: typeof account) => {
      setAccount(a)
      notifyInformation({ message: 'Personal information updated' })
    },
    resetAccount,
  }
}
