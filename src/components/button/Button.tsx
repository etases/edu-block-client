import { Button as MButton, ButtonProps } from '@mantine/core'
import { ButtonHTMLAttributes } from 'react'

// interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {}

const { Group: ButtonGroup } = MButton

export function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
) {
  return (
    <MButton
      size={'md'}
      radius={'md'}
      {...props}
    />
  )
}

export { ButtonGroup }
