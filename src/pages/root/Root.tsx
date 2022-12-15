import { HorizontalStack, IconButton, VerticalStack } from '@components'
import { useRootPage } from '@hooks/use-page'
import { Affix, SegmentedControl } from '@mantine/core'
import { IconLoader } from '@tabler/icons'
import { Outlet } from 'react-router-dom'

export function Root() {
  const { spacing, navigate, loading, i18n } = useRootPage()

  return (
    <VerticalStack h={'100%'}>
      <Outlet />
      <Affix position={{ bottom: spacing.md, right: spacing.md }}>
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
    </VerticalStack>
  )
}
