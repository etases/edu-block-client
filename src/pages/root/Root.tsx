import { IconButton } from '@components'
import { useRootPage } from '@hooks/use-page'
import { Affix, ScrollArea } from '@mantine/core'
import { IconLoader } from '@tabler/icons'
import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

export function Root() {
  const { spacing, navigate, loading } = useRootPage()

  return (
    <ScrollArea sx={{ width: '100%', height: '100%' }}>
      <Fragment>
        <Outlet />
        {/* <LoadingOverlay
        visible={!!isFetching}
        overlayBlur={1}
      /> */}
        {!!loading && (
          <Affix position={{ bottom: spacing.md, right: spacing.md }}>
            {/* <Popover>
          <PopoverTarget> */}
            <IconButton
              label={'loading'}
              color={'blue'}
              variant={'transparent'}
              size={'md'}
              loading={!!loading}
            >
              {!!loading && <IconLoader />}
            </IconButton>
          </Affix>
        )}
      </Fragment>
    </ScrollArea>
  )
}
