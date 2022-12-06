import { ENDPOINT } from '@constants'
import {
  AccountApiInterface,
  ProfileApiInterface,
  StudentApiInterface,
} from '@constants/api/schemas'
import { request, toQueryString } from '@hooks/use-query/core'
import { useAccountStore } from '@hooks/use-store'
import { useQuery } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import { useParams } from 'react-router-dom'

interface DataInterface
  extends Array<{
    account: AccountApiInterface
    student: StudentApiInterface
    profile: ProfileApiInterface
  }> {}

export function useClassroomStudentQuery() {
  const { classroomId } = useParams()
  const { account } = useAccountStore()

  const endpoint =
    ENDPOINT.READ.CLASSROOM_STUDENT.replace('{id}', classroomId || '') +
    toQueryString({ pageSize: 50 })

  const query = useQuery({
    enabled: !!classroomId && account.role !== 'STUDENT',
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
    onSuccess(data) {
      notifyInformation({ message: 'List of students synced' })
    },
    onSettled(data, error) {},
  })

  return {
    query,
  }
}
