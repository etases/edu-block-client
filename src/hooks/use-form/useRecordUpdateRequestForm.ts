import { useRecordUpdateRequestMutation } from '@hooks/use-query/mutations'
import { useForm } from '@mantine/form'
import { notifyInformation } from '@utilities/functions'
import { useParams } from 'react-router-dom'

interface FormInterface {
  studentId: string
  classroomId: string
  firstHalfScore: number
  secondHalfScore: number
  finalScore: number
  subjectId: number
  teacherId: number
}

export function useRecordUpdateRequestForm() {
  const { classroomId, accountId } = useParams()

  const form = useForm<FormInterface>({
    initialValues: {
      classroomId: classroomId || '',
      studentId: accountId || '',
      finalScore: 0,
      firstHalfScore: 0,
      secondHalfScore: 0,
      subjectId: 0,
      teacherId: 0,
    },
    validate: {
      // classroomId: (value) => !!value,
      // finalScore: (value) => !!value,
      // firstHalfScore: (value) => !!value,
      // secondHalfScore: (value) => !!value,
      // studentId: (value) => !!value,
      // subjectId: (value) => !!value,
    },
    validateInputOnBlur: true,
  })

  const {
    mutation: { mutate: requestUpdate },
  } = useRecordUpdateRequestMutation()

  const submitForm = form.onSubmit((values) => {
    requestUpdate({
      classroomId: parseInt(values.classroomId),
      studentId: parseInt(values.studentId),
      subjectId: values.subjectId,
      firstHalfScore: values.firstHalfScore,
      secondHalfScore: values.secondHalfScore,
      finalScore: values.finalScore,
      teacherId: values.teacherId,
    })
    notifyInformation({
      message: `Submitted update request for this record`,
    })
  })

  const loadFormValues = (values: {
    subjectId: number
    firstHalfScore: number
    secondHalfScore: number
    finalScore: number
    teacherId: number
  }) => {
    form.setValues({ ...values })
  }

  return { inputPropsOf: form.getInputProps, submitForm, loadFormValues, form }
}
