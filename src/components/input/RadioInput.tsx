import { Radio as MRadio, RadioGroupProps, RadioProps } from '@mantine/core'

const { Group: MRadioGroup } = MRadio

export function RadioInputGroup(props: RadioGroupProps) {
  return (
    <MRadioGroup
      size={'md'}
      {...props}
    />
  )
}

export function RadioInput(props: RadioProps) {
  return (
    <MRadio
      size={'md'}
      {...props}
    />
  )
}
