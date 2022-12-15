import { useProfileUpdateMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { dayjs, notifyInformation } from '@utilities/functions'
import { useTranslation } from '@hooks/use-translation'

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
          : translate("PROFILE.UPDATE_FORM.INVALID_EMAIL"),
      phone: (value) =>
        /^\d{10}$/.test(value)
          ? null
          : translate("PROFILE.UPDATE_FORM.INVALID_PHONE"),
      birthDate: (value) =>
        dayjs(value).isBefore(dayjs().subtract(6, 'year').startOf('year'))
          ? null
          : translate("PROFILE.UPDATE_FORM.INVALID_DOB"),
      address: (value) =>
        value.length > 0 ? null : translate("PROFILE.UPDATE_FORM.INVALID_ADDRESS"),
      firstName: (value) => (value.length > 1 ? null : translate("PROFILE.UPDATE_FORM.INVALID_NAME")),
      lastName: (value) => (value.length > 1 ? null : translate("PROFILE.UPDATE_FORM.INVALID_NAME")),
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
    notifyInformation({ message: translate("PROFILE.UPDATE_FORM.MESSAGE") })
  })

  function loadFormValues(profileId: number, values: FormInterface) {
    form.setValues(values)
    setSelectedProfileId(profileId.toString())
  }

  const translation = {
    'PROFILE.UPDATE_FORM.INVALID_EMAIL': null,
    'PROFILE.UPDATE_FORM.INVALID_PHONE': null,
    'PROFILE.UPDATE_FORM.INVALID_DOB': null,
    'PROFILE.UPDATE_FORM.INVALID_ADDRESS': null,
    'PROFILE.UPDATE_FORM.INVALID_NAME': null,
    'PROFILE.UPDATE_FORM.MESSAGE': null,
  }
  
  const { translate } = useTranslation(translation)

  return { submitForm, loadFormValues, inputPropsOf: form.getInputProps, form }
}
