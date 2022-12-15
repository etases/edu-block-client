import {
  useStudentProfileUpdateForm,
  useStudentRecordImageForm,
} from '@hooks/use-form'
import { useAccountInfoQuery, useSubjectQuery } from '@hooks/use-query'
import { useStudentClassroomListQuery } from '@hooks/use-query/queries/classroom-list/useStudentClassroomListQuery'
import { useAccountStore, useTitleStore } from '@hooks/use-store'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '@hooks/use-translation'

const PAGE_TITLE = 'Student profile'

const translations = {
  "STUDENT_PROFILE.TITLE.STUDENT_INFORMATION": null,
  "STUDENT_PROFILE.TEXT_INPUT.ETHNIC": null,
  "STUDENT_PROFILE.TEXT_INPUT.HOMETOWN": null,
  "STUDENT_PROFILE.TEXT_INPUT.FATHER": null,
  "STUDENT_PROFILE.TEXT_INPUT.FATHER_JOB": null,
  "STUDENT_PROFILE.TEXT_INPUT.MOTHER": null,
  "STUDENT_PROFILE.TEXT_INPUT.MOTHER_JOB": null,
  "STUDENT_PROFILE.TEXT_INPUT.GUARDIAN": null,
  "STUDENT_PROFILE.TEXT_INPUT.GUARDIAN_JOB": null,
  "STUDENT_PROFILE.TITLE.RECORD": null,
  "STUDENT_PROFILE.LABEL.UPLOAD_LEGACY_RECORD": null,
  "STUDENT_PROFILE.TEXT.UPDATE_STUDENT_PROFILE": null,
  "STUDENT_PROFILE.BUTTON.RESET": null,
  "STUDENT_PROFILE.BUTTON.COMFIRM": null,
  "STUDENT_PROFILE.TEXT.UPLOAD_IMAGE": null,
  "STUDENT_PROFILE.BUTTON.SUBMIT": null
}

const translationsPlaceholder = {
  "STUDENT_PROFILE.FILE_INPUT.UPLOAD_IMAGE": null
}

export function useStudentProfilePage() {
  const { setTitle } = useTitleStore()

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])
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

  const { translatedObject } = useTranslation(translations)

  const { translatedObjectPlaceholder }  = useTranslation(translationsPlaceholder)

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
    translatedObject,
    translatedObjectPlaceholder
  }
}
