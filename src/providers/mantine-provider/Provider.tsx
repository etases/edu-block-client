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
      theme={{
        loader: 'dots',
        globalStyles: (theme) => ({
          html: {
            width: '100vw',
            height: '100vh',
          },
          body: {
            width: '100%',
            height: '100%',
          },
          '#root': {
            width: '100%',
            height: '100%',
            userSelect: 'none',
          },
        }),
      }}
    >
      {children}
    </Provider>
  )
}
