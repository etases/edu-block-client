import { useClassroomTeacherAddMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { notifyInformation } from '@utilities/functions'
import { useTranslation } from '@hooks/use-translation'

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
      message: translate("CLASSROOM.ADD_TEACHER_FORM.MESSAGE"),
    })
  })

  function addTeacherToList(teacher: any) {
    if (
      form.values.teachers.findIndex(
        (tc) => tc.subjectId === teacher.subjectId
      ) < 0 &&
      typeof teacher.subject !== 'undefined' &&
      ((teacher.subject as string) || '').length > 0
    )
      form.insertListItem('teachers', teacher)
  }

  function removeTeacherFromList(index: number) {
    form.removeListItem('teachers', index)
  }

  const translation = {
    'CLASSROOM.ADD_TEACHER_FORM.MESSAGE': null,
  }
  
  const { translate } = useTranslation(translation)

  return {
    form,
    submitForm,
    inputPropsOf: form.getInputProps,
    addTeacherToList,
    removeTeacherFromList,
  }
}
