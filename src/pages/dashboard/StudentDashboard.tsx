import { HorizontalStack, Table, VerticalStack } from '@components'
import { useStudentDashboardPage } from '@hooks/use-page'
import { Divider, Title } from '@mantine/core'

export function StudentDashboard() {
  const {
    table: { tableData, tableHeaders },
  } = useStudentDashboardPage()

  return (
    <VerticalStack>
      <HorizontalStack>
        <Title>Student Dashboard</Title>
      </HorizontalStack>
      <Divider />
      <Table
        tableData={tableData}
        tableHeader={tableHeaders}
      />
    </VerticalStack>
  )
}
