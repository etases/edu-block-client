import { TableHeaderProps } from '@components/table'
import {
  useRecordPendingListQuery,
  useRecordPendingVerifyMutation,
} from '@hooks/use-query'
import { useNavigate } from 'react-router-dom'

const tableHeaders: TableHeaderProps<
  | 'finalScore'
  | 'firstHalfScore'
  | 'requestId'
  | 'requestDate'
  | 'requesterId'
  | 'requesterAvatar'
  | 'requesterEmail'
  | 'requesterFirstName'
  | 'requesterLastName'
  | 'requesterName'
  | 'secondHalfScore'
  | 'subjectId'
  | 'subjectIdentifier'
  | 'subjectName'
  | 'teacherEmail'
  | 'teacherAvatar'
  | 'teacherFirstName'
  | 'teacherLastName'
  | 'teacherName'
  | 'teacherId'
  | 'studentName'
  | 'classroomId'
  | 'actions'
>[] = [
  {
    identifier: 'requestId',
    label: 'Request Id',
  },
  {
    identifier: 'studentName',
    label: 'Student',
  },
  {
    identifier: 'requesterName',
    label: 'Requester',
  },
  {
    identifier: 'subjectIdentifier',
    label: 'Subject',
  },
  {
    identifier: 'teacherName',
    label: 'Teacher',
  },
  {
    identifier: 'firstHalfScore',
    label: 'First half',
  },
  {
    identifier: 'secondHalfScore',
    label: 'Second half',
  },
  {
    identifier: 'finalScore',
    label: 'Final',
  },
  {
    identifier: 'actions',
    label: 'Actions',
  },
]

export function useRecordListPage() {
  const {
    query: { data: requestList },
  } = useRecordPendingListQuery()

  const {
    mutation: { mutate: verifyRecord },
  } = useRecordPendingVerifyMutation()

  const navigate = useNavigate()

  function acceptRequest(requestId: number) {
    verifyRecord({ accepted: true, id: requestId })
  }

  function rejectRequest(requestId: number) {
    verifyRecord({ accepted: false, id: requestId })
  }

  return {
    table: {
      tableData: requestList || [],
      tableHeaders,
    },
    actions: {
      acceptRequest,
      rejectRequest,
    },
    others: { navigate },
  }
}
