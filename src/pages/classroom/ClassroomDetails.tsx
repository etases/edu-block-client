// @ts-nocheck
import {
  AutocompleteInput,
  Avatar,
  Button,
  HorizontalStack,
  Modal,
  SelectInput,
  TextInput,
  VerticalStack,
} from '@components'
import { useClassroomDetailsPage } from '@hooks/use-page'
import { semesterNameList } from '@hooks/use-query'
import { Divider, Tabs, Text } from '@mantine/core'
import { IconCheck, IconRefresh } from '@tabler/icons'
import { forwardRef } from 'react'
import Plot from 'react-plotly.js'

const semesterTr = {
  firstHalf: 'First half',
  secondHalf: 'Second half',
  final: 'Final',
}

export function ClassroomDetails() {
  const {
    classroomDetails,
    teacherList,
    form: { updateForm },
    state: {
      modal: {
        update: { closeUpdateModal, openUpdateModal, updateModalState },
      },
      field: { selectedField, setSelectedField },
      search: { searchText, setSearchText },
    },
    others: {
      searchSelectOption,
      account,
      generateSubjectReport,
      generateSemesterReport,
    },
  } = useClassroomDetailsPage()

  const semesterComplexData = Object.entries(
    generateSemesterReport(classroomDetails?.classroomName, 'table') || {}
  )

  return (
    <VerticalStack>
      <HorizontalStack grow={true}>
        <TextInput
          readOnly={true}
          label={'Classroom name'}
          defaultValue={classroomDetails?.classroomName}
        />
        <TextInput
          readOnly={true}
          label={'Grade'}
          defaultValue={classroomDetails?.classroomGrade}
        />
      </HorizontalStack>
      {/* Teacher section */}
      <HorizontalStack
        align={'start'}
        grow={true}
      >
        <HorizontalStack
          // position={'apart'}
          grow={true}
        >
          <TextInput
            readOnly={true}
            defaultValue={classroomDetails?.teacherName}
            label={'Teacher name'}
          />
          <TextInput
            readOnly={true}
            defaultValue={classroomDetails?.teacherPhone}
            label={'Teacher phone'}
          />
          <TextInput
            readOnly={true}
            defaultValue={classroomDetails?.teacherEmail}
            label={'Teacher email'}
          />
        </HorizontalStack>
      </HorizontalStack>
      <Divider />
      <HorizontalStack position={'right'}>
        {account.role !== 'STUDENT' && (
          <>
            <Button
              onClick={() =>
                generateSemesterReport(classroomDetails?.classroomName, 'file')
              }
            >
              Get semester report
            </Button>
            <Button
              onClick={() =>
                generateSubjectReport(classroomDetails?.classroomName, 'file')
              }
            >
              Get subject report
            </Button>
          </>
        )}
        {account.role === 'STAFF' && (
          <Button
            onClick={() => {
              updateForm.loadFormValues({
                name: classroomDetails?.classroomName || '',
                grade: (classroomDetails?.classroomGrade || '0').toString(),
                homeroomTeacherId: (
                  classroomDetails?.teacherId || '0'
                ).toString(),
                year: new Date().getFullYear().toString(),
              })
              openUpdateModal()
            }}
            leftIcon={<IconRefresh />}
          >
            Update details
          </Button>
        )}
      </HorizontalStack>
      <Divider />
      <VerticalStack>
        {account.role !== 'STUDENT' && (
          <Tabs
            defaultValue={semesterNameList.at(0)}
            variant={'outline'}
            radius={'md'}
          >
            <Tabs.List position={'right'}>
              {semesterNameList.map((semesterName) => (
                <Tabs.Tab
                  value={semesterName}
                  key={'tabItem__' + semesterName}
                >
                  {semesterTr[semesterName]}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {semesterComplexData.map(
              ([semesterName, semesterData]: [string, any]) => {
                const subjectColumns = Object.keys(
                  semesterData.at(0) || {}
                ).slice(1)
                const studentCount = semesterData.length

                return (
                  <Tabs.Panel
                    value={semesterName}
                    key={'tabPanel__' + semesterName}
                  >
                    <HorizontalStack position={'center'}>
                      <Plot
                        data={[
                          {
                            x: subjectColumns,
                            y: semesterData.map(
                              ({ studentName }: any) => studentName
                            ),
                            z: semesterData.map(
                              ({ studentName, ...subjects }: any) =>
                                Object.keys(subjects).reduce(
                                  (result, subjectName) => [
                                    ...result,
                                    subjects[subjectName],
                                  ],
                                  []
                                )
                            ),
                            type: 'heatmap',
                            colorscale: [
                              [0, '#FF6347'],
                              [1, '#00FF7F'],
                            ],
                          },
                        ]}
                        layout={{
                          title: semesterTr[semesterName],
                          height: 35 * studentCount,
                        }}
                      />
                    </HorizontalStack>
                  </Tabs.Panel>
                )
              }
            )}
          </Tabs>
        )}
      </VerticalStack>
      <Modal
        opened={updateModalState}
        onClose={closeUpdateModal}
        title={
          <Text
            size={'lg'}
            weight={'bold'}
          >
            Update classroom details
          </Text>
        }
      >
        <VerticalStack>
          <form onSubmit={updateForm.submitForm}>
            <VerticalStack>
              <HorizontalStack grow={true}>
                <TextInput
                  placeholder={'Classroom name'}
                  {...updateForm.inputPropsOf('name')}
                  required={true}
                />
                <AutocompleteInput
                  placeholder={'Grade'}
                  data={Array.from(Array(12)).map((item, index) =>
                    (index + 1).toString()
                  )}
                  required={true}
                  {...updateForm.inputPropsOf('grade')}
                />
              </HorizontalStack>
              <HorizontalStack grow={true}>
                <SelectInput
                  placeholder={'Search teacher by'}
                  data={searchSelectOption}
                  value={selectedField}
                  onChange={(value) => setSelectedField(value || '')}
                />
                <SelectInput
                  searchValue={searchText}
                  onSearchChange={setSearchText}
                  data={teacherList.map(({ name, id, avatar }) => ({
                    name: name,
                    id: id,
                    avatar: avatar,
                    value: id.toString(),
                    label: name,
                  }))}
                  placeholder={'Teacher'}
                  itemComponent={forwardRef(
                    ({ id, name, avatar, ...others }, ref) => (
                      <div
                        ref={ref}
                        {...others}
                      >
                        <VerticalStack>
                          <HorizontalStack>
                            <Avatar src={avatar} />
                            <Text>{name}</Text>
                          </HorizontalStack>
                        </VerticalStack>
                      </div>
                    )
                  )}
                  filter={(value, item) => true}
                  {...updateForm.inputPropsOf('homeroomTeacherId')}
                />
                {/* <IconButton
              size={'xl'}
              label={'Choose this teacher'}
              variant={'subtle'}
              color={'green'}
            >
              <IconCheck />
            </IconButton> */}
              </HorizontalStack>
              <HorizontalStack position={'right'}>
                <Button
                  type={'submit'}
                  color={'green'}
                  leftIcon={<IconCheck />}
                >
                  Update
                </Button>
              </HorizontalStack>
            </VerticalStack>
          </form>
        </VerticalStack>
      </Modal>
    </VerticalStack>
  )
}
