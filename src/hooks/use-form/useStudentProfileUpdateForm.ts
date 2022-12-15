import { useStudentProfileUpdateMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { notifyInformation } from '@utilities/functions'
import { useTranslation } from '@hooks/use-translation'

interface FormInterface {
  ethnic: string
  fatherName: string
  fatherJob: string
  motherName: string
  motherJob: string
  guardianName: string
  guardianJob: string
  homeTown: string
}

export function useStudentProfileUpdateForm() {
  const form = useForm<FormInterface>({
    initialValues: {
      ethnic: '',
      fatherJob: '',
      fatherName: '',
      guardianJob: '',
      guardianName: '',
      homeTown: '',
      motherJob: '',
      motherName: '',
    },
    validate: {},
    validateInputOnBlur: true,
  })
  const {
    mutation: { mutate: updateProfile },
  } = useStudentProfileUpdateMutation()

  const submitForm = form.onSubmit((values) => {
    updateProfile(values)
    notifyInformation({ message: translate("STUDENT.PROFILE_UPDATE_FORM.MESSAGE") })
  })

  function loadFormValues(values: FormInterface) {
    form.setValues(values)
  }

  const translation = {
    'STUDENT.PROFILE_UPDATE_FORM.MESSAGE': null,
  }
  
  const { translate } = useTranslation(translation)

  return {
    submitForm,
    inputPropsOf: form.getInputProps,
    loadFormValues,
    form,
  }
}
