import { TableHeaderProps } from '@components/table'
import {
  useRecordPendingListQuery,
  useRecordPendingVerifyMutation,
} from '@hooks/use-query'
import { useTitleStore } from '@hooks/use-store'
import { useTranslation } from '@hooks/use-translation'
import { useEffect } from 'react'
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
    label: "TEACHER.RECORD.REQUEST_ID",
  },
  {
    identifier: 'studentName',
    label: "TEACHER.RECORD.STUDENT",
  },
  {
    identifier: 'requesterName',
    label: "TEACHER.RECORD.REQUESTER",
  },
  {
    identifier: 'subjectIdentifier',
    label: "TEACHER.RECORD.SUBJECT",
  },
  {
    identifier: 'teacherName',
    label: "TEACHER.RECORD.TEACHER",
  },
  {
    identifier: 'firstHalfScore',
    label: "TEACHER.RECORD.FIRST_HALF" ,
  },
  {
    identifier: 'secondHalfScore',
    label: "TEACHER.RECORD.SECOND_HALF",
  },
  {
    identifier: 'finalScore',
    label: "TEACHER.RECORD.FINAL",
  },
  {
    identifier: 'actions',
    label: "TEACHER.RECORD.ACTIONS",
  },
]

const PAGE_TITLE = 'Pending requests'

export function useRecordListPage() {
  const { setTitle } = useTitleStore()

  const { translatedObject } = useTranslation(tableHeaders.reduce((result, {label}) => ({
    ...result,
    [label]: null
  }), {} as any))

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

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
      tableHeaders: tableHeaders.map(({label,...item}) => ({...item,label: translatedObject?.[label]})) as typeof tableHeaders,
    },
    actions: {
      acceptRequest,
      rejectRequest,
    },
    others: { navigate },
  }
}
