import {
  Button,
  Grid,
  GridCol,
  HorizontalStack,
  IconButton,
  Modal,
  NumberInput,
  SelectInput,
  TextInput,
  VerticalStack,
} from '@components'
import { useStudentProfilePage } from '@hooks/use-page'
import { Divider, FileInput, Tabs, Text, Title } from '@mantine/core'
import {
  IconCheck,
  IconClearAll,
  IconEdit,
  IconScan,
  IconTrash,
  IconUpload,
} from '@tabler/icons'
import { Outlet } from 'react-router-dom'

const { List: TabList, Tab: TabItem } = Tabs

export function StudentProfile() {
  const {
    accountProfile,
    others: { classroomList, navigate, account, subjects },
    form: { updateForm, tableForm },
    state: {
      updateModal: { closeUpdateModal, openUpdateModal, updateModalState },
      updateTableModal: {
        closeUpdateTableModal,
        openUpdateTableModal,
        updateTableModalState,
      },
    },
  } = useStudentProfilePage()

  return (
    <VerticalStack>
      <HorizontalStack position={'apart'}>
        <HorizontalStack>
          {account.role === 'STAFF' && (
            <Button
              leftIcon={<IconEdit />}
              onClick={() => {
                openUpdateModal()
                updateForm.loadFormValues({
                  ethnic: accountProfile?.ethnic || '',
                  fatherJob: accountProfile?.fatherJob || '',
                  fatherName: accountProfile?.father || '',
                  guardianJob: accountProfile?.guardianJob || '',
                  guardianName: accountProfile?.guardian || '',
                  homeTown: accountProfile?.homeTown || '',
                  motherJob: accountProfile?.motherJob || '',
                  motherName: accountProfile?.mother || '',
                })
              }}
            >
              Update
            </Button>
          )}
        </HorizontalStack>
        <Title>Student Information</Title>
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
      <Divider />
      <VerticalStack>
        <HorizontalStack position={'apart'}>
          <HorizontalStack>
            <Title>Record</Title>
            {((account.role === 'STUDENT' &&
              accountProfile?.id === account.id) ||
              account.role === 'TEACHER') && (
              <IconButton
                label={'Upload legacy record'}
                onClick={openUpdateTableModal}
              >
                <IconUpload />
              </IconButton>
            )}
          </HorizontalStack>
          <Tabs
            variant={'pills'}
            radius={'md'}
            defaultValue={classroomList[0]?.classroomId.toString() || ''}
            onTabChange={(value) => navigate(value || '')}
          >
            <TabList grow={true}>
              {classroomList.map((item, index) => (
                <TabItem
                  key={`tabItem__${item.classroomId}__${index}`}
                  value={item?.classroomId.toString()}
                >
                  <Title order={3}>{item?.classroomName}</Title>
                </TabItem>
              ))}
            </TabList>
          </Tabs>
        </HorizontalStack>
        <Divider />
        <Outlet />
      </VerticalStack>
      <Modal
        opened={updateModalState}
        onClose={closeUpdateModal}
        title={
          <Text
            size={'lg'}
            weight={'bold'}
          >
            Update student profile
          </Text>
        }
      >
        <VerticalStack>
          <form onSubmit={updateForm.submitForm}>
            <VerticalStack>
              <HorizontalStack>
                <TextInput
                  label={'Ethnic'}
                  {...updateForm.inputPropsOf('ethnic')}
                />
                <TextInput
                  label={'Hometown'}
                  {...updateForm.inputPropsOf('homeTown')}
                />
              </HorizontalStack>
              <Divider />
              <HorizontalStack>
                <TextInput
                  label={'Father'}
                  {...updateForm.inputPropsOf('fatherName')}
                />
                <TextInput
                  label={'Job'}
                  {...updateForm.inputPropsOf('fatherJob')}
                />
              </HorizontalStack>
              <Divider />
              <HorizontalStack>
                <TextInput
                  label={'Mother'}
                  {...updateForm.inputPropsOf('motherName')}
                />
                <TextInput
                  label={'Job'}
                  {...updateForm.inputPropsOf('motherJob')}
                />
              </HorizontalStack>
              <Divider />
              <HorizontalStack>
                <TextInput
                  label={'Guardian'}
                  {...updateForm.inputPropsOf('guardianName')}
                />
                <TextInput
                  label={'Job'}
                  {...updateForm.inputPropsOf('guardianJob')}
                />
              </HorizontalStack>
              <HorizontalStack position={'apart'}>
                <Button
                  leftIcon={<IconClearAll />}
                  color={'red'}
                >
                  Reset
                </Button>
                <Button
                  leftIcon={<IconCheck />}
                  color={'green'}
                  type={'submit'}
                >
                  Confirm
                </Button>
              </HorizontalStack>
            </VerticalStack>
          </form>
        </VerticalStack>
      </Modal>
      <Modal
        opened={updateTableModalState}
        onClose={closeUpdateTableModal}
        title={
          <Text
            size={'lg'}
            weight={'bold'}
          >
            Upload Image of Record table
          </Text>
        }
      >
        <VerticalStack>
          <form onSubmit={tableForm.submitImageForm}>
            <HorizontalStack grow={true}>
              <FileInput
                accept={'image/png,image/jpeg'}
                radius={'md'}
                size={'md'}
                placeholder={'Choose image'}
                onChange={tableForm.onImageChange}
              />
              <Button
                type={'submit'}
                loading={tableForm.state.imageScanning}
              >
                {!tableForm.state.imageScanning && <IconScan />}
              </Button>
            </HorizontalStack>
          </form>
          <Divider />
          <form onSubmit={tableForm.submitTableForm}>
            <VerticalStack>
              {tableForm.tableForm.values.requests.map((item, index) => (
                <HorizontalStack key={index}>
                  <SelectInput
                    data={subjects}
                    {...tableForm.inputPropsOf(`requests.${index}.subjectId`)}
                  />
                  <NumberInput
                    max={10}
                    min={0}
                    step={0.25}
                    precision={2}
                    {...tableForm.inputPropsOf(
                      `requests.${index}.firstHalfScore`
                    )}
                  />
                  <NumberInput
                    max={10}
                    min={0}
                    step={0.25}
                    precision={2}
                    {...tableForm.inputPropsOf(
                      `requests.${index}.secondHalfScore`
                    )}
                  />
                  <NumberInput
                    max={10}
                    min={0}
                    step={0.25}
                    precision={2}
                    {...tableForm.inputPropsOf(`requests.${index}.finalScore`)}
                  />
                  <IconButton
                    label={'Remove'}
                    color={'red'}
                    onClick={() =>
                      tableForm.tableForm.removeListItem('requests', index)
                    }
                  >
                    <IconTrash />
                  </IconButton>
                </HorizontalStack>
              ))}
              <HorizontalStack>
                <Button type={'submit'}>Submit</Button>
              </HorizontalStack>
            </VerticalStack>
          </form>
        </VerticalStack>
      </Modal>
    </VerticalStack>
  )
}
