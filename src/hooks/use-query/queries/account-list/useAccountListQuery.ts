import { ENDPOINT } from '@constants'
import {
  AccountApiInterface,
  PaginationApiInterface,
  ProfileApiInterface,
} from '@constants/api/schemas'
import { request, toQueryString } from '@hooks/use-query/core'
import { useDebouncedState } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import dayjs from 'dayjs'
import { useState } from 'react'

interface DataInterface
  extends Array<{
    account: AccountApiInterface
    profile: ProfileApiInterface
  }> {}

export const ACCOUNT_LIST_QUERY_KEY = {
  currentPage: 0,
  searchText: '',
}

export function useAccountListQuery() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchText, setSearchText] = useDebouncedState('', 500)
  const [totalPages, setTotalPages] = useState(0)

  function resetCurrentPage() {
    setCurrentPage(0)
  }

  function resetSelectedCategory() {
    setSelectedCategory('')
    resetCurrentPage()
  }

  function resetSearchText() {
    setSearchText('')
    resetSelectedCategory()
  }

  const endpoint =
    ENDPOINT.READ.ACCOUNT_LIST +
    toQueryString({
      pageNumber: currentPage,
      filter: selectedCategory,
      input: searchText,
    })

  const query = useQuery({
    queryKey: [
      endpoint,
      {
        ...ACCOUNT_LIST_QUERY_KEY,
        currentPage,
        searchText,
      } as typeof ACCOUNT_LIST_QUERY_KEY,
    ],
    queryFn: async function () {
      return await request({
        endpoint,
      })
    },
    select(data) {
      const { data: accountListData, pageInfo } = data

      return {
        page: pageInfo as PaginationApiInterface,
        accounts: (accountListData as DataInterface).map(
          ({
            account: { id, role, username },
            profile: {
              avatar,
              birthDate,
              firstName,
              lastName,
              male: isMale,
              address,
              email,
              phone,
            },
          }) => ({
            id,
            role,
            avatar,
            username,
            dob: dayjs(birthDate).format('YYYY-MM-DD'),
            name: `${firstName} ${lastName}`,
            firstName,
            lastName,
            isMale,
            address,
            email,
            phone,
          })
        ),
      }
    },
    onError(err) {
      notifyError({
        message: endpoint,
      })
      setTotalPages(1)
    },
    onSuccess(data) {
      if (data.page.totalEntries === 0) {
        setTotalPages(1)
        setCurrentPage(1)
      } else {
        setTotalPages(data.page.totalPages || 1)
      }
      notifyInformation({ message: 'List of account synced' })
    },
    onSettled(data, error) {},
  })

  return {
    query,
    state: {
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
      searchCategory: {
        selectedCategory,
        setSelectedCategory,
        resetSelectedCategory,
      },
      total: {
        totalPages,
      },
    },
  }
}
