import { HorizontalStack, IconButton, Table, VerticalStack } from '@components'
import { useRecordListPage } from '@hooks/use-page'
import { useTranslation } from '@hooks/use-translation'
import { Title } from '@mantine/core'
import { IconCheck, IconDetails, IconX } from '@tabler/icons'

const translate = {
  "TEACHER.RECORD.TITLE": null,
  "TEACHER.RECORD.ACCEPT": null,
  "TEACHER.RECORD.REJECT": null,
  "TEACHER.RECORD.DETAIL": null
}

export function RecordList() {
  const {translatedObject} = useTranslation(translate);
  const {
    table: { tableData, tableHeaders },
    actions: { acceptRequest, rejectRequest },
    others: { navigate },
  } = useRecordListPage()

  return (
    <VerticalStack>
      <HorizontalStack>
        <Title>{translatedObject?.["TEACHER.RECORD.TITLE"]}</Title>
      </HorizontalStack>
      <Table
        tableData={tableData.map((item) => ({
          ...item,
          actions: (
            <HorizontalStack>
              <IconButton
                label={translatedObject?.["TEACHER.RECORD.ACCEPT"]}
                color={'green'}
                onClick={() => acceptRequest(item.requestId)}
              >
                <IconCheck />
              </IconButton>
              <IconButton
                label={translatedObject?.["TEACHER.RECORD.REJECT"]}
                color={'red'}
                onClick={() => rejectRequest(item.requestId)}
              >
                <IconX />
              </IconButton>
              <IconButton
                label={translatedObject?.["TEACHER.RECORD.DETAIL"]}
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
