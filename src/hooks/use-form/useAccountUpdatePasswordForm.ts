import { useAccountPasswordUpdateMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { notifyInformation } from '@utilities/functions'
import { useTranslation } from '@hooks/use-translation'

interface FormInterface {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

export function useAccountUpdatePasswordForm() {
  const form = useForm<FormInterface>({
    validate: {
      oldPassword: (value) =>
        value.length > 0 ? null : translate("ACCOUNT.UPDATE_FORM.OLD_PASSWORD"),
      newPassword: (value) =>
        value.length > 0 ? null : translate("ACCOUNT.UPDATE_FORM.NEW_PASSWORD"),
      confirmNewPassword: (value, values) =>
        value === values.newPassword ? null : translate("ACCOUNT.UPDATE_FORM.CONFIRM_PASSWORD"),
    },
    validateInputOnBlur: true,
  })

  const {
    mutation: { mutate: updatePassword },
  } = useAccountPasswordUpdateMutation()

  const submitForm = form.onSubmit(({ oldPassword, newPassword }) => {
    updatePassword({ oldPassword, newPassword })
    notifyInformation({ message: translate("ACCOUNT.UPDATE_FORM.NEW_PASSWORD_SUBMITTED") })
  })

  const translation = {
    'ACCOUNT.UPDATE_FORM.OLD_PASSWORD': null,
    'ACCOUNT.UPDATE_FORM.NEW_PASSWORD': null,
    'ACCOUNT.UPDATE_FORM.CONFIRM_PASSWORD': null,
    'ACCOUNT.UPDATE_FORM.NEW_PASSWORD_SUBMITTED': null,
  }
  
  const { translate } = useTranslation(translation)

  return { form, submitForm, inputPropsOf: form.getInputProps }
}
