import { useSessionStorage } from '@hooks'
import { useDocumentTitle } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'

export function Root() {
  const { state: title } = useSessionStorage({
    key: 'title',
  })

  useDocumentTitle(title)

  return (
    // <ScrollArea sx={{ width: '100%', height: '100%' }}>
    <Outlet />
    // </ScrollArea>
  )
}
