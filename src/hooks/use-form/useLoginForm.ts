import { useLoginMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { notifyInformation } from '@utilities/functions'

export function useLoginForm() {
  const form = useForm({
    initialValues: {
      accountId: '',
      password: '',
    },
    // validate: {
    //   accountId: (value) => (/.{6,}/.test(value) ? null : 'Invalid Account Id'),
    //   password: (value) => (/.{8,}/.test(value) ? null : 'Invalid password'),
    // },
    validateInputOnBlur: true,
  })

  const { mutate: login } = useLoginMutation()

  const submitForm = form.onSubmit(({ accountId, password }) => {
    login({
      username: accountId,
      password,
    })
    notifyInformation({ message: `Login credential submitted` })
  })

  return { submitForm, inputPropsOf: form.getInputProps }
}
