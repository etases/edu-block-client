import { useAccountInfoQuery } from '@hooks/use-query'
import { useParams } from 'react-router-dom'

export function useAccountProfilePage() {
  const {
    query: { data },
  } = useAccountInfoQuery()

  const { accountId } = useParams()

  return {
    accountProfile: data,
  }
}
