import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

interface BodyInterface {
  name: string
  grade: number
  homeroomTeacherId: number
  year: number
}

export function useClassroomUpdateMutation() {
  const { classroomId } = useParams()
  const queryClient = useQueryClient()

  const [selectedClassroomId, setSelectedClassroomId] = useState(
    parseInt(classroomId || '0')
  )

  function resetSelectedClassroomId() {
    setSelectedClassroomId(0)
  }

  const endpoint = ENDPOINT.UPDATE.CLASSROOM_INFORMATION.replace(
    '{id}',
    selectedClassroomId.toString()
  )

  const mutation = useMutation({
    mutationKey: [],
    mutationFn: async function (variables: BodyInterface) {
      return await request({ endpoint, method: 'PUT', body: { ...variables } })
    },
    onMutate(variables) {},
    onError(error, variables, context) {
      notifyError({ message: endpoint })
    },
    onSuccess(data, variables, context) {
      // notifyInformation({ message: 'Classroom updated' })
      notifyInformation({ message: data.message })
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
        resetSelectedClassroomId,
      },
    },
  }
}
