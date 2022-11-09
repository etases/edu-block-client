import { useStudentProfileUpdateForm } from '@hooks/use-form'
import { useAccountInfoQuery } from '@hooks/use-query'
import { useStudentClassroomListQuery } from '@hooks/use-query/queries/classroom-list/useStudentClassroomListQuery'
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

  // if (data?.role.toUpperCase() !== 'STUDENT') navigate(-1)

  const updateForm = useStudentProfileUpdateForm()

  const [updateModalState, { close: closeUpdateModal, open: openUpdateModal }] =
    useDisclosure(false)

  return {
    accountProfile: data,
    table: {},
    state: {
      updateModal: {
        updateModalState,
        closeUpdateModal,
        openUpdateModal,
      },
    },
    form: { updateForm },
    others: { navigate, classroomList: classroomList || [] },
  }
}
