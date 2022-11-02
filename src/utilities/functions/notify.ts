import { showNotification } from '@mantine/notifications'

interface NotifyProps {
  message: string
}

export function notifyInformation({ message }: NotifyProps) {
  showNotification({ title: 'Information', color: 'blue', message })
}

export function notifyWarning({ message }: NotifyProps) {
  showNotification({ title: 'Warning', color: 'orange', message })
}

export function notifyError({ message }: NotifyProps) {
  showNotification({ title: 'Error', color: 'red', message })
}
