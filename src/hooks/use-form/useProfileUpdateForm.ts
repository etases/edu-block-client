import { useProfileUpdateMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import dayjs from 'dayjs'

interface FormInterface {
  firstName: string
  lastName: string
  male: string
  avatar: string
  birthDate: Date
  address: string
  phone: string
  email: string
}

export function useProfileUpdateForm() {
  const form = useForm<FormInterface>({
    initialValues: {
      address: '',
      avatar: '',
      birthDate: new Date(),
      email: '',
      firstName: '',
      lastName: '',
      male: '1',
      phone: '',
    },
    validate: {
      // email: (value) => /.+@.+/.test(value),
      // phone: (value) => /(\+84|0)[93]\d{8}/.test(value),
    },
    validateInputOnBlur: true,
  })

  const {
    mutation: { mutate: updateProfile },
    state: {
      profile: { setSelectedProfileId },
    },
  } = useProfileUpdateMutation()

  const submitForm = form.onSubmit((values) => {
    updateProfile({
      ...values,
      male: parseInt(values.male) === 1 ? true : false,
      birthDate: dayjs(values.birthDate).format('YYYY-MM-DD'),
    })
  })

  function loadFormValues(profileId: number, values: FormInterface) {
    form.setValues(values)
    setSelectedProfileId(profileId)
  }

  return { submitForm, loadFormValues, inputPropsOf: form.getInputProps, form }
}
