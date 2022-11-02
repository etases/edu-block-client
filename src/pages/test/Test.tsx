import { useAccountListQuery } from '@hooks/use-query'
import { Center } from '@mantine/core'

// const tableHeader: TableHeaderProps[] = [
//   {
//     identifier: 'id',
//     label: 'Id',
//   },
//   {
//     identifier: 'role',
//     label: 'Role',
//   },
//   {
//     identifier: 'name',
//     label: 'Name',
//     align: 'left',
//   },
//   {
//     identifier: 'gender',
//     label: 'Gender',
//   },
//   {
//     identifier: 'dob',
//     label: 'Date of Birth',
//   },
//   {
//     identifier: 'actions',
//     label: 'Actions',
//   },
// ]

export function Test() {
  const { data } = useAccountListQuery()
  return (
    <Center
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      {/* <ScrollArea style={{ width: '100%', height: '100%' }}>
        <Table
          tableHeader={tableHeader}
          tableData={
            data?.map((row) =>
              tableHeader.reduce(
                (cols, { identifier }) => ({
                  ...cols,
                  [identifier]: row[identifier as keyof typeof row] || '',
                }),
                {}
              )
            ) || []
          }
        />
      </ScrollArea> */}
    </Center>
  )
}
