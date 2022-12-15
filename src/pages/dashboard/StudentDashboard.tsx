import { HorizontalStack, IconButton, Table, VerticalStack } from '@components'
import { useStudentDashboardPage } from '@hooks/use-page'
import { Avatar, Divider, Title } from '@mantine/core'
import { IconDetails, IconFileSearch } from '@tabler/icons'
import { useTranslation } from '@hooks/use-translation'

export function StudentDashboard() {
  const {
    table: { tableData, tableHeaders },
    others: { navigate, account },
  } = useStudentDashboardPage()

  const translation = {
    'STUDENT_DASHBOARD.TITLE.STUDENT_DASHBOARD': null,
    'STUDENT_DASHBOARD.TABLE.CLASSROOM_ID': null,
    'STUDENT_DASHBOARD.TABLE.CLASSROOM_NAME': null,
    'STUDENT_DASHBOARD.TABLE.GRADE': null,
    'STUDENT_DASHBOARD.TABLE.TEACHER': null,
    'STUDENT_DASHBOARD.TABLE.TEACHER AVATAR': null,
    'STUDENT_DASHBOARD.TABLE.TEACHER EMAIL': null,
    'STUDENT_DASHBOARD.TABLE.ACTIONS': null,
    'STUDENT_DASHBOARD.TABLE.DETAILS': null,
    'STUDENT_DASHBOARD.TABLE.VIEW_MY_RECORD': null,
  }
  // Verified Statistic Access Token
  const { translate } = useTranslation(translation)

  return (
    <VerticalStack>
      <HorizontalStack>
        <Title>{translate("STUDENT_DASHBOARD.TITLE.STUDENT_DASHBOARD")}</Title>
      </HorizontalStack>
      <Divider />
      <Table
        tableData={tableData.map((item) => ({
          ...item,
          teacherAvatar: (
            <Avatar src={item.teacherAvatar}>{item.teacherName}</Avatar>
          ),
          actions: (
            <HorizontalStack>
              <IconButton
                label={translate("STUDENT_DASHBOARD.TABLE.DETAILS")}
                onClick={() => navigate(`/app/classroom/${item.classroomId}`)}
              >
                <IconFileSearch />
              </IconButton>
              <IconButton
                label={translate("STUDENT_DASHBOARD.TABLE.VIEW_MY_RECORD")}
                onClick={() =>
                  navigate(
                    `/app/account/${account.id}/record/${item.classroomId}`
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
