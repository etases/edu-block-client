import { Table, VerticalStack } from '@components'
import { useClassroomTeachersPage } from '@hooks/use-page'

export function ClassroomTeacherList() {
  const {
    table: { tableData, tableHeaders },
  } = useClassroomTeachersPage()
  return (
    <VerticalStack>
      <Table
        tableHeader={tableHeaders}
        tableData={tableData.map((item) => ({ ...item, actions: '' }))}
      />
    </VerticalStack>
  )
}
