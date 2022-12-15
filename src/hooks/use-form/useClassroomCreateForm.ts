import { useClassroomCreateMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { notifyInformation } from '@utilities/functions'
import { useTranslation } from '@hooks/use-translation'

interface FormInterface {
  name: string
  grade: string
  homeroomTeacherId: string
  year: string
}

export function useClassroomCreateForm() {
  const form = useForm<FormInterface>({
    initialValues: {
      name: '',
      grade: '',
      homeroomTeacherId: '',
      year: new Date().getFullYear().toString(),
    },
    validate: {
      name: (value) => (value.length > 0 ? null : translate("CLASSROOM.CREATE_FORM.INVALID_NAME")),
      grade: (value) =>
        Number(value) > 0 && Number(value) < 13 ? null : translate("CLASSROOM.CREATE_FORM.INVALID_GRADE"),
      year: (value) => (value.length === 4 ? null : translate("CLASSROOM.CREATE_FORM.INVALID_YEAR")),
      // homeroomTeacherId: (value) =>
      //   value.length > 0 ? null : 'A teacher must be chosen',
    },
    validateInputOnBlur: true,
  })

  const { mutate: createClass } = useClassroomCreateMutation()

  const submitForm = form.onSubmit((values) => {
    createClass({
      ...values,
      grade: parseInt(values.grade),
      homeroomTeacherId: parseInt(values.homeroomTeacherId),
      year: parseInt(values.year),
    })

    notifyInformation({ message: translate("CLASSROOM.CREATE_FORM.SUBMITTED_MESSAGE") })
  })

  function loadFormValues(values: FormInterface) {
    form.setValues(values)
  }

  const translation = {
    'CLASSROOM.CREATE_FORM.INVALID_NAME': null,
    'CLASSROOM.CREATE_FORM.INVALID_GRADE': null,
    'CLASSROOM.CREATE_FORM.INVALID_YEAR': null,
    'CLASSROOM.CREATE_FORM.SUBMITTED_MESSAGE': null,
  }
  
  const { translate } = useTranslation(translation)

  return {
    form,
    inputPropsOf: form.getInputProps,
    submitForm,
    loadFormValues,
  }
}
