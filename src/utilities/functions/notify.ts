import { showNotification } from '@mantine/notifications'

interface NotifyProps {
  message: string
}

export function notifyInformation({ message }: NotifyProps) {
  showNotification({
    title: 'Information',
    color: 'blue',
    autoClose: 1000,
    message,
  })
}

export function notifyWarning({ message }: NotifyProps) {
  showNotification({
    title: 'Warning',
    color: 'orange',
    autoClose: 5000,
    message,
  })
}

export function notifyError({ message }: NotifyProps) {
  showNotification({ title: 'Error', color: 'red', autoClose: 5000, message })
}
