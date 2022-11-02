import { ThemeIcon, ThemeIconProps } from '@mantine/core'

export function IconWrapper(props: ThemeIconProps) {
  return (
    <ThemeIcon
      variant={'outline'}
      // size={'md'}
      // radius={'md'}
      {...props}
    />
  )
}
