import { Stack, StackProps } from '@mantine/core'

export function VerticalStack(props: StackProps) {
  return (
    <Stack
      spacing={'md'}
      // px={'md'}
      {...props}
    />
  )
}
