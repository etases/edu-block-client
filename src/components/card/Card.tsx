import { Paper, PaperProps } from '@mantine/core'

export function Card(props: PaperProps) {
  return (
    <Paper
      // shadow={'md'}
      radius={'md'}
      withBorder={true}
      {...props}
    />
  )
}
