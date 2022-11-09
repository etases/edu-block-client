import { useClassroomStudentAddMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'

interface FormInterface {
  accounts: string[]
}

export function useClassroomAddStudentForm() {
  const form = useForm<FormInterface>({
    initialValues: {
      accounts: ['0'],
    },
  })

  const {
    mutation: { mutate: addStudent },
  } = useClassroomStudentAddMutation()

  const submitForm = form.onSubmit((values) =>
    addStudent({
      ...values,
      accounts: values.accounts.map((item) => parseInt(item)),
    })
  )

  function addStudentToList(student?: number) {
    form.insertListItem('account', student || {})
  }

  function removeStudentFromList(index?: number) {
    if (form.values.accounts.length === 1) {
      form.reset()
      return
    }
    form.removeListItem('account', index || form.values.accounts.length - 1)
  }

  return {
    form,
    submitForm,
    inputPropsOf: form.getInputProps,
    addStudentToList,
    removeStudentFromList,
  }
}
