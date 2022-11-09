import { TableHeaderProps } from '@components/table'
import {
  useRecordPendingListQuery,
  useRecordPendingVerifyMutation,
} from '@hooks/use-query'

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
  | 'actions'
>[] = [
  {
    identifier: 'requestId',
    label: 'Record Id',
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
      verifyRecord,
      acceptRequest,
      rejectRequest,
    },
  }
}
