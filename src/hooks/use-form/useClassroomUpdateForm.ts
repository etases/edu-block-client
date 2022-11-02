import { useClassroomUpdateMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'

interface FormInterface {
  name: string
  grade: number
  homeroomTeacherId: number
}

export function useClassroomUpdateForm() {
  const form = useForm<FormInterface>({
    initialValues: {
      name: '',
      grade: 0,
      homeroomTeacherId: 0,
    },
    validate: {
      // name: (value) => value.length > 1,
      // grade: (value) => value > 0 && value < 13,
      // homeroomTeacherId: (value) => value !== 0,
    },
    validateInputOnBlur: true,
  })

  const {
    mutation: { mutate: updateClassroom },
    state: {
      classroom: { setSelectedClassroomId },
    },
  } = useClassroomUpdateMutation()

  function loadFormValues(selectedClassroomId: number, values: FormInterface) {
    setSelectedClassroomId(selectedClassroomId)
    form.setValues(values)
  }

  const submitForm = form.onSubmit((values) => updateClassroom(values))

  return {
    form,
    loadFormValues,
    submitForm,
    inputPropsOf: form.getInputProps,
  }
}
