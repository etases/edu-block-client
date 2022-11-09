import {
  PasswordInput as Input,
  PasswordInputProps as InputProps,
} from '@mantine/core'

export function PasswordInput(props: InputProps) {
  return (
    <Input
      // variant={'filled'}
      size={'md'}
      radius={'md'}
      {...props}
    />
  )
}
