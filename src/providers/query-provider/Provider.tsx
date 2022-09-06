import {
  QueryClient,
  QueryClientProvider as Provider,
} from '@tanstack/react-query'
import { ReactNode } from 'react'
import { Devtools } from './Devtools'

const client = new QueryClient()

export function QueryProvider(props: { children: ReactNode }) {
  const { children } = props

  return (
    <Provider client={client}>
      {children}
      <Devtools />
    </Provider>
  )
}
