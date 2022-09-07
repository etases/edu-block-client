import { useSessionStorage } from '@hooks'
import { Center, Title } from '@mantine/core'
import { useEffect } from 'react'

const PAGE_TITLE = 'Dashboard'

export function Dashboard() {
  const { setState: setTitle } = useSessionStorage({ key: 'title' })

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

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
