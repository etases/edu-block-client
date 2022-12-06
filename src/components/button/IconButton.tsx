import { Tooltip } from '@components'
import { ActionIcon, ActionIconProps, MantineColor } from '@mantine/core'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface IconButtonProps extends ActionIconProps {
  label: ReactNode
  color?: MantineColor
  forwardedRef?: any
}

export function IconButton(
  props: ButtonHTMLAttributes<HTMLButtonElement> & IconButtonProps
) {
  const { label, color, forwardedRef, ...otherProps } = props
  return (
    <Tooltip label={label}>
      <ActionIcon
        ref={forwardedRef}
        size={'md'}
        radius={'md'}
        color={color}
        variant={'transparent'}
        {...otherProps}
      />
    </Tooltip>
  )
}
