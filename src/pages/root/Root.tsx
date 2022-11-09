import { IconButton } from '@components'
import { useRootPage } from '@hooks/use-page'
import { Affix, ScrollArea } from '@mantine/core'
import { IconQuestionMark } from '@tabler/icons'
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
        <Affix position={{ bottom: spacing.md, right: spacing.md }}>
          {/* <Popover>
          <PopoverTarget> */}
          <IconButton
            label={'Help'}
            color={'blue'}
            variant={'filled'}
            size={'md'}
            loading={!!loading}
          >
            <IconQuestionMark />
          </IconButton>
          {/* </PopoverTarget>
          <PopoverDropdown>
            <ButtonGroup orientation={'vertical'}>
              <Button
                variant={'default'}
                onClick={() => navigate('/')}
              >
                Home
              </Button>
              <Button
                variant={'default'}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </ButtonGroup>
          </PopoverDropdown>
        </Popover> */}
        </Affix>
      </Fragment>
    </ScrollArea>
  )
}
