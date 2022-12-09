import {
  Avatar,
  Button,
  HorizontalStack,
  IconButton,
  Modal,
  SelectInput,
  Table,
  TextInput,
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
import { forwardRef, useState } from 'react'

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
      account,
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
  const [selectedStudent, setSelectedStudent] = useState<string | null>()
  return (
    <VerticalStack>
      {account.role === 'STAFF' && (
        <HorizontalStack position={'right'}>
          <Button
            leftIcon={<IconUserPlus />}
            onClick={openAddStudentModal}
          >
            Add students
          </Button>
          <Divider />
        </HorizontalStack>
      )}
      <Table
        tableHeader={tableHeaders}
        tableData={tableData.map((item) => ({
          ...item,
          avatar: <Avatar src={item.avatar}>{item.name}</Avatar>,
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
              {account.role === 'STAFF' && (
                <IconButton
                  label={'Remove from classroom'}
                  color={'red'}
                  onClick={() => deleteStudent({ accounts: [item.studentId] })}
                >
                  <IconTrash />
                </IconButton>
              )}
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
              <HorizontalStack position={'apart'}>
                <HorizontalStack>
                  <SelectInput
                    data={searchSelectOption}
                    value={selectedField}
                    onChange={(value) => setSelectedField(value || '')}
                    // {...addForm.inputPropsOf(`accounts.${index}`)}
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
                          // onSelect={() => setSelectedStudent(others.id)}
                          // onClick={() => setSelectedStudent(others.id)}
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
                    onChange={(value) => setSelectedStudent(value)}
                  />
                </HorizontalStack>
                <IconButton
                  label={'Add student'}
                  color={'green'}
                  onClick={() =>
                    addForm.addStudentToList(
                      studentList.find(
                        (student) =>
                          student.id === parseInt(selectedStudent || '')
                      )
                    )
                  }
                >
                  <IconUserPlus />
                </IconButton>
              </HorizontalStack>
              <Divider />
              {addForm.form.values.accounts.map((account, index) => (
                <VerticalStack
                  key={`formItem_student__${account.id}__${index}`}
                >
                  <HorizontalStack>
                    <TextInput
                      sx={{ display: 'none' }}
                      defaultValue={account.id}
                    />
                    <Avatar src={account.avatar}>{account.name}</Avatar>
                    <TextInput
                      sx={{ flexGrow: 1 }}
                      defaultValue={account.name}
                      readOnly={true}
                    />
                    <IconButton
                      disabled={false}
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
              <Divider />
              <HorizontalStack position={'apart'}>
                <Button
                  color={'red'}
                  type={'reset'}
                  leftIcon={<IconClearAll />}
                >
                  Clear
                </Button>
                <HorizontalStack>
                  {/* <Button
                    disabled={true}
                    onClick={() => addForm.addStudentToList()}
                    leftIcon={<IconUserPlus />}
                  >
                    Add student
                  </Button> */}
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
