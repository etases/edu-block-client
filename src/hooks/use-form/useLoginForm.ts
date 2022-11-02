import { useLoginMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'

export function useLoginForm() {
  const form = useForm({
    initialValues: {
      accountId: 'AdminST',
      password: 'password',
    },
    // validate: {
    //   accountId: (value) => (/.{6,}/.test(value) ? null : 'Invalid Account Id'),
    //   password: (value) => (/.{8,}/.test(value) ? null : 'Invalid password'),
    // },
    validateInputOnBlur: true,
  })

  const { mutate: login } = useLoginMutation()

  const submitForm = form.onSubmit(({ accountId, password }) =>
    login({
      username: accountId,
      password,
    })
  )

  return { submitForm, inputPropsOf: form.getInputProps }
}
