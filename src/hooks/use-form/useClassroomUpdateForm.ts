import { useClassroomUpdateMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { notifyInformation } from '@utilities/functions'
import { useTranslation } from '@hooks/use-translation'

interface FormInterface {
  name: string
  grade: string
  homeroomTeacherId: string
  year: string
}

export function useClassroomUpdateForm() {
  const form = useForm<FormInterface>({
    initialValues: {
      name: '',
      grade: '0',
      homeroomTeacherId: '0',
      year: new Date().getFullYear().toString(),
    },
    validate: {
      name: (value) => (value.length > 0 ? null : translate("CLASSROOM.CREATE_FORM.INVALID_NAME")),
      grade: (value) =>
        Number(value) > 0 && Number(value) < 13 ? null : translate("CLASSROOM.CREATE_FORM.INVALID_GRADE"),
      homeroomTeacherId: (value) =>
        value.length > 0 ? null : translate("CLASSROOM.CREATE_FORM.INVALID_TEACHER"),
      year: (value) => (value.length === 4 ? null : translate("CLASSROOM.CREATE_FORM.INVALID_YEAR")),
    },
    validateInputOnBlur: true,
  })

  const {
    mutation: { mutate: updateClassroom },
    state: {
      classroom: { setSelectedClassroomId },
    },
  } = useClassroomUpdateMutation()

  function loadFormValues(values: FormInterface, classroomId?: number) {
    if (classroomId) setSelectedClassroomId(classroomId)
    form.setValues(values)
  }

  const submitForm = form.onSubmit((values) => {
    updateClassroom({
      ...values,
      grade: parseInt(values.grade),
      homeroomTeacherId: parseInt(values.homeroomTeacherId),
      year: parseInt(values.year),
    })
    notifyInformation({
      message: translate("CLASSROOM.CREATE_FORM.SUBMITTED_MESSAGE"),
    })
  })

  const translation = {
    'CLASSROOM.CREATE_FORM.INVALID_NAME': null,
    'CLASSROOM.CREATE_FORM.INVALID_GRADE': null,
    'CLASSROOM.CREATE_FORM.INVALID_TEACHER': null,
    'CLASSROOM.CREATE_FORM.INVALID_YEAR': null,
    'CLASSROOM.CREATE_FORM.SUBMITTED_MESSAGE': null,
  }
  
  const { translate } = useTranslation(translation)

  return {
    form,
    loadFormValues,
    submitForm,
    inputPropsOf: form.getInputProps,
  }
}
