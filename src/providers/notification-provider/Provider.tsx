import {
  NotificationProviderProps as ProviderProps,
  NotificationsProvider as Provider,
} from '@mantine/notifications'

export function NotificationProvider(props: ProviderProps) {
  const { children } = props

  return <Provider>{children}</Provider>
}
