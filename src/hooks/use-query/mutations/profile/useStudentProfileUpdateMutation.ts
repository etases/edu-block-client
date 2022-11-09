import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifyError } from '@utilities/functions'
import { useParams } from 'react-router-dom'

interface BodyInterface {
  ethnic: string
  fatherName: string
  fatherJob: string
  motherName: string
  motherJob: string
  guardianName: string
  guardianJob: string
  homeTown: string
}

export function useStudentProfileUpdateMutation() {
  // const [selectedStudentId, setSelectedStudentId] = useState(0)
  const { accountId } = useParams()
  const queryClient = useQueryClient()

  const endpoint = ENDPOINT.UPDATE.STUDENT_INFORMATION.replace(
    '{id}',
    accountId || ''
  )

  const mutation = useMutation({
    mutationKey: [],
    mutationFn: async function (variables: BodyInterface) {
      return await request({
        endpoint,
        method: 'PUT',
        body: { ...variables },
      })
    },
    onMutate(variables) {},
    onError(error, variables, context) {
      notifyError({ message: endpoint })
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        predicate(query) {
          return (query.queryKey.at(0) as string).includes('account')
        },
      })
    },
    onSettled(data, error, variables, context) {},
  })

  return {
    mutation,
    state: {},
  }
}
