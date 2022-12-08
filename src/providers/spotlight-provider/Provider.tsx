import { useSpotlightActionsStore } from '@hooks/use-store'
import { SpotlightProvider as Provider } from '@mantine/spotlight'
import { ReactNode } from 'react'

export function SpotlightProvider(props: { children: ReactNode }) {
  const { children } = props

  const { spotlightActions } = useSpotlightActionsStore()

  return (
    <Provider
      actions={[
        ...spotlightActions,
        {
          title: 'View verified data',
          onTrigger(action) {
            window.location.href = '/verified'
          },
        },
        {
          title: 'View verified data list',
          onTrigger(action) {
            window.location.href = '/verified-list'
          },
        },
      ]}
    >
      {children}
    </Provider>
  )
}
