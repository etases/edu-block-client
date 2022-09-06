import {
  ModalsProvider as Provider,
  ModalsProviderProps as ProviderProps,
} from '@mantine/modals'

export function ModalProvider(props: ProviderProps) {
  const { children } = props

  return <Provider>{children}</Provider>
}
