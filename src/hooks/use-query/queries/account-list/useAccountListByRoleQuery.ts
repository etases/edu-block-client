import { ENDPOINT } from '@constants'
import {
  AccountApiInterface,
  ProfileApiInterface,
} from '@constants/api/schemas'
import { request, toQueryString } from '@hooks/use-query/core'
import { useAccountStore } from '@hooks/use-store'
import { useDebouncedValue } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import dayjs from 'dayjs'
import { useState } from 'react'

interface DataInterface
  extends Array<{
    account: AccountApiInterface
    profile: ProfileApiInterface
  }> {}

interface UseAccountListByRoleQueryProps {
  role: 'ADMIN' | 'STAFF' | 'TEACHER' | 'STUDENT'
  limit?: number
}

export function useAccountListByRoleQuery(
  props: UseAccountListByRoleQueryProps
) {
  const { role, limit } = props

  const { account } = useAccountStore()

  const [selectedRole, setSelectedRole] = useState(role.toLowerCase())
  const [currentPage, setCurrentPage] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [selectedField, setSelectedField] = useState('')
  const [searchLimit, setSearchLimit] = useState(limit)
  const [debouncedSearchText] = useDebouncedValue(searchText, 500)

  function resetCurrentPage() {
    setCurrentPage(0)
  }

  function resetSearchText() {
    resetCurrentPage()
    setSearchText('')
  }

  const endpoint =
    ENDPOINT.READ.ACCOUNT_LIST_BY_ROLE.replace('{role}', selectedRole) +
    toQueryString({
      pageNumber: currentPage,
      pageSize: searchLimit || 10,
      filter: selectedField,
      input: debouncedSearchText,
    })

  const query = useQuery({
    enabled: ['ADMIN', 'STAFF'].some((item) => item === account.role),
    queryKey: [endpoint],
    keepPreviousData: true,
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
          profile: {
            avatar,
            birthDate,
            firstName,
            lastName,
            male: isMale,
            email,
          },
        }) => ({
          id,
          role,
          avatar,
          dob: dayjs(birthDate).format('YYYY-MM-DD'),
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
          gender: isMale ? 'M' : 'F',
          email,
        })
      )
    },
    onError(err) {
      notifyError({ message: endpoint })
    },
    onSuccess(data) {
      notifyInformation({ message: `List of ${role.toLowerCase()}s synced` })
    },
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
      field: {
        selectedField,
        setSelectedField,
      },
      limit: {
        searchLimit,
        setSearchLimit,
      },
    },
  }
}
