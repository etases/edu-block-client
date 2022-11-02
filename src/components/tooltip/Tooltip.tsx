import { Tooltip as MTooltip, TooltipProps } from '@mantine/core'

export function Tooltip(props: TooltipProps) {
  return (
    <MTooltip
      withArrow={true}
      transition={'slide-up'}
      {...props}
    />
  )
}
