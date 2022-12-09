import { HorizontalStack, VerticalStack } from '@components'
import { useAccountStore } from '@hooks/use-store'
import { Divider, Tabs, Text, Title, useMantineTheme } from '@mantine/core'
import { Outlet, useNavigate } from 'react-router-dom'

const { List: TabList, Tab: TabItem } = Tabs

const tabItems = [
  {
    value: 'details',
    label: 'Details',
  },
  {
    value: 'students',
    label: 'Students',
    role: ['STAFF', 'ADMIN', 'TEACHER'],
  },
  {
    value: 'teachers',
    label: 'Teachers',
  },
]

export function Classroom() {
  const { colors } = useMantineTheme()
  const navigate = useNavigate()
  const { account } = useAccountStore()

  return (
    <VerticalStack>
      <HorizontalStack>
        <Title>Classroom</Title>
      </HorizontalStack>
      <Divider />
      <Tabs
        radius={'md'}
        defaultValue={tabItems[0].value}
        onTabChange={(value) => navigate(value || tabItems[0].value)}
      >
        <TabList
          position={'apart'}
          grow={true}
        >
          {tabItems
            .filter(
              ({ role = [] }) =>
                role.includes(account.role) || role.length === 0
            )
            .map(({ label, value }, index) => {
              const color =
                Object.keys(colors).reverse()[
                  index % Object.keys(colors).length
                ]
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
      </Tabs>
      <Outlet />
    </VerticalStack>
  )
}
