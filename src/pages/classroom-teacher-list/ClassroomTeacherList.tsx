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
import { useClassroomTeachersPage } from '@hooks/use-page'
import { useTranslation } from '@hooks/use-translation'
import { Divider, Text } from '@mantine/core'
import { IconCheck, IconClearAll, IconTrash, IconUserPlus } from '@tabler/icons'
import { forwardRef, useState } from 'react'

export function ClassroomTeacherList() {
  const {translate} = useTranslation()
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
    others: {
      subjectList,
      teacherList,
      searchSelectOption,
      removeTeacher,
      account,
    },
  } = useClassroomTeachersPage()

  const [selectedTeacher, setSelectedTeacher] = useState<string | null>()
  const [selectedSubject, setSelectedSubject] = useState<string | null>()

  return (
    <VerticalStack>
      {account.role === 'STAFF' && (
        <HorizontalStack position={'right'}>
          <Button
            onClick={openAddTeacherModal}
            leftIcon={<IconUserPlus />}
          >
            {translate("CLASS.TEACHER.ADD")}
          </Button>
          <Divider />
        </HorizontalStack>
      )}
      <Table
        tableHeader={tableHeaders}
        tableData={tableData.map((item) => ({
          ...item,
          teacherAvatar: (
            <Avatar src={item.teacherAvatar}>{item.teacherAvatar}</Avatar>
          ),
          actions: (
            <HorizontalStack>
              {account.role === 'STAFF' && (
                <IconButton
                  label={translate("CLASS.TEACHER.REMOVE")}
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
              )}
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
            {translate("CLASS.TEACHER.ADD")}
          </Text>
        }
      >
        <VerticalStack>
          <form
            onSubmit={addForm.submitForm}
            onReset={addForm.form.onReset}
          >
            <VerticalStack>
              <HorizontalStack>
                <SelectInput
                  data={subjectList.map((item) => ({
                    // ...item,
                    value: item.id.toString(),
                    label: translate(item.identifier).toString(),
                  }))}
                  placeholder={translate("CLASS.TEACHER.ADD.SELECT_SUBJECT").toString()}
                  value={selectedSubject}
                  onChange={(value) => setSelectedSubject(value)}
                />
                <SelectInput
                  data={searchSelectOption}
                  placeholder={translate("CLASS.TEACHER.ADD.SEARCH").toString()}
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
                  placeholder={translate("CLASS.TEACHER.ADD.SELECT").toString()}
                  searchValue={searchText}
                  onSearchChange={setSearchText}
                  onChange={(value) => setSelectedTeacher(value)}
                />
                <IconButton
                  label={translate("CLASS.TEACHER.ADD")}
                  color={'green'}
                  onClick={() => {
                    const teacher = teacherList.find(
                      (teacher) =>
                        teacher.id === parseInt(selectedTeacher || '')
                    )
                    const subject = subjectList.find(
                      (subject) =>
                        subject.id === parseInt(selectedSubject || '')
                    )
                    // console.log(teacher, subject)
                    addForm.addTeacherToList({
                      ...teacher,
                      subject: subject?.identifier,
                      subjectId: parseInt(selectedSubject || ''),
                      teacherId: teacher.id,
                    })
                  }}
                >
                  <IconUserPlus />
                </IconButton>
              </HorizontalStack>
              {addForm.form.values.teachers.map((item, index) => (
                <VerticalStack
                  key={`formItem_teacher__${item.subjectId}__${item.teacherId}__${index}`}
                >
                  <HorizontalStack>
                    <Avatar src={item.avatar}>{item.name}</Avatar>
                    <TextInput
                      defaultValue={item.subject}
                      readOnly={true}
                    />
                    <TextInput
                      defaultValue={item.name}
                      sx={{ flexGrow: 1 }}
                      readOnly={true}
                    />
                    <IconButton
                      label={translate("CLASS.TEACHER.ADD.DELETE")}
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
                  {translate("CLASSROOM_LIST.CREATE.CLEAR")}
                </Button>
                <HorizontalStack position={'apart'}>
                  <Button
                    type={'submit'}
                    color={'green'}
                    leftIcon={<IconCheck />}
                  >
                    {translate("CLASS.TEACHER.ADD.CONFIRM")}
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
