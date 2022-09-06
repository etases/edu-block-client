import {
  MantineProvider as Provider,
  MantineProviderProps as ProviderProps,
} from '@mantine/core'

export function MantineProvider(props: ProviderProps) {
  const { children } = props

  return (
    <Provider
      withNormalizeCSS={true}
      withCSSVariables={true}
      withGlobalStyles={true}
    >
      {children}
    </Provider>
  )
}
