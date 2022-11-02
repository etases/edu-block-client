import { useDashboardPage } from '@hooks/use-page'
import { Center, Title } from '@mantine/core'

const PAGE_TITLE = 'Dashboard'

export function Dashboard() {
  const {} = useDashboardPage()

  return (
    <Center
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Title>{PAGE_TITLE}</Title>
    </Center>
  )
}
