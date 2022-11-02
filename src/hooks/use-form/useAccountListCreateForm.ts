import { useAccountListCreateMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'

interface AccountInterface {
  firstName: string
  lastName: string
  role: string
}

interface FormInterface {
  accounts: AccountInterface[]
}

export function useAccountListCreateForm() {
  const form = useForm<FormInterface>({
    initialValues: {
      accounts: [
        {
          firstName: '',
          lastName: '',
          role: '',
        },
      ],
    },
    validate: {
      accounts: {
        firstName: (value) => (value.length > 1 ? null : 'At least 2 letters'),
        lastName: (value) => (value.length > 1 ? null : 'At least 2 letters'),
        role: (value) => (value.length > 0 ? null : 'Must choose a role'),
      },
    },
    validateInputOnBlur: true,
  })

  const { mutate: createAccount } = useAccountListCreateMutation()

  function insertAccountToList(account?: AccountInterface) {
    form.insertListItem('accounts', account || {})
  }

  function bulkInsertAccountsToList(accounts: AccountInterface[]) {
    accounts.forEach((item) => form.insertListItem('accounts', item))
  }

  function removeAccountFromList(index: number) {
    form.removeListItem('accounts', index)
  }

  const submitForm = form.onSubmit((values) => createAccount(values))

  return {
    inputPropsOf: form.getInputProps,
    submitForm,
    insertAccountToList,
    bulkInsertAccountsToList,
    removeAccountFromList,
    form,
  }
}
