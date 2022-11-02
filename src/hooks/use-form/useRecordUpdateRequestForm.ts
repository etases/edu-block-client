import { useRecordUpdateRequestMutation } from '@hooks/use-query/mutations'
import { useForm } from '@mantine/form'

interface FormInterface {
  studentId: string
  classroomId: string
  firstHalfScore: string
  secondHalfScore: string
  finalScore: string
  subjectId: string
}

interface UseRecordUpdateRequestFormProps {
  initialValues: FormInterface
}

export function useRecordUpdateRequestForm(
  props: UseRecordUpdateRequestFormProps
) {
  const { initialValues } = props
  const form = useForm<FormInterface>({
    initialValues,
    validate: {
      classroomId: (value) => !!value,
      finalScore: (value) => !!value,
      firstHalfScore: (value) => !!value,
      secondHalfScore: (value) => !!value,
      studentId: (value) => !!value,
      subjectId: (value) => !!value,
    },
    validateInputOnBlur: true,
  })

  const { mutate: requestUpdate } = useRecordUpdateRequestMutation()

  const submitForm = form.onSubmit((values) => requestUpdate(values))

  const loadFormValues = (values: FormInterface) => {
    form.setValues(values)
  }

  return { inputPropsOf: form.getInputProps, submitForm, loadFormValues }
}
