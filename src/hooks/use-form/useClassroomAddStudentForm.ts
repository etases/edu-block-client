import { useClassroomStudentAddMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { notifyInformation } from '@utilities/functions'
import { useTranslation } from '@hooks/use-translation'

interface FormInterface {
  accounts: any[]
}

export function useClassroomAddStudentForm() {
  const form = useForm<FormInterface>({
    initialValues: {
      accounts: [],
    },
  })

  const {
    mutation: { mutate: addStudent },
  } = useClassroomStudentAddMutation()

  const submitForm = form.onSubmit((values) => {
    addStudent({
      accounts: values.accounts.map((item) => parseInt(item.id)),
    })
    notifyInformation({
      message: translate("CLASSROOM.ADD_STUDENT_FORM.MESSAGE"),
    })
  })

  function addStudentToList(student: {
    id: number
    name: string
    avatar?: string
  }) {
    if (form.values.accounts.indexOf(student) < 0 && !!student.id  )
      form.insertListItem('accounts', student)
  }

  function removeStudentFromList(index: number) {
    form.removeListItem('accounts', index)
  }

  const translation = {
    'CLASSROOM.ADD_STUDENT_FORM.MESSAGE': null,
  }
  
  const { translate } = useTranslation(translation)

  return {
    form,
    submitForm,
    inputPropsOf: form.getInputProps,
    addStudentToList,
    removeStudentFromList,
  }
}
