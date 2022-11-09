import { TableHeaderProps } from '@components/table'
import { useRecordUpdateRequestForm } from '@hooks/use-form'
import { useStudentRecordQuery } from '@hooks/use-query'
import { useDisclosure } from '@mantine/hooks'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

const tableHeaders: TableHeaderProps<
  | 'approvalDate'
  | 'approverId'
  | 'approverAvatar'
  | 'approverEmail'
  | 'approverName'
  | 'finalScore'
  | 'firstHalfScore'
  | 'secondHalfScore'
  | 'requestDate'
  | 'subjectId'
  | 'subjectName'
  | 'requesterAvatar'
  | 'requesterEmail'
  | 'requesterId'
  | 'requesterName'
  | 'teacherAvatar'
  | 'teacherEmail'
  | 'teacherName'
  | 'teacherId'
  | 'actions'
>[] = [
  {
    identifier: 'subjectName',
    label: 'Subject',
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
    identifier: 'teacherName',
    label: 'Teacher',
  },
  {
    identifier: 'approvalDate',
    label: 'Approval date',
  },
  {
    identifier: 'approverName',
    label: 'Approved by',
  },
  {
    identifier: 'actions',
    label: 'Action',
  },
]

export function useStudentRecordPage() {
  const {
    query: { data },
  } = useStudentRecordQuery()

  const requestForm = useRecordUpdateRequestForm()

  const [
    requestModalState,
    { close: closeRequestModal, open: openRequestModal },
  ] = useDisclosure(false)

  const printRef = useRef(null)
  const handlePrint = useReactToPrint({
    content() {
      return printRef.current
    },
    pageStyle() {
      return `
      @media print {
        table > thead > tr > td:last-child {
          display: none
        }

        table > tbody > tr > td:last-child {
          display: none
        }
      }
      `
    },
  })

  return {
    table: { tableData: data || [], tableHeaders },
    form: { requestForm },
    state: {
      requestModal: {
        requestModalState,
        closeRequestModal,
        openRequestModal,
      },
    },
    others: { handlePrint, printRef },
  }
}
