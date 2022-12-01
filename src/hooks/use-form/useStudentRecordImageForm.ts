import {
  useStudentRecordImageMutation,
  useStudentRecordTableMutation,
} from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { notifyInformation } from '@utilities/functions'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

interface FormInterface {
  requests: {
    studentId: number
    classroomId: number
    subjectId: string
    firstHalfScore: number
    secondHalfScore: number
    finalScore: number
  }[]
}

export function useStudentRecordImageForm() {
  const { accountId, classroomId } = useParams()
  const imageForm = useForm()
  const tableForm = useForm<FormInterface>({
    initialValues: {
      requests: [],
    },
  })

  const formData = new FormData()

  const {
    mutation: { mutate: scanImage, data, isLoading: imageScanning },
  } = useStudentRecordImageMutation()

  const {
    mutation: { mutate: requestUpdate },
  } = useStudentRecordTableMutation()

  const submitImageForm = imageForm.onSubmit(() => {
    scanImage(formData)
  })

  const submitTableForm = tableForm.onSubmit((values) => {
    requestUpdate({
      // @ts-ignore
      requests: values.requests.map((item) =>
        Object.entries(item).reduce(
          (result, [key, value]) => ({ ...result, [key]: Number(value) }),
          {}
        )
      ),
    })
    notifyInformation({ message: `Submitted new table record` })
  })

  async function onImageChange(value: File) {
    formData.set('file', value)
  }

  useEffect(() => {
    data?.forEach((item, index) => {
      console.log(item)
      if (tableForm.values.requests.at(index)) {
        tableForm.setFieldValue(
          `requests.${index}.subjectId`,
          item[0].toString()
        )
        tableForm.setFieldValue(
          `requests.${index}.firstHalfScore`,
          Number(item[2])
        )
        tableForm.setFieldValue(
          `requests.${index}.secondHalfScore`,
          Number(item[3])
        )
        tableForm.setFieldValue(`requests.${index}.finalScore`, Number(item[4]))
        tableForm.setFieldValue(
          `requests.${index}.studentId`,
          Number(accountId)
        )
        tableForm.setFieldValue(
          `requests.${index}.classroomId`,
          Number(classroomId)
        )
      } else {
        tableForm.insertListItem(
          'requests',
          {
            subjectId: item[0].toString(),
            firstHalfScore: Number(item[2]),
            secondHalfScore: Number(item[3]),
            finalScore: Number(item[4]),
            studentId: Number(accountId),
            classroomId: Number(classroomId),
          },
          index
        )
      }
    })
  }, [data])

  return {
    submitImageForm,
    submitTableForm,
    onImageChange,
    image: (formData.get('file') as File) || null,
    state: {
      imageScanning,
    },
    tableForm,
    inputPropsOf: tableForm.getInputProps,
  }
}
