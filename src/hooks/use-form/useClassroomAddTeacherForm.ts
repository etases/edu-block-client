import { useClassroomTeacherAddMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'

interface TeacherInterface {
  teacherId: string
  subjectId: string
}

interface FormInterface {
  teachers: TeacherInterface[]
}

export function useClassroomAddTeacherForm() {
  const form = useForm<FormInterface>({
    initialValues: {
      teachers: [
        {
          subjectId: '0',
          teacherId: '0',
        },
      ],
    },
  })

  const {
    mutation: { mutate: addTeacher },
  } = useClassroomTeacherAddMutation()

  const submitForm = form.onSubmit((values) =>
    addTeacher({
      ...values,
      teachers: values.teachers.map((item) => ({
        ...item,
        subjectId: parseInt(item.subjectId),
        teacherId: parseInt(item.teacherId),
      })),
    })
  )

  function addTeacherToList(teacher?: TeacherInterface) {
    form.insertListItem('teachers', teacher || {})
  }

  function removeTeacherFromList(index?: number) {
    if (form.values.teachers.length === 1) {
      form.reset()
      return
    }
    form.removeListItem('teachers', index || form.values.teachers.length - 1)
  }

  return {
    form,
    submitForm,
    inputPropsOf: form.getInputProps,
    addTeacherToList,
    removeTeacherFromList,
  }
}
