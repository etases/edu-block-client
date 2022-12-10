import { useClassroomCreateMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { notifyInformation } from '@utilities/functions'

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
      name: (value) => (value.length > 0 ? null : 'Invalid name'),
      grade: (value) =>
        Number(value) > 0 && Number(value) < 13 ? null : 'Invalid grade',
      year: (value) => (value.length === 4 ? null : 'Invalid year'),
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

    notifyInformation({ message: `Submitted new classroom information` })
  })

  function loadFormValues(values: FormInterface) {
    form.setValues(values)
  }

  return {
    form,
    inputPropsOf: form.getInputProps,
    submitForm,
    loadFormValues,
  }
}
