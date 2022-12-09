import { useClassroomStudentAddMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { notifyInformation } from '@utilities/functions'

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
    // console.log(values.accounts.map((item) => parseInt(item.id)))
    notifyInformation({
      message: `Submitted list of new students for this classroom`,
    })
  })

  function addStudentToList(student: {
    id: number
    name: string
    avatar?: string
  }) {
    if (form.values.accounts.indexOf(student) < 0)
      form.insertListItem('accounts', student)
  }

  function removeStudentFromList(index: number) {
    form.removeListItem('accounts', index)
  }

  return {
    form,
    submitForm,
    inputPropsOf: form.getInputProps,
    addStudentToList,
    removeStudentFromList,
  }
}
