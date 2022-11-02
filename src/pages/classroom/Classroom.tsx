import { HorizontalStack, VerticalStack } from '@components'
import { Divider, Tabs, Title, useMantineTheme } from '@mantine/core'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

const { List: TabList, Tab: TabItem } = Tabs

const tabItems = [
  {
    value: 'details',
    label: 'Details',
  },
  {
    value: 'students',
    label: 'Students',
  },
  {
    value: 'teachers',
    label: 'Teachers',
  },
]

export function Classroom() {
  const { classroomId } = useParams()
  const { colors } = useMantineTheme()
  const navigate = useNavigate()
  return (
    <VerticalStack>
      <HorizontalStack>
        <Title>Classroom {classroomId}</Title>
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
          {tabItems.map(({ label, value }, index) => {
            const color =
              Object.keys(colors).reverse()[index % Object.keys(colors).length]
            return (
              <TabItem
                key={`tabItem__${index}__${value}`}
                value={value}
                // color={color}
              >
                <Title order={2}>{label}</Title>
              </TabItem>
            )
          })}
        </TabList>
      </Tabs>
      <Outlet />
    </VerticalStack>
  )
}
