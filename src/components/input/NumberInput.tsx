import { NumberInput as MNumberInput, NumberInputProps } from '@mantine/core'

export function NumberInput(props: NumberInputProps) {
  return (
    <MNumberInput
      size={'md'}
      radius={'md'}
      {...props}
    />
  )
}
