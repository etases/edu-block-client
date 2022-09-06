import { Router } from '@routes'
import { JotaiProvider } from './jotai-provider'
import { MantineProvider } from './mantine-provider'
import { ModalProvider } from './modal-provider'
import { NotificationProvider } from './notification-provider'
import { QueryProvider } from './query-provider'
import { SpotlightProvider } from './spotlight-provider'

export function Providers() {
  return (
    <MantineProvider>
      <NotificationProvider>
        <ModalProvider>
          <SpotlightProvider>
            <JotaiProvider>
              <QueryProvider>
                <Router />
              </QueryProvider>
            </JotaiProvider>
          </SpotlightProvider>
        </ModalProvider>
      </NotificationProvider>
    </MantineProvider>
  )
}
