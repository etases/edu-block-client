import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation } from '@tanstack/react-query'
import { notifyError } from '@utilities/functions'
import { useState } from 'react'

interface BodyInterface {
  accounts: number[]
}

export function useClassroomTeacherAddMutation() {
  const [selectedClassroomId, setSelectedClassroomId] = useState(0)

  function resetSelectedClassroomId() {
    setSelectedClassroomId(0)
  }

  const endpoint = ENDPOINT.CREATE.CLASSROOM_TEACHER.replace(
    '{id}',
    selectedClassroomId.toString()
  )

  const mutation = useMutation({
    mutationKey: [],
    mutationFn: async function (variables: BodyInterface) {
      return await request({ endpoint, method: 'POST', body: { ...variables } })
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
