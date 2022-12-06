import { HorizontalStack, IconButton, Table, VerticalStack } from '@components'
import { useRecordListPage } from '@hooks/use-page'
import { Title } from '@mantine/core'
import { IconCheck, IconDetails, IconX } from '@tabler/icons'

export function RecordList() {
  const {
    table: { tableData, tableHeaders },
    actions: { acceptRequest, rejectRequest },
    others: { navigate },
  } = useRecordListPage()

  return (
    <VerticalStack>
      <HorizontalStack>
        <Title>Records</Title>
      </HorizontalStack>
      <Table
        tableData={tableData.map((item) => ({
          ...item,
          actions: (
            <HorizontalStack>
              <IconButton
                label={'Accept'}
                color={'green'}
                onClick={() => acceptRequest(item.requestId)}
              >
                <IconCheck />
              </IconButton>
              <IconButton
                label={'Reject'}
                color={'red'}
                onClick={() => rejectRequest(item.requestId)}
              >
                <IconX />
              </IconButton>
              <IconButton
                label={'Details'}
                // color={'red'}
                onClick={() =>
                  navigate(
                    `/app/account/${item.studentId}/record/${item.classroomId}`
                  )
                }
              >
                <IconDetails />
              </IconButton>
            </HorizontalStack>
          ),
        }))}
        tableHeader={tableHeaders}
      />
    </VerticalStack>
  )
}
