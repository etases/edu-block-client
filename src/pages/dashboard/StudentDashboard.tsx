import { HorizontalStack, IconButton, Table, VerticalStack } from '@components'
import { useStudentDashboardPage } from '@hooks/use-page'
import { Divider, Title } from '@mantine/core'
import { IconFileSearch } from '@tabler/icons'

export function StudentDashboard() {
  const {
    table: { tableData, tableHeaders },
    others: { navigate },
  } = useStudentDashboardPage()

  return (
    <VerticalStack>
      <HorizontalStack>
        <Title>Student Dashboard</Title>
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
