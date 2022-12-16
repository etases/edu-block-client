import { HorizontalStack, IconButton, Table, VerticalStack } from '@components'
import { useTeacherDashboardPage } from '@hooks/use-page'
import { useTranslation } from '@hooks/use-translation'
import { Divider, Title } from '@mantine/core'
import { IconFileSearch } from '@tabler/icons'



export function TeacherDashboard() {
  const {translate} = useTranslation();
  const {
    table: { tableData, tableHeaders },
    others: { navigate },
  } = useTeacherDashboardPage()

  return (
    <VerticalStack>
      <HorizontalStack>
        <Title>{translate("TEACHER.DASHBOARD.TITLE")}</Title>
      </HorizontalStack>
      <Divider />
      <Table
        tableData={tableData.map((item) => ({
          ...item,
          actions: (
            <HorizontalStack>
              <IconButton
                label={translate("TEACHER.DASHBOARD.ACTIONS.DETAILS")}
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
