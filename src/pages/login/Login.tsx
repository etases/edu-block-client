import {
  HorizontalStack,
  PasswordInput,
  TextInput,
  VerticalStack,
} from '@components'
import { useSessionStorage } from '@hooks'
import { Button, Title, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'

const PAGE_TITLE = 'Login'

export function Login() {
  const { setState: setTitle } = useSessionStorage({ key: 'title' })

  const {
    spacing: { md },
  } = useMantineTheme()

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

  const form = useForm({
    initialValues: {
      accountId: '',
      password: '',
    },
    validate: {
      accountId: (value) => (/.{6,}/.test(value) ? null : 'Invalid Account Id'),
      password: (value) => (/.{8,}/.test(value) ? null : 'Invalid password'),
    },
  })

  return (
    // <Center
    //   sx={{
    //     width: '100%',
    //     height: '100%',
    //   }}
    // >
    <VerticalStack
      sx={{
        height: '100%',
        padding: md,
      }}
    >
      <Title>{PAGE_TITLE}</Title>
      <form onSubmit={form.onSubmit(console.log)}>
        <VerticalStack>
          <TextInput
            label={'Account Id'}
            description={'Account Id provided by org admin'}
            required={true}
            {...form.getInputProps('accountId')}
          />
          <PasswordInput
            label={'Password'}
            description={'Password provided by org admin'}
            required={true}
            {...form.getInputProps('password')}
          />
          <HorizontalStack grow={true}>
            <Button type={'submit'}>Login</Button>
          </HorizontalStack>
        </VerticalStack>
      </form>
    </VerticalStack>
    // </Center>
  )
}
