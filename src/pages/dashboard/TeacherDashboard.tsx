import { HorizontalStack, IconButton, Table, VerticalStack } from '@components'
import { useTeacherDashboardPage } from '@hooks/use-page'
import { useTranslation } from '@hooks/use-translation'
import { Divider, Title } from '@mantine/core'
import { IconFileSearch } from '@tabler/icons'

const translate = {
  "TEACHER.DASHBOARD.TITLE": null,
  "TEACHER.DASHBOARD.ACTIONS.DETAILS": null
}

export function TeacherDashboard() {
  const {translatedObject} = useTranslation(translate);
  const {
    table: { tableData, tableHeaders },
    others: { navigate },
  } = useTeacherDashboardPage()

  return (
    <VerticalStack>
      <HorizontalStack>
        <Title>{translatedObject?.["TEACHER.DASHBOARD.TITLE"]}</Title>
      </HorizontalStack>
      <Divider />
      <Table
        tableData={tableData.map((item) => ({
          ...item,
          actions: (
            <HorizontalStack>
              <IconButton
                label={translatedObject?.["TEACHER.DASHBOARD.ACTIONS.DETAILS"]}
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
