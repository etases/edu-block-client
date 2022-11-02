import { useSpotlightActionsStore } from '@hooks/use-store'
import { SpotlightProvider as Provider } from '@mantine/spotlight'
import { ReactNode } from 'react'

export function SpotlightProvider(props: { children: ReactNode }) {
  const { children } = props

  const { spotlightActions } = useSpotlightActionsStore()

  return <Provider actions={spotlightActions}>{children}</Provider>
}
