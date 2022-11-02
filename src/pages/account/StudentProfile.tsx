import {
  Button,
  Grid,
  GridCol,
  HorizontalStack,
  TextInput,
  VerticalStack,
} from '@components'
import { useStudentProfilePage } from '@hooks/use-page'
import { Divider, Title } from '@mantine/core'
import { IconEdit, IconUserCheck } from '@tabler/icons'

export function StudentProfile() {
  const { accountProfile } = useStudentProfilePage()

  return (
    <VerticalStack>
      <HorizontalStack position={'apart'}>
        <HorizontalStack>
          <Button leftIcon={<IconEdit />}>Update</Button>
        </HorizontalStack>
        <Title>Student Information {accountProfile?.id}</Title>
      </HorizontalStack>
      <Divider />
      <HorizontalStack position={'center'}>
        <VerticalStack
          sx={{
            width: 1280,
            maxWidth: 1280,
          }}
        >
          <Grid grow={true}>
            <GridCol span={6}>
              <TextInput
                readOnly={true}
                label={'Ethnic'}
                defaultValue={accountProfile?.ethnic}
              />
            </GridCol>
            <GridCol span={6}>
              <TextInput
                readOnly={true}
                label={'Hometown'}
                defaultValue={accountProfile?.homeTown}
              />
            </GridCol>
          </Grid>
          <Grid grow={true}>
            <GridCol span={6}>
              <TextInput
                readOnly={true}
                label={'Father'}
                defaultValue={accountProfile?.father}
              />
            </GridCol>
            <GridCol span={6}>
              <TextInput
                readOnly={true}
                label={'Father job'}
                defaultValue={accountProfile?.fatherJob}
              />
            </GridCol>
          </Grid>
          <Grid grow={true}>
            <GridCol span={6}>
              <TextInput
                readOnly={true}
                label={'Mother'}
                defaultValue={accountProfile?.mother}
              />
            </GridCol>
            <GridCol span={6}>
              <TextInput
                readOnly={true}
                label={'Mother job'}
                defaultValue={accountProfile?.motherJob}
              />
            </GridCol>
          </Grid>
          <Grid grow={true}>
            <GridCol span={6}>
              <TextInput
                readOnly={true}
                label={'Guardian'}
                defaultValue={accountProfile?.guardian}
              />
            </GridCol>
            <GridCol span={6}>
              <TextInput
                readOnly={true}
                label={'Guardian job'}
                defaultValue={accountProfile?.guardianJob}
              />
            </GridCol>
          </Grid>
        </VerticalStack>
      </HorizontalStack>
    </VerticalStack>
  )
}
