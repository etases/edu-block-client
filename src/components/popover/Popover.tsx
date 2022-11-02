import { Popover as MPopover, PopoverProps } from '@mantine/core'

const { Dropdown: PopoverDropdown, Target: PopoverTarget } = MPopover

export function Popover(props: PopoverProps) {
  return (
    <MPopover
      position={'bottom'}
      withArrow={true}
      transition={'slide-down'}
      {...props}
    />
  )
}

export { PopoverDropdown, PopoverTarget }
