import {
  useStudentProfileUpdateForm,
  useStudentRecordImageForm,
} from '@hooks/use-form'
import { useAccountInfoQuery, useSubjectQuery } from '@hooks/use-query'
import { useStudentClassroomListQuery } from '@hooks/use-query/queries/classroom-list/useStudentClassroomListQuery'
import { useAccountStore } from '@hooks/use-store'
import { useDisclosure } from '@mantine/hooks'
import { useNavigate } from 'react-router-dom'

export function useStudentProfilePage() {
  const {
    query: { data },
  } = useAccountInfoQuery()

  const navigate = useNavigate()

  const {
    query: { data: classroomList },
  } = useStudentClassroomListQuery()

  const {
    query: { data: subjects },
  } = useSubjectQuery()

  // if (data?.role.toUpperCase() !== 'STUDENT') navigate(-1)

  const updateForm = useStudentProfileUpdateForm()

  const [updateModalState, { close: closeUpdateModal, open: openUpdateModal }] =
    useDisclosure(false)

  const [
    updateTableModalState,
    { close: closeUpdateTableModal, open: openUpdateTableModal },
  ] = useDisclosure(false)

  const tableForm = useStudentRecordImageForm()

  const { account } = useAccountStore()

  return {
    accountProfile: data,
    state: {
      updateModal: {
        updateModalState,
        closeUpdateModal,
        openUpdateModal,
      },
      updateTableModal: {
        updateTableModalState,
        closeUpdateTableModal,
        openUpdateTableModal,
      },
    },
    form: { updateForm, tableForm },
    others: {
      navigate,
      classroomList: classroomList || [],
      account,
      subjects:
        subjects?.map(({ id, identifier }) => ({
          value: id.toString(),
          label: identifier,
        })) || [],
    },
  }
}
