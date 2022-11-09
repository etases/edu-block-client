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
import { useClassroomStudentsPage } from '@hooks/use-page'
import { Divider, Text } from '@mantine/core'
import {
  IconCheck,
  IconClearAll,
  IconTrash,
  IconUser,
  IconUserPlus,
} from '@tabler/icons'
import { forwardRef } from 'react'

export function ClassroomStudentList() {
  const {
    table: { tableHeaders, tableData },
    form: { addForm },
    others: {
      searchSelectOption,
      deleteStudent,
      studentList,
      navigate,
      classroomId,
    },
    state: {
      modal: {
        addStudent: {
          addStudentModalState,
          closeAddStudentModal,
          openAddStudentModal,
        },
      },
      studentListState: {
        field: { selectedField, setSelectedField },
        search: { searchText, setSearchText },
      },
    },
  } = useClassroomStudentsPage()
  return (
    <VerticalStack>
      <HorizontalStack position={'right'}>
        <Button
          leftIcon={<IconUserPlus />}
          onClick={openAddStudentModal}
        >
          Add students
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
                label={'Details'}
                onClick={() =>
                  navigate(
                    `/app/account/${item.studentId}/record/${classroomId}`
                  )
                }
              >
                <IconUser />
              </IconButton>
              <IconButton
                label={'Remove from classroom'}
                color={'red'}
                onClick={() => deleteStudent({ accounts: [item.studentId] })}
              >
                <IconTrash />
              </IconButton>
            </HorizontalStack>
          ),
        }))}
      />
      <Modal
        title={
          <Text
            size={'lg'}
            weight={'bold'}
          >
            Add students to class
          </Text>
        }
        opened={addStudentModalState}
        onClose={closeAddStudentModal}
      >
        <VerticalStack>
          <form
            onSubmit={addForm.submitForm}
            onReset={addForm.form.onReset}
          >
            <VerticalStack>
              {addForm.form.values.accounts.map((_, index) => (
                <VerticalStack key={`formItem_student_${index}`}>
                  <HorizontalStack>
                    <SelectInput
                      data={searchSelectOption}
                      value={selectedField}
                      onChange={(value) => setSelectedField(value || '')}
                    />
                    <SelectInput
                      data={studentList.map((item) => ({
                        value: item.id.toString(),
                        label: item.name,
                        avatar: item.avatar,
                        name: item.name,
                      }))}
                      filter={(value, item) => true}
                      itemComponent={forwardRef(
                        ({ avatar, name, ...others }, ref) => (
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
                      searchValue={searchText}
                      onSearchChange={setSearchText}
                      {...addForm.inputPropsOf(`accounts.${index}`)}
                    />
                    <IconButton
                      disabled={true}
                      label={'Remove'}
                      color={'red'}
                      size={'xl'}
                      onClick={() => addForm.removeStudentFromList(index)}
                    >
                      <IconTrash />
                    </IconButton>
                  </HorizontalStack>
                  {index < addForm.form.values.accounts.length - 1 && (
                    <Divider />
                  )}
                </VerticalStack>
              ))}
              <HorizontalStack position={'apart'}>
                <Button
                  color={'red'}
                  type={'reset'}
                  leftIcon={<IconClearAll />}
                >
                  Clear
                </Button>
                <HorizontalStack>
                  <Button
                    disabled={true}
                    onClick={() => addForm.addStudentToList()}
                    leftIcon={<IconUserPlus />}
                  >
                    Add student
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
