import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation } from '@tanstack/react-query'
import { notifyError } from '@utilities/functions'
import { useState } from 'react'

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
  const [selectedStudentId, setSelectedStudentId] = useState(0)

  function resetSelectedStudentId() {
    setSelectedStudentId(0)
  }

  const endpoint = ENDPOINT.UPDATE.STUDENT_INFORMATION.replace(
    '{id}',
    selectedStudentId.toString()
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
    onSuccess(data, variables, context) {},
    onSettled(data, error, variables, context) {},
  })

  return {
    mutation,
    state: {
      student: {
        selectedStudentId,
        setSelectedStudentId,
        resetSelectedStudentId,
      },
    },
  }
}
