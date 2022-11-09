import { HorizontalStack, IconButton, Table, VerticalStack } from '@components'
import { useTeacherDashboardPage } from '@hooks/use-page'
import { Divider, Title } from '@mantine/core'
import { IconFileSearch } from '@tabler/icons'

export function TeacherDashboard() {
  const {
    table: { tableData, tableHeaders },
    others: { navigate },
  } = useTeacherDashboardPage()

  return (
    <VerticalStack>
      <HorizontalStack>
        <Title>Teacher Dashboard</Title>
      </HorizontalStack>
      <Divider />
      <Table
        tableData={tableData.map((item) => ({
          ...item,
          actions: (
            <HorizontalStack>
              <IconButton
                label={'Details'}
                onClick={() => navigate(`/app/classroom/${item.classroomId}`)}
              >
                <IconFileSearch />
              </IconButton>
            </HorizontalStack>
          ),
        }))}
        tableHeader={tableHeaders}
      />
    </VerticalStack>
  )
}
