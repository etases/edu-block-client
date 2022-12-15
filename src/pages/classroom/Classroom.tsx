import { HorizontalStack, VerticalStack } from '@components'
import { useAccountStore } from '@hooks/use-store'
import { useTranslation } from '@hooks/use-translation'
import { Divider, Tabs, Text, Title, useMantineTheme } from '@mantine/core'
import { Outlet, useNavigate } from 'react-router-dom'

const { List: TabList, Tab: TabItem } = Tabs

const tabItems = [
  {
    value: 'details',
    label: 'CLASS_DETAIL.DETAILS',
  },
  {
    value: 'students',
    label: 'CLASS_DETAIL.STUDENTS',
    role: ['STAFF', 'ADMIN', 'TEACHER'],
  },
  {
    value: 'teachers',
    label: 'CLASS_DETAIL.TEACHERS',
  },
]

export function Classroom() {
  const {translate} = useTranslation();
  const { colors } = useMantineTheme()
  const navigate = useNavigate()
  const { account } = useAccountStore()

  return (
    <VerticalStack>
      <HorizontalStack>
        <Title>{translate("CLASS_DETAIL.TITLE")}</Title>
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
                    {translate(label)}
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
