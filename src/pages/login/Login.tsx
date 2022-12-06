import {
  HorizontalStack,
  PasswordInput,
  TextInput,
  VerticalStack,
} from '@components'
import { useLoginPage } from '@hooks/use-page'
import { Button, Title } from '@mantine/core'

const PAGE_TITLE = 'Login'

export function Login() {
  const {
    form: { submitForm, inputPropsOf },
  } = useLoginPage()

  return (
    <VerticalStack
      sx={{
        height: '100%',
      }}
      p={'md'}
    >
      <Title>{PAGE_TITLE}</Title>
      <form onSubmit={submitForm}>
        <VerticalStack>
          <TextInput
            label={'Account Id'}
            description={'Account Id provided by org admin'}
            required={true}
            {...inputPropsOf('accountId')}
          />
          <PasswordInput
            label={'Password'}
            description={'Password provided by org admin'}
            required={true}
            {...inputPropsOf('password')}
          />
          <HorizontalStack grow={true}>
            <Button type={'submit'}>Login</Button>
          </HorizontalStack>
        </VerticalStack>
      </form>
    </VerticalStack>
  )
}
