import { Provider } from 'jotai'
import { ReactNode } from 'react'
import { Devtools } from './Devtools'

export function JotaiProvider(props: { children: ReactNode }) {
  const { children } = props
  return (
    <Provider>
      {children}
      <Devtools />
    </Provider>
  )
}
