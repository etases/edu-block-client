import { useAccountInfoQuery } from '@hooks/use-query'
import { useParams } from 'react-router-dom'

export function useStudentProfilePage() {
  const {
    query: { data },
  } = useAccountInfoQuery()

  const { accountId } = useParams()

  // const navigate = useNavigate()

  // if (data?.role.toUpperCase() !== 'STUDENT') navigate(-1)

  return {
    accountProfile: data,
  }
}
