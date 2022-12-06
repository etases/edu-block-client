import { useAccountPasswordUpdateMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { notifyInformation } from '@utilities/functions'

interface FormInterface {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

export function useAccountUpdatePasswordForm() {
  const form = useForm<FormInterface>({
    validate: {
      oldPassword: (value) =>
        value.length > 0 ? null : 'Old password must be provided',
      newPassword: (value) =>
        value.length > 0 ? null : 'New password must be provided',
      confirmNewPassword: (value, values) =>
        value === values.newPassword ? null : 'Password not match',
    },
    validateInputOnBlur: true,
  })

  const {
    mutation: { mutate: updatePassword },
  } = useAccountPasswordUpdateMutation()

  const submitForm = form.onSubmit(({ oldPassword, newPassword }) => {
    updatePassword({ oldPassword, newPassword })
    notifyInformation({ message: 'New password submitted' })
  })

  return { form, submitForm, inputPropsOf: form.getInputProps }
}
