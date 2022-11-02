import { Autocomplete, AutocompleteProps } from '@mantine/core'

export function AutocompleteInput(props: AutocompleteProps) {
  return (
    <Autocomplete
      size={'md'}
      radius={'md'}
      transition="slide-down"
      {...props}
    />
  )
}
