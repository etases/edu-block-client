import { ENDPOINT } from '@constants'
import {
  AccountApiInterface,
  ProfileApiInterface,
} from '@constants/api/schemas'
import { request } from '@hooks/use-query/core'
import { useDebouncedState } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { notifyError } from '@utilities/functions'
import dayjs from 'dayjs'
import { useState } from 'react'

interface DataInterface
  extends Array<{
    account: AccountApiInterface
    profile: ProfileApiInterface
  }> {}

export function useAccountListByRoleQuery() {
  const [selectedRole, setSelectedRole] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [searchText, setSearchText] = useDebouncedState('', 500)

  function resetCurrentPage() {
    setCurrentPage(0)
  }

  function resetSearchText() {
    resetCurrentPage()
    setSearchText('')
  }

  const endpoint = ENDPOINT.READ.ACCOUNT_LIST_BY_ROLE.replace(
    '{role}',
    selectedRole
  )

  const query = useQuery({
    queryKey: [],
    queryFn: async function () {
      return await request({
        endpoint,
      })
    },
    select(data) {
      const { data: accountListData } = data

      return (accountListData as DataInterface).map(
        ({
          account: { id, role },
          profile: { avatar, birthDate, firstName, lastName, male: isMale },
        }) => ({
          id,
          role,
          avatar,
          dob: dayjs(birthDate).format('YYYY-MM-DD'),
          name: `${firstName} ${lastName}`,
          gender: isMale ? 'M' : 'F',
        })
      )
    },
    onError(err) {
      notifyError({ message: endpoint })
    },
    onSuccess(data) {},
    onSettled(data, error) {},
  })

  return {
    query,
    state: {
      role: {
        selectedRole,
        setSelectedRole,
      },
      page: {
        currentPage,
        setCurrentPage,
        resetCurrentPage,
      },
      search: {
        searchText,
        setSearchText,
        resetSearchText,
      },
    },
  }
}
