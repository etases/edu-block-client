import { Box, ScrollArea, useMantineTheme } from '@mantine/core'
import { useRef } from 'react'
import { Outlet } from 'react-router-dom'

interface MainProps {}

export function Main(props: MainProps) {
  const {} = props

  const ref = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)

  const theme = useMantineTheme()

  return (
    <Box
      ref={ref}
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <ScrollArea
        type={'scroll'}
        sx={{
          height:
            window.innerHeight -
            ref.current?.getBoundingClientRect().y! -
            theme.spacing.md,
        }}
        viewportRef={viewportRef}
      >
        <Outlet />
      </ScrollArea>
    </Box>
  )
}
