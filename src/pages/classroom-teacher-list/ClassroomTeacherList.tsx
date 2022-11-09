import {
  Avatar,
  Button,
  HorizontalStack,
  IconButton,
  Modal,
  SelectInput,
  Table,
  VerticalStack,
} from '@components'
import { useClassroomTeachersPage } from '@hooks/use-page'
import { Divider, Text } from '@mantine/core'
import { IconCheck, IconClearAll, IconTrash, IconUserPlus } from '@tabler/icons'
import { forwardRef } from 'react'

export function ClassroomTeacherList() {
  const {
    form: { addForm },
    table: { tableData, tableHeaders },
    state: {
      modal: {
        addTeacher: {
          addTeacherModalState,
          closeAddTeacherModal,
          openAddTeacherModal,
        },
      },
      teacherListState: {
        field: { selectedField, setSelectedField },
        search: { searchText, setSearchText },
      },
    },
    others: { subjectList, teacherList, searchSelectOption, removeTeacher },
  } = useClassroomTeachersPage()
  return (
    <VerticalStack>
      <HorizontalStack position={'right'}>
        <Button
          onClick={openAddTeacherModal}
          leftIcon={<IconUserPlus />}
        >
          Add teachers
        </Button>
      </HorizontalStack>
      <Divider />
      <Table
        tableHeader={tableHeaders}
        tableData={tableData.map((item) => ({
          ...item,
          actions: (
            <HorizontalStack>
              <IconButton
                label={'Remove from classroom'}
                color={'red'}
                onClick={() =>
                  removeTeacher({
                    teachers: [
                      {
                        subjectId: item.subjectId,
                        teacherId: item.teacherId,
                      },
                    ],
                  })
                }
              >
                <IconTrash />
              </IconButton>
            </HorizontalStack>
          ),
        }))}
      />
      <Modal
        opened={addTeacherModalState}
        onClose={closeAddTeacherModal}
        title={
          <Text
            size={'lg'}
            weight={'bold'}
          >
            Add teachers to class
          </Text>
        }
      >
        <VerticalStack>
          <form
            onSubmit={addForm.submitForm}
            onReset={addForm.form.onReset}
          >
            <VerticalStack>
              {addForm.form.values.teachers.map((item, index) => (
                <VerticalStack key={`formItem_teacher__${index}`}>
                  <HorizontalStack>
                    <SelectInput
                      data={subjectList.map((item) => ({
                        // ...item,
                        value: item.id.toString(),
                        label: item.identifier,
                      }))}
                      placeholder={'Select subject'}
                      {...addForm.inputPropsOf(`teachers.${index}.subjectId`)}
                    />
                    <SelectInput
                      data={searchSelectOption}
                      placeholder={'Search teacher in'}
                      value={selectedField}
                      onChange={(value) => setSelectedField(value || '')}
                    />
                    <SelectInput
                      data={teacherList.map(({ id, name, avatar, email }) => ({
                        value: id.toString(),
                        label: name,
                        name,
                        avatar,
                        email,
                      }))}
                      filter={(value, item) => true}
                      itemComponent={forwardRef(
                        ({ name, avatar, email, ...others }, ref) => (
                          <div
                            ref={ref}
                            {...others}
                          >
                            <VerticalStack>
                              <HorizontalStack>
                                <Avatar src={avatar} />
                                <VerticalStack spacing={0}>
                                  <Text>{name}</Text>
                                  <Text size={'sm'}>{email}</Text>
                                </VerticalStack>
                              </HorizontalStack>
                            </VerticalStack>
                          </div>
                        )
                      )}
                      placeholder={'Teacher'}
                      searchValue={searchText}
                      onSearchChange={setSearchText}
                      {...addForm.inputPropsOf(`teachers.${index}.teacherId`)}
                    />
                    <IconButton
                      disabled={true}
                      label={'Remove'}
                      color={'red'}
                      size={'xl'}
                      onClick={() => addForm.removeTeacherFromList(index)}
                    >
                      <IconTrash />
                    </IconButton>
                  </HorizontalStack>
                  {index < addForm.form.values.teachers.length - 1 && (
                    <Divider />
                  )}
                </VerticalStack>
              ))}
              <HorizontalStack position={'apart'}>
                <Button
                  type={'reset'}
                  color={'red'}
                  leftIcon={<IconClearAll />}
                >
                  Clear
                </Button>
                <HorizontalStack position={'apart'}>
                  <Button
                    disabled={true}
                    onClick={() => addForm.addTeacherToList()}
                    leftIcon={<IconUserPlus />}
                  >
                    Add teacher
                  </Button>
                  <Button
                    type={'submit'}
                    color={'green'}
                    leftIcon={<IconCheck />}
                  >
                    Confirm
                  </Button>
                </HorizontalStack>
              </HorizontalStack>
            </VerticalStack>
          </form>
        </VerticalStack>
      </Modal>
    </VerticalStack>
  )
}
