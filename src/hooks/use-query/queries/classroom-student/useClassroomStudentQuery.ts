import { ENDPOINT } from '@constants'
import {
  AccountApiInterface,
  ProfileApiInterface,
  StudentApiInterface,
} from '@constants/api/schemas'
import { request } from '@hooks/use-query/core'
import { useQuery } from '@tanstack/react-query'
import { notifyError } from '@utilities/functions'
import { useParams } from 'react-router-dom'

interface DataInterface
  extends Array<{
    account: AccountApiInterface
    student: StudentApiInterface
    profile: ProfileApiInterface
  }> {}

export function useClassroomStudentQuery() {
  const { classroomId } = useParams()

  const endpoint = ENDPOINT.READ.CLASSROOM_STUDENT.replace(
    '{id}',
    classroomId || ''
  )

  const query = useQuery({
    enabled: !!classroomId,
    queryKey: [endpoint],
    queryFn: async function () {
      return request({
        endpoint,
      })
    },
    select(data) {
      const { data: studentListData } = data

      return (studentListData as DataInterface).map(
        ({
          account,
          profile: { id: profileId, ...accountInfo },
          student: { id: studentId, ...studentInfo },
        }) => ({
          studentId,
          name: `${accountInfo.firstName} ${accountInfo.lastName}`,
          ...accountInfo,
          ...studentInfo,
        })
      )
    },
    onError(err) {
      notifyError({ message: endpoint })
    },
    onSuccess(data) {},
    onSettled(data, error) {},
  })

  return {
    query,
  }
}
