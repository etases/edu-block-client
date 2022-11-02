import { Avatar as MAvatar, AvatarProps } from '@mantine/core'

export function Avatar(props: AvatarProps) {
  return (
    <MAvatar
      radius={'xl'}
      variant={'filled'}
      {...props}
    />
  )
}
