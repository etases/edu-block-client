import {
  Textarea,
  TextareaProps,
  TextInput as Input,
  TextInputProps as InputProps,
} from '@mantine/core'

export function TextInput(props: InputProps) {
  return (
    <Input
      variant={'default'}
      size={'md'}
      radius={'md'}
      {...props}
    />
  )
}

export function TextareaInput(props: TextareaProps) {
  return (
    <Textarea
      size={'md'}
        radius={'md'}
      {...props}
    />
  )
}
