import { useAccountListPasswordUpdateMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { notifyInformation } from '@utilities/functions'
import { useTranslation } from '@hooks/use-translation'

interface AccountInterface {
  username: string
  password: string
}

interface FormInterface {
  accounts: AccountInterface[]
}

export function useAccountListPasswordUpdateForm() {
  const form = useForm<FormInterface>({
    validate: {
      accounts: {
        username: (value) => /.{3,}/.test(value) && null,
        password: (value) =>
          /.{6,}/.test(value)
            ? null
            : translate("ACCOUNT_LIST.UPDATE_FORM.UPDATE_PASSWORD"),
      },
    },
    validateInputOnBlur: true,
  })

  const { mutate: updatePassword } = useAccountListPasswordUpdateMutation()

  const submitForm = form.onSubmit((values) => {
    updatePassword(values)
    notifyInformation({
      message: translate("ACCOUNT_LIST.UPDATE_FORM.UPDATE_PASSWORD_MSG") + `${values.accounts.at(0)?.username}`,
    })
  })

  function loadFormValues(value: { username: string }) {
    form.setValues({
      accounts: [{ password: '', ...value }],
    })
  }

  const translation = {
    'ACCOUNT_LIST.UPDATE_FORM.UPDATE_PASSWORD': null,
    'ACCOUNT_LIST.UPDATE_FORM.UPDATE_PASSWORD_MSG': null,
  }
  
  const { translate } = useTranslation(translation)

  return {
    inputPropsOf: form.getInputProps,
    submitForm,
    loadFormValues,
  }
}
