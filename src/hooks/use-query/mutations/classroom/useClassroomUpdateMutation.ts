import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation } from '@tanstack/react-query'
import { notifyError } from '@utilities/functions'
import { useState } from 'react'

interface BodyInterface {
  name: string
  grade: number
  homeroomTeacherId: number
}

export function useClassroomUpdateMutation() {
  const [selectedClassroomId, setSelectedClassroomId] = useState(0)

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
    onSuccess(data, variables, context) {},
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
