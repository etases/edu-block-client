import { useProfileUpdateMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { dayjs, notifyInformation } from '@utilities/functions'

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
      email: (value) =>
        /^[a-z].+@.+\.[a-z]{2,}$/.test(value) || value.length === 0
          ? null
          : 'Invalid email format',
      phone: (value) =>
        /^\d{10}$/.test(value)
          ? null
          : 'Only 10 digits phone number are supported',
      birthDate: (value) =>
        dayjs(value).isBefore(dayjs().subtract(6, 'year').startOf('year'))
          ? null
          : 'Member age must be above 6',
      address: (value) =>
        value.length > 0 ? null : 'Address can not be empty',
      firstName: (value) => (value.length > 1 ? null : 'Invalid name'),
      lastName: (value) => (value.length > 1 ? null : 'Invalid name'),
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
    notifyInformation({ message: `Submitted new information for this profile` })
  })

  function loadFormValues(profileId: number, values: FormInterface) {
    form.setValues(values)
    setSelectedProfileId(profileId.toString())
  }

  return { submitForm, loadFormValues, inputPropsOf: form.getInputProps, form }
}
