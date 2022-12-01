import { ENDPOINT } from '@constants'
import {
  AccountApiInterface,
  ProfileApiInterface,
} from '@constants/api/schemas'
import { request } from '@hooks/use-query/core'
import { useAccountStore } from '@hooks/use-store'
import { useQuery } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import dayjs from 'dayjs'

export const PERSONAL_INFO_QUERY_KEY = {}

interface DataInterface {
  account: AccountApiInterface
  profile: ProfileApiInterface
}

export function usePersonalInfoQuery() {
  const { setAccount } = useAccountStore()

  const endpoint = ENDPOINT.READ.PERSONAL_ACCOUNT_INFORMATION

  const query = useQuery({
    enabled: false,
    queryKey: [
      endpoint,
      { ...PERSONAL_INFO_QUERY_KEY } as typeof PERSONAL_INFO_QUERY_KEY,
    ],
    queryFn: async function () {
      return await request({
        endpoint,
      })
    },
    select(data) {
      const { data: accountData } = data

      const {
        account: { id, role, username },
        profile: {
          address,
          avatar,
          birthDate,
          email,
          firstName,
          lastName,
          male,
          phone,
        },
      } = accountData as DataInterface

      return {
        address,
        avatar,
        dateOfBirth: dayjs(birthDate).format('YYYY-MM-DD'),
        email,
        firstName,
        id,
        isMale: male,
        lastName,
        phone,
        role,
        userName: username,
      }
    },
    onError(err) {
      notifyError({
        message: endpoint,
      })
    },
    onSuccess(data) {
      setAccount(data)

      const { isMale, lastName } = data

      // notifyInformation({
      //   message: `Welcome ${isMale ? 'Mr.' : 'Ms/Mrs.'} ${lastName
      //     .split(' ')
      //     .at(-1)}`,
      // })
      notifyInformation({ message: 'Personal information synced' })
    },
  })

  return query
}
