import {
  NotificationProviderProps as ProviderProps,
  NotificationsProvider as Provider,
} from '@mantine/notifications'

export function NotificationProvider(props: ProviderProps) {
  const { children } = props

  return (
    <Provider
      limit={1}
      position={'top-right'}
    >
      {children}
    </Provider>
  )
}
