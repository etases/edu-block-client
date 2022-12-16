import { ENDPOINT } from '@constants'
import {
  AccountApiInterface,
  ProfileApiInterface,
  StudentApiInterface,
} from '@constants/api/schemas'
import { request } from '@hooks/use-query/core'
import { useAccountStore } from '@hooks/use-store'
import { useQuery } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { useTranslation } from '@hooks/use-translation'

const translation = {
  'QUERIES.ACCOUNT.USE_ACCOUNT_MSG': null,
}

const { translate } = useTranslation(translation)

const ACCOUNT_INFO_QUERY_KEY = {}

interface DataInterface {
  account: AccountApiInterface
  student?: StudentApiInterface
  profile: ProfileApiInterface
}

export function useAccountInfoQuery() {
  const { accountId } = useParams()
  const { account } = useAccountStore()

  const endpoint =
    accountId !== account.id?.toString()
      ? ENDPOINT.READ.ACCOUNT_INFORMATION.replace('{id}', accountId || '')
      : ENDPOINT.READ.PERSONAL_ACCOUNT_INFORMATION

  const query = useQuery({
    // enabled: !!accountId,
    queryKey: [
      endpoint,
      { ...ACCOUNT_INFO_QUERY_KEY } as typeof ACCOUNT_INFO_QUERY_KEY,
    ],
    queryFn: async function () {
      return request({
        endpoint,
      })
    },
    select(data) {
      const { data: accountData } = data
      const account = accountData as DataInterface
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
      } = account

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
        ...(account.student
          ? {
              ethnic: account.student.ethnic,
              father: account.student.fatherName,
              fatherJob: account.student.fatherJob,
              mother: account.student.motherName,
              motherJob: account.student.motherJob,
              guardian: account.student.guardianName,
              guardianJob: account.student.guardianJob,
              homeTown: account.student.homeTown,
            }
          : {}),
      }
    },
    onError(err) {
      notifyError({ message: endpoint })
    },
    onSuccess(data) {
      notifyInformation({ message: translate("QUERIES.ACCOUNT.USE_ACCOUNT_MSG") })
    },
    onSettled(data, error) {},
  })

  return {
    query,
  }
}
