import { useAccountListCreateMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { notifyInformation } from '@utilities/functions'
import { useTranslation } from '@hooks/use-translation'


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
        firstName: (value) => (value.length > 1 ? null : translate("ACCOUNT_LIST.CREATE_FORM.FIRST_NAME_VALIDATION")),
        lastName: (value) => (value.length > 1 ? null : translate("ACCOUNT_LIST.CREATE_FORM.LAST_NAME_VALIDATION")),
        role: (value) => (value.length > 0 ? null : translate("ACCOUNT_LIST.CREATE_FORM.ROLE_VALIDATION")),
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

  const submitForm = form.onSubmit((values) => {
    createAccount(values)
    notifyInformation({
      message: 'Submitted list of new accounts',
    })
  })

  const translation = {
    'ACCOUNT_LIST.CREATE_FORM.FIRST_NAME_VALIDATION': null,
    'ACCOUNT_LIST.CREATE_FORM.LAST_NAME_VALIDATION': null,
    'ACCOUNT_LIST.CREATE_FORM.ROLE_VALIDATION': null
  }
  
  const { translate } = useTranslation(translation)

  return {
    inputPropsOf: form.getInputProps,
    submitForm,
    insertAccountToList,
    bulkInsertAccountsToList,
    removeAccountFromList,
    form,
  }
}
