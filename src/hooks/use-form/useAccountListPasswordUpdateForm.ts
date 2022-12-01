import { useAccountListPasswordUpdateMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { notifyInformation } from '@utilities/functions'

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
        // username: (value) => /.{3,}/.test(value),
        // password: (value) => /.{6,}/.test(value),
      },
    },
    validateInputOnBlur: true,
  })

  const { mutate: updatePassword } = useAccountListPasswordUpdateMutation()

  const submitForm = form.onSubmit((values) => {
    updatePassword(values)
    notifyInformation({
      message: `Submitted new password for ${values.accounts.at(0)?.username}`,
    })
  })

  function loadFormValues(value: { username: string }) {
    form.setValues({
      accounts: [{ password: '', ...value }],
    })
  }

  return {
    inputPropsOf: form.getInputProps,
    submitForm,
    loadFormValues,
  }
}
