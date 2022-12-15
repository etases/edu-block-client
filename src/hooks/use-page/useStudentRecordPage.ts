import { TableHeaderProps } from '@components/table'
import { useRecordUpdateRequestForm } from '@hooks/use-form'
import { useStudentRecordQuery } from '@hooks/use-query'
import { useAccountStore } from '@hooks/use-store'
import { useDisclosure } from '@mantine/hooks'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useTranslation } from '@hooks/use-translation'

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
    label: 'STUDENT_PROFILE.TABLE_HEADERS.SUBJECT',
  },
  {
    identifier: 'firstHalfScore',
    label: 'STUDENT_PROFILE.TABLE_HEADERS.FIRST_HALF',
  },
  {
    identifier: 'secondHalfScore',
    label: 'STUDENT_PROFILE.TABLE_HEADERS.SECOND_HALF',
  },
  {
    identifier: 'finalScore',
    label: 'STUDENT_PROFILE.TABLE_HEADERS.FINAL',
  },
  {
    identifier: 'teacherName',
    label: 'STUDENT_PROFILE.TABLE_HEADERS.TEACHER',
  },
  {
    identifier: 'approvalDate',
    label: 'STUDENT_PROFILE.TABLE_HEADERS.APPROVAL_DATE',
  },
  {
    identifier: 'approverName',
    label: 'STUDENT_PROFILE.TABLE_HEADERS.APPROVED_BY',
  },
  {
    identifier: 'actions',
    label: 'STUDENT_PROFILE.TABLE_HEADERS.ACTION',
  },
]

export function useStudentRecordPage() {
  const {
    query: { data },
  } = useStudentRecordQuery()

  const { translatedObject } = useTranslation(tableHeaders.reduce((result, {label}) => ({
    ...result,
    [label]: null
  }), {} as any))

  const { account } = useAccountStore()

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
        table > thead > tr > td:nth-last-child(-n+3) {
          display: none
        }

        table > tbody > tr > td:nth-last-child(-n+3) {
          display: none
        }
      }
      `
    },
  })

  return {
    table: { tableData: data?.entries || [], tableHeaders: tableHeaders.map(({label,...item}) => ({...item,label: translatedObject?.[label]})) as typeof tableHeaders, },
    form: { requestForm },
    state: {
      requestModal: {
        requestModalState,
        closeRequestModal,
        openRequestModal,
      },
    },
    others: { handlePrint, printRef, teacher: data?.teacher, account },
  }
}
