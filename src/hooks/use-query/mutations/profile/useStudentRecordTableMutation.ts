import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useMutation } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import { useTranslation } from '@hooks/use-translation'

const translation = {
  'MUTATION.PROFILE.USE_STUDENT_RECORD_SOMETHING_WENT_WRONG': null
}

const { translate } = useTranslation(translation)

interface BodyInterface {
  requests: {
    studentId: number
    classroomId: number
    subjectId: number
    firstHalfScore: number
    secondHalfScore: number
    finalScore: number
  }[]
}

export function useStudentRecordTableMutation() {
  const endpoint = ENDPOINT.UPDATE.STUDENT_RECORD_TABLE

  const mutation = useMutation({
    mutationKey: [],
    mutationFn: async function (values: BodyInterface) {
      return await request({
        method: 'POST',
        endpoint,
        body: { ...values },
      })
    },
    onError(error, variables, context) {
      notifyError({
        message: translate("MUTATION.PROFILE.USE_STUDENT_RECORD_SOMETHING_WENT_WRONG"),
      })
    },
    onSuccess(data, variables, context) {
      notifyInformation({ message: data.message })
    },
  })

  return { mutation }
}
