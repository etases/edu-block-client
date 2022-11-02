import { Select, SelectProps } from '@mantine/core'

export function SelectInput(props: SelectProps) {
  return (
    <Select
      size={'md'}
      radius={'md'}
      clearable={true}
      allowDeselect={true}
      {...props}
    />
  )
}
