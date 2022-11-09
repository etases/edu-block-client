import {
  AutocompleteInput,
  Avatar,
  Button,
  Grid,
  GridCol,
  HorizontalStack,
  IconButton,
  Modal,
  SelectInput,
  Table,
  TextInput,
  VerticalStack,
} from '@components'
import { useClassroomListPage } from '@hooks/use-page'
import {
  Collapse,
  Divider,
  Pagination,
  SelectItemProps,
  Text,
  Title,
} from '@mantine/core'
import {
  IconCategory,
  IconClearAll,
  IconClipboardPlus,
  IconFilePlus,
  IconId,
  IconListSearch,
  IconSearch,
} from '@tabler/icons'
import dayjs from 'dayjs'
import { forwardRef } from 'react'

interface TeacherItemProps extends SelectItemProps {
  avatar: string
  email: string
  firstName: string
  lastName: string
}

export function ClassroomList() {
  const {
    table: { tableHeaders, classroomList },
    others: {
      searchSelectOption,
      searchSelectTeacherOption,
      navigate,
      teacherList,
    },
    form: { createClassroomForm },
    state: {
      modal: {
        searchView: { searchViewState, closeSearchView, openSearchView },
        classroomCreateModal: {
          classroomCreateModalState,
          closeClassroomCreateModal,
          openClassroomCreateModal,
        },
      },
      classListState: {
        search: { setSearchText, setSelectedSearchField, selectedSearchField },
        page: { currentPage, setCurrentPage },
        total: { totalPages },
      },
      teacherListState: {
        search: {
          searchText: teacherSearchText,
          setSearchText: setTeacherSearchText,
        },
        field: { selectedField, setSelectedField },
      },
    },
  } = useClassroomListPage()

  return (
    <VerticalStack>
      <VerticalStack>
        <HorizontalStack position={'apart'}>
          <Title>Classrooms</Title>
        </HorizontalStack>
      </VerticalStack>
      <Divider />
      <VerticalStack>
        <HorizontalStack position={'apart'}>
          <HorizontalStack>
            <Button
              onClick={searchViewState ? closeSearchView : openSearchView}
              leftIcon={<IconSearch />}
            >
              Search
            </Button>
            <Button
              leftIcon={<IconClipboardPlus />}
              onClick={openClassroomCreateModal}
            >
              Create
            </Button>
          </HorizontalStack>
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={setCurrentPage}
            radius={'md'}
            size={'xl'}
          />
        </HorizontalStack>
        <Collapse in={searchViewState}>
          <Divider pb={'md'} />
          <Grid>
            <GridCol span={4}>
              <SelectInput
                data={searchSelectOption}
                placeholder={'Search in'}
                nothingFound={'Nothing found!'}
                icon={<IconCategory />}
                onChange={(value) => setSelectedSearchField(value || '')}
              />
            </GridCol>
            <GridCol span={8}>
              <TextInput
                icon={<IconListSearch />}
                placeholder={'Search text'}
                onChange={({ currentTarget: { value } }) =>
                  setSearchText(value)
                }
              />
            </GridCol>
          </Grid>
        </Collapse>
        <Divider />
        <Table
          tableData={classroomList.map((item) => ({
            ...item,
            classroomId: item.classroomId.toString().padStart(6, '0'),
            teacherAvatar: <Avatar src={item.teacherAvatar} />,
            actions: (
              <HorizontalStack>
                <IconButton
                  label={'Details'}
                  onClick={() => navigate(`/app/classroom/${item.classroomId}`)}
                >
                  <IconId />
                </IconButton>
              </HorizontalStack>
            ),
          }))}
          tableHeader={tableHeaders}
        />
      </VerticalStack>
      <Modal
        opened={classroomCreateModalState}
        onClose={closeClassroomCreateModal}
        title={
          <Text
            weight={'bold'}
            size={'lg'}
          >
            Create new classroom
          </Text>
        }
      >
        <VerticalStack>
          <form onSubmit={createClassroomForm.submitForm}>
            <VerticalStack>
              <HorizontalStack>
                <TextInput
                  required={true}
                  placeholder={'Classroom name'}
                  {...createClassroomForm.inputPropsOf('name')}
                />
                <AutocompleteInput
                  required={true}
                  data={Array.from(new Array(12)).map((item, index) =>
                    (index + 1).toString()
                  )}
                  placeholder={'Grade'}
                  {...createClassroomForm.inputPropsOf('grade')}
                />
                <AutocompleteInput
                  required={true}
                  data={Array.from(Array(5)).map((item, index) =>
                    (index + dayjs().get('year')).toString()
                  )}
                  placeholder={'Year'}
                  {...createClassroomForm.inputPropsOf('year')}
                />
              </HorizontalStack>
              <HorizontalStack grow={true}>
                <SelectInput
                  placeholder={'Search teacher by'}
                  data={searchSelectTeacherOption}
                />
                <SelectInput
                  // required={true}
                  size={'md'}
                  radius={'md'}
                  placeholder={'Teacher'}
                  itemComponent={forwardRef(
                    (
                      { avatar, email, firstName, lastName, ...others },
                      ref
                    ) => (
                      <div
                        ref={ref}
                        {...others}
                      >
                        <VerticalStack>
                          <HorizontalStack>
                            <Avatar src={avatar} />
                            <VerticalStack spacing={0}>
                              <Text>
                                {firstName} {lastName}
                              </Text>
                              <Text size={'sm'}>{email}</Text>
                            </VerticalStack>
                          </HorizontalStack>
                        </VerticalStack>
                      </div>
                    )
                  )}
                  data={teacherList.map((item) => ({
                    ...item,
                    label: item.name,
                    value: item.id,
                  }))}
                  filter={(value, item) => true}
                  searchValue={teacherSearchText}
                  onSearchChange={setTeacherSearchText}
                  {...createClassroomForm.inputPropsOf('homeroomTeacherId')}
                />
              </HorizontalStack>
              <HorizontalStack position={'apart'}>
                <Button
                  color={'red'}
                  onClick={createClassroomForm.form.reset}
                  leftIcon={<IconClearAll />}
                >
                  Clear data
                </Button>
                <Button
                  type={'submit'}
                  color={'green'}
                  leftIcon={<IconFilePlus />}
                >
                  Create classroom
                </Button>
              </HorizontalStack>
            </VerticalStack>
          </form>
        </VerticalStack>
      </Modal>
    </VerticalStack>
  )
}
