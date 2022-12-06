import { HorizontalStack, VerticalStack } from '@components'
import { Divider, Tabs, Title, useMantineTheme } from '@mantine/core'
import { Outlet, useNavigate } from 'react-router-dom'

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

  return (
    <VerticalStack>
      <VerticalStack>
        <HorizontalStack position={'apart'}>
          <Title>Accounts</Title>
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
