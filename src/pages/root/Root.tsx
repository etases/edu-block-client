import { HorizontalStack, IconButton } from '@components'
import { useRootPage } from '@hooks/use-page'
import { Affix, ScrollArea, SegmentedControl } from '@mantine/core'
import { IconLoader } from '@tabler/icons'
import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

export function Root() {
  const { spacing, navigate, loading, i18n } = useRootPage()

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
          <HorizontalStack>
            {!!loading ? (
              <IconButton
                label={'loading'}
                color={'blue'}
                variant={'transparent'}
                size={'md'}
                loading={!!loading}
              >
                {!!loading && <IconLoader />}
              </IconButton>
            ) : (
              <SegmentedControl
                size={'xs'}
                radius={'md'}
                data={[
                  {
                    label: 'EN',
                    value: 'en',
                  },
                  {
                    label: 'VI',
                    value: 'vi',
                  },
                ]}
                value={i18n.language}
                onChange={i18n.changeLanguage}
              />
            )}
          </HorizontalStack>
        </Affix>
      </Fragment>
    </ScrollArea>
  )
}
