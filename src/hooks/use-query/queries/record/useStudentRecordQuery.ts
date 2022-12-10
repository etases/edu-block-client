import { ENDPOINT } from '@constants'
import {
  ClassroomApiInterface,
  EntryApiInterface,
} from '@constants/api/schemas'
import { request, toQueryString } from '@hooks/use-query/core'
import { useAccountStore } from '@hooks/use-store'
import { useQuery } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import { useParams } from 'react-router-dom'

export const STUDENT_RECORD_QUERY_KEY = {}

interface DataInterface {
  classroom: ClassroomApiInterface
  entries: EntryApiInterface[]
}

export function useStudentRecordQuery() {
  const { accountId, classroomId } = useParams()
  // const [selectedStudentId, setSelectedStudentId] = useState(accountId || '')
  // const [selectedClassroomId, setSelectedClassroomId] = useState(
  //   classroomId || ''
  // )
  const { account } = useAccountStore()

  const endpoint =
    (accountId === account.id.toString()
      ? ENDPOINT.READ.PERSONAL_RECORD_INFORMATION.replace(
          '{classroomId}',
          classroomId as string
        )
      : ENDPOINT.READ.STUDENT_RECORD.replace(
          '{classroomId}',
          classroomId as string
        ).replace('{studentId}', accountId as string)) +
    toQueryString({
      fillAllSubjects: true,
    })

  const query = useQuery({
    enabled: !!accountId || !!classroomId,
    queryKey: [endpoint],
    queryFn: async function () {
      return await request({
        endpoint,
      })
    },
    select(data) {
      const { data: recordData } = data
      return {
        teacher: (recordData as DataInterface).classroom.homeroomTeacher,
        entries: (recordData as DataInterface).entries
          .map(
            ({
              approvalDate,
              approver: {
                profile: {
                  id: approverId,
                  avatar: approverAvatar,
                  email: approverEmail,
                  firstName: approverFirstName,
                  lastName: approverLastName,
                },
              },
              finalScore,
              firstHalfScore,
              secondHalfScore,
              requestDate,
              subject: { id: subjectId, identifier: subjectName },
              requester: {
                profile: {
                  avatar: requesterAvatar,
                  email: requesterEmail,
                  id: requesterId,
                  firstName: requesterFirstName,
                  lastName: requesterLastName,
                },
              },
              teacher: {
                profile: {
                  avatar: teacherAvatar,
                  email: teacherEmail,
                  firstName: teacherFirstName,
                  lastName: teacherLastName,
                  id: teacherId,
                },
              },
            }) => ({
              approvalDate,
              approverId,
              approverAvatar,
              approverEmail,
              approverName: `${approverFirstName} ${approverLastName}`,
              finalScore: Number(finalScore).toFixed(2),
              firstHalfScore: Number(firstHalfScore).toFixed(2),
              secondHalfScore: Number(secondHalfScore).toFixed(2),
              requestDate,
              subjectId,
              subjectName,
              requesterAvatar,
              requesterEmail,
              requesterId,
              requesterName: `${requesterFirstName} ${requesterLastName}`,
              teacherAvatar,
              teacherEmail,
              teacherName: `${teacherFirstName} ${teacherLastName}`,
              teacherId,
              history: [] as any,
            })
          )
          .sort((a, b) => Number(b.approvalDate) - Number(a.approvalDate))
          .sort((a, b) => a.subjectId - b.subjectId)
          // .filter(
          //   (item, index, all) =>
          //     all.at(index - 1)?.subjectId !== item.subjectId
          // ),
          .reduce((result: any[], current) => {
            const tmpResult = result as typeof current[]
            const lastResult = tmpResult.at(-1)
            if (lastResult?.subjectId === current.subjectId) {
              lastResult.history.push(current)
              tmpResult[tmpResult.length - 1] = lastResult
              return tmpResult
            }
            return [...result, current]
          }, []),
      }
    },
    onError(err) {
      notifyError({ message: endpoint })
    },
    onSuccess(data) {
      notifyInformation({ message: 'Student record synced' })
    },
    onSettled(data, error) {},
  })

  return {
    query,
    state: {},
  }
}
