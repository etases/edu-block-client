import { useClassroomTeacherAddMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { notifyInformation } from '@utilities/functions'

interface TeacherInterface {
  teacherId: string
  subjectId: string
  name: string
  avatar: string
  subject: string
}

interface FormInterface {
  teachers: TeacherInterface[]
}

export function useClassroomAddTeacherForm() {
  const form = useForm<FormInterface>({
    initialValues: {
      teachers: [],
    },
  })

  const {
    mutation: { mutate: addTeacher },
  } = useClassroomTeacherAddMutation()

  const submitForm = form.onSubmit((values) => {
    addTeacher({
      teachers: values.teachers.map((item) => ({
        subjectId: parseInt(item.subjectId),
        teacherId: parseInt(item.teacherId),
      })),
    })
    notifyInformation({
      message: `Submitted list of new teachers for this classroom`,
    })
  })

  function addTeacherToList(teacher: any) {
    if (
      form.values.teachers.findIndex(
        (tc) => tc.subjectId === teacher.subjectId
      ) < 0
    )
      form.insertListItem('teachers', teacher)
  }

  function removeTeacherFromList(index: number) {
    form.removeListItem('teachers', index)
  }

  return {
    form,
    submitForm,
    inputPropsOf: form.getInputProps,
    addTeacherToList,
    removeTeacherFromList,
  }
}
