import { ENDPOINT } from '@constants'
import { ClassroomApiInterface } from '@constants/api/schemas'
import { request } from '@hooks/use-query/core'
import { useQuery } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import { useParams } from 'react-router-dom'
import { useTranslation } from '@hooks/use-translation'

const translation = {
  'QUERIES.CLASSROOM.USE_CLASSROOM_QUERY_MSG': null,
}

const { translate } = useTranslation(translation)

interface DataInterface extends ClassroomApiInterface {}

export function useClassroomQuery() {
  const { classroomId } = useParams()

  const endpoint = ENDPOINT.READ.CLASSROOM_INFORMATION.replace(
    '{id}',
    classroomId?.toString() || ''
  )

  const query = useQuery({
    enabled: !!classroomId,
    queryKey: [endpoint],
    queryFn: async function () {
      return await request({
        endpoint,
      })
    },
    select(data) {
      const { data: classroomData } = data

      const {
        grade: classroomGrade,
        id: classroomId,
        name: classroomName,
        homeroomTeacher: {
          profile: {
            avatar: teacherAvatar,
            email: teacherEmail,
            firstName: teacherFirstName,
            lastName: teacherLastName,
            id: teacherId,
            phone: teacherPhone,
          },
        },
      } = classroomData as DataInterface

      return {
        classroomGrade,
        classroomId,
        classroomName,
        teacherAvatar,
        teacherEmail,
        teacherFirstName,
        teacherId,
        teacherLastName,
        teacherName: `${teacherFirstName} ${teacherLastName}`,
        teacherPhone,
      }
    },
    onError(err) {
      notifyError({ message: endpoint })
    },
    onSuccess(data) {
      notifyInformation({ message: translate("QUERIES.CLASSROOM.USE_CLASSROOM_QUERY_MSG") })
    },
    onSettled(data, error) {},
  })

  return {
    query,
  }
}
