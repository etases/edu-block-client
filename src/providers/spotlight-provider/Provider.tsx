import { SpotlightProvider as Provider } from '@mantine/spotlight'
import { ReactNode } from 'react'

export function SpotlightProvider(props: { children: ReactNode }) {
  const { children } = props

  return <Provider actions={[]}>{children}</Provider>
}
