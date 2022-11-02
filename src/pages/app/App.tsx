import { useAppPage } from '@hooks/use-page'
import { AppShell } from '@mantine/core'
import { Header, Main, Navbar } from './components'

export function App() {
  const { logout, colors } = useAppPage()

  return (
    <AppShell
      navbar={
        <Navbar
          logoutFn={logout}
          gray={colors.gray}
        />
      }
      header={<Header gray={colors.gray} />}
      padding={'md'}
      // fixed={false}
    >
      <Main />
    </AppShell>
  )
}
