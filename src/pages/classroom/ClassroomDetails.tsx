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
import { useTranslation } from '@hooks/use-translation'
import { Divider, Tabs, Text } from '@mantine/core'
import { IconCheck, IconRefresh } from '@tabler/icons'
import { forwardRef } from 'react'
import Plot from 'react-plotly.js'

const semesterTr = {
  firstHalf: 'firstHalf',
  secondHalf: 'secondHalf',
  final: 'final',
}

export function ClassroomDetails() {
  const {translate} = useTranslation()
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
          label={translate("CLASS_DETAIL.NAME")}
          defaultValue={classroomDetails?.classroomName}
        />
        <TextInput
          readOnly={true}
          label={translate("CLASS_DETAIL.GRADE")}
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
            label={translate("CLASS_DETAIL.TEACHER")}
          />
          <TextInput
            readOnly={true}
            defaultValue={classroomDetails?.teacherPhone}
            label={translate("CLASS_DETAIL.PHONE")}
          />
          <TextInput
            readOnly={true}
            defaultValue={classroomDetails?.teacherEmail}
            label={translate("CLASS_DETAIL.EMAIL")}
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
              {translate("CLASS_DETAIL.SEMESTER_REPORT")}
            </Button>
            <Button
              onClick={() =>
                generateSubjectReport(classroomDetails?.classroomName, 'file')
              }
            >
              {translate("CLASS_DETAIL.SUBJECT_REPORT")}
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
            {translate("CLASS_DETAIL.UPDATE")}
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
                  {translate(semesterTr[semesterName])}
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
                          title: translate(semesterTr[semesterName]),
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
            {translate("CLASS_DETAIL.UPDATE")}
          </Text>
        }
      >
        <VerticalStack>
          <form onSubmit={updateForm.submitForm}>
            <VerticalStack>
              <HorizontalStack grow={true}>
                <TextInput
                  placeholder={translate("CLASS_DETAIL.NAME")}
                  {...updateForm.inputPropsOf('name')}
                  required={true}
                />
                <AutocompleteInput
                  placeholder={translate("CLASS_DETAIL.GRADE")}
                  data={Array.from(Array(12)).map((item, index) =>
                    (index + 1).toString()
                  )}
                  required={true}
                  {...updateForm.inputPropsOf('grade')}
                />
              </HorizontalStack>
              <HorizontalStack grow={true}>
                <SelectInput
                  placeholder={translate("CLASSROOM_LIST.CREATE.SEARCH_TEACHER")}
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
                  placeholder={translate("CLASSROOM_LIST.CREATE.SELECT_TEACHER")}
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
                  {translate("CLASS_DETAIL.UPDATE.CONFIRM")}
                </Button>
              </HorizontalStack>
            </VerticalStack>
          </form>
        </VerticalStack>
      </Modal>
    </VerticalStack>
  )
}
