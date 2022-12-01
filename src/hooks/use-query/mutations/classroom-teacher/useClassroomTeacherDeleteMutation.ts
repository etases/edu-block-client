import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

interface BodyInterface {
  teachers: {
    teacherId: number
    subjectId: number
  }[]
}

export function useClassroomTeacherDeleteMutation() {
  const { classroomId } = useParams()
  const queryClient = useQueryClient()

  const [selectedClassroomId, setSelectedClassroomId] = useState(
    classroomId || 0
  )

  function resetSelectedClassroomId() {
    setSelectedClassroomId(0)
  }

  const endpoint = ENDPOINT.DELETE.CLASSROOM_TEACHER.replace(
    '{id}',
    selectedClassroomId.toString()
  )

  const mutation = useMutation({
    mutationKey: [endpoint],
    mutationFn: async function (variables: BodyInterface) {
      return await request({
        endpoint,
        method: 'DELETE',
        body: { ...variables },
      })
    },
    onMutate(variables) {},
    onError(error, variables, context) {
      notifyError({ message: endpoint })
    },
    onSuccess(data, variables, context) {
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
