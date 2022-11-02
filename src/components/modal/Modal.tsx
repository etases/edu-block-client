import { Modal as MModal, ModalProps } from '@mantine/core'

export function Modal(props: ModalProps) {
  return (
    <MModal
      size={'auto'}
      closeOnClickOutside={false}
      closeOnEscape={true}
      centered={true}
      overlayBlur={1}
      transition={'slide-down'}
      radius={'md'}
      {...props}
    />
  )
}
