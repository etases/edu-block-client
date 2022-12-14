import { ENDPOINT } from '@constants'
import {
  AccountApiInterface,
  ProfileApiInterface,
  SubjectApiInterface,
} from '@constants/api/schemas'
import { request, toQueryString } from '@hooks/use-query/core'
import { useQuery } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import { useParams } from 'react-router-dom'

interface DataInterface
  extends Array<{
    account: {
      account: AccountApiInterface
      profile: ProfileApiInterface
    }
    subject: SubjectApiInterface
  }> {}

export function useClassroomTeacherQuery() {
  const { classroomId } = useParams()

  const endpoint =
    ENDPOINT.READ.CLASSROOM_TEACHER.replace('{id}', classroomId || '') +
    toQueryString({ pageSize: 50 })

  const query = useQuery({
    enabled: !!classroomId,
    queryKey: [endpoint],
    queryFn: async function () {
      return await request({ endpoint })
    },
    select(data) {
      const { data: teacherListData } = data

      return (teacherListData as DataInterface).map(
        ({
          account: {
            profile: {
              avatar: teacherAvatar,
              email: teacherEmail,
              firstName: teacherFirstName,
              lastName: teacherLastName,
              phone: teacherPhone,
              id: teacherId,
            },
          },
          subject: {
            id: subjectId,
            name: subjectName,
            identifier: subjectIdentifier,
          },
        }) => ({
          subjectId,
          subjectName,
          subjectIdentifier,
          teacherLastName,
          teacherAvatar,
          teacherEmail,
          teacherFirstName,
          teacherPhone,
          teacherId,
          teacherName: `${teacherFirstName} ${teacherLastName}`,
        })
      )
    },
    onError(err) {
      notifyError({ message: endpoint })
    },
    onSuccess(data) {
      notifyInformation({ message: 'List of teachers synced' })
    },
    onSettled(data, error) {},
  })

  return {
    query,
  }
}
