import { Badge as MBadge, BadgeProps } from '@mantine/core'

export function Badge(props: BadgeProps) {
  return (
    <MBadge
      size={'md'}
      {...props}
    />
  )
}
