import { TextInput as Input, TextInputProps as InputProps } from '@mantine/core'

export function TextInput(props: InputProps) {
  return (
    <Input
      variant={'filled'}
      size={'md'}
      radius={'md'}
      {...props}
    />
  )
}
