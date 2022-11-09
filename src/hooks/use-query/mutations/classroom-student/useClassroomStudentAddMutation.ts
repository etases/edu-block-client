import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifyError } from '@utilities/functions'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

interface BodyInterface {
  accounts: number[]
}

export function useClassroomStudentAddMutation() {
  const { classroomId } = useParams()
  const queryClient = useQueryClient()

  const [selectedClassroomId, setSelectedClassroomId] = useState(
    classroomId || ''
  )

  const endpoint = ENDPOINT.CREATE.CLASSROOM_STUDENT.replace(
    '{id}',
    selectedClassroomId.toString()
  )

  const mutation = useMutation({
    mutationKey: [endpoint],
    mutationFn: async function (variables: BodyInterface) {
      return await request({ endpoint, method: 'POST', body: { ...variables } })
    },
    onMutate(variables) {},
    onError(error, variables, context) {
      notifyError({ message: endpoint })
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        predicate(query) {
          return (query.queryKey.at(0) as string).includes('classroom')
        },
      })
    },
    onSettled(data, error, variables, context) {},
  })

  return {
    mutation,
    state: {
      classroom: {
        selectedClassroomId,
        setSelectedClassroomId,
      },
    },
  }
}
