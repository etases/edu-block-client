import { atomWithStorage } from 'jotai/utils'

interface AccountInterface {}

const defaultAccount: AccountInterface = {}

export const account = atomWithStorage<AccountInterface>(
  'account',
  defaultAccount
)
