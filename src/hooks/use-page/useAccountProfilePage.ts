import { useAccountInfoQuery } from '@hooks/use-query'
import { useAccountStore } from '@hooks/use-store'
import { useParams } from 'react-router-dom'

export function useAccountProfilePage() {
  const {
    query: { data },
  } = useAccountInfoQuery()

  const { accountId } = useParams()

  const {
    account: { id },
  } = useAccountStore()

  return {
    accountProfile: data,
  }
}
