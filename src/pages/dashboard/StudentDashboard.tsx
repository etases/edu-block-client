import { HorizontalStack, IconButton, Table, VerticalStack } from '@components'
import { useStudentDashboardPage } from '@hooks/use-page'
import { Avatar, Divider, Title } from '@mantine/core'
import { IconDetails, IconFileSearch } from '@tabler/icons'

export function StudentDashboard() {
  const {
    table: { tableData, tableHeaders },
    others: { navigate, account },
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
          teacherAvatar: (
            <Avatar src={item.teacherAvatar}>{item.teacherName}</Avatar>
          ),
          actions: (
            <HorizontalStack>
              <IconButton
                label={'Details'}
                onClick={() => navigate(`/app/classroom/${item.classroomId}`)}
              >
                <IconFileSearch />
              </IconButton>
              <IconButton
                label={'View my record'}
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
