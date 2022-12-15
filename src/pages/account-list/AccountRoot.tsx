import { HorizontalStack, VerticalStack } from '@components'
import { Divider, Tabs, Title, useMantineTheme } from '@mantine/core'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAccountListPage } from '@hooks/use-page'

const { List: TabList, Tab: TabItem } = Tabs

const tabItems = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'admins',
    label: 'Admins',
  },
  {
    value: 'staffs',
    label: 'Staffs',
  },
  {
    value: 'teachers',
    label: 'Teachers',
  },
  {
    value: 'students',
    label: 'Students',
  },
]

export function AccountRoot() {
  const navigate = useNavigate()

  const { colors } = useMantineTheme()

  const { translatedTextRoot } = useAccountListPage()

  return (
    <VerticalStack>
      <VerticalStack>
        <HorizontalStack position={'apart'}>
          <Title>{translatedTextRoot?.["ACCOUNT_LIST_PAGE.TITLE"]}</Title>
        </HorizontalStack>
      </VerticalStack>
      <Divider />
      {/* <Tabs
        radius={'md'}
        defaultValue={tabItems[0].value}
        onTabChange={(value) => navigate(value || tabItems[0].value)}
        // variant={'outline'}
      >
        <TabList
          position={'apart'}
          grow={true}
        >
          {tabItems.map(({ label, value }, index) => {
            const color =
              Object.keys(colors).reverse()[index % Object.keys(colors).length]
            return (
              <TabItem
                key={`tabItem__${index}__${value}`}
                value={value}
                // color={color}
              >
                <Text
                  size={'lg'}
                  weight={'bold'}
                >
                  {label}
                </Text>
              </TabItem>
            )
          })}
        </TabList>
      </Tabs> */}
      <Outlet />
    </VerticalStack>
  )
}
