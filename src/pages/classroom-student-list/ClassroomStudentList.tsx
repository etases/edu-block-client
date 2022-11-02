import { Table, VerticalStack } from '@components'
import { useClassroomStudentsPage } from '@hooks/use-page'

export function ClassroomStudentList() {
  const {
    table: { tableHeaders, tableData },
  } = useClassroomStudentsPage()
  return (
    <VerticalStack>
      <Table
        tableHeader={tableHeaders}
        tableData={tableData.map((item) => ({ ...item, actions: '' }))}
      />
    </VerticalStack>
  )
}
