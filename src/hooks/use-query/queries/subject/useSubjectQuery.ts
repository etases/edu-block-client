import { ENDPOINT } from '@constants'
import { SubjectApiInterface } from '@constants/api/schemas'
import { request } from '@hooks/use-query/core'
import { useQuery } from '@tanstack/react-query'
import { notifyError } from '@utilities/functions'

interface DataInterface extends Array<SubjectApiInterface> {}

export function useSubjectQuery() {
  const endpoint = ENDPOINT.READ.SUBJECT_LIST

  const query = useQuery({
    queryKey: [endpoint],
    queryFn: async function () {
      return await request({
        endpoint,
      })
    },
    select(data) {
      const { data: subjectData } = data

      return subjectData as DataInterface
    },
    onError(err) {
      notifyError({ message: endpoint })
    },
    onSuccess(data) {},
    onSettled(data, error) {},
  })

  return { query }
}
