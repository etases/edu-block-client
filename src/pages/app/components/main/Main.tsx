import { Box } from '@mantine/core'
import { Outlet } from 'react-router-dom'

interface MainProps {}

export function Main(props: MainProps) {
  const {} = props

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Outlet />
    </Box>
  )
}
