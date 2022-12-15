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
import { useTranslation } from '@hooks/use-translation'
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
  const {translate} = useTranslation()
  const {
    table: { tableHeaders, classroomList },
    others: {
      searchSelectOption,
      searchSelectTeacherOption,
      navigate,
      teacherList,
      account,
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
          <Title>{translate("CLASSROOM_LIST.TITLE")}</Title>
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
              {translate("CLASSROOM_LIST.SEARCH")}
            </Button>
            {account.role === 'STAFF' && (
              <Button
                leftIcon={<IconClipboardPlus />}
                onClick={openClassroomCreateModal}
              >
                {translate("CLASSROOM_LIST.CREATE")}
              </Button>
            )}
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
                placeholder={translate("CLASSROOM_LIST.SEARCHIN").toString()}
                nothingFound={'Nothing found!'}
                icon={<IconCategory />}
                onChange={(value) => setSelectedSearchField(value || '')}
              />
            </GridCol>
            <GridCol span={8}>
              <TextInput
                icon={<IconListSearch />}
                placeholder={translate("CLASSROOM_LIST.SEARCHTEXT").toString()}
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
                  label={translate("TEACHER.DASHBOARD.ACTIONS.DETAILS")}
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
            {translate("CLASSROOM_LIST.CREATE")}
          </Text>
        }
      >
        <VerticalStack>
          <form onSubmit={createClassroomForm.submitForm}>
            <VerticalStack>
              <HorizontalStack>
                <TextInput
                  required={true}
                  withAsterisk={true}
                  placeholder={translate("CLASSROOM_LIST.CLASSNAME")}
                  {...createClassroomForm.inputPropsOf('name')}
                />
                <AutocompleteInput
                  required={true}
                  withAsterisk={true}
                  data={Array.from(new Array(12)).map((item, index) =>
                    (index + 1).toString()
                  )}
                  placeholder={translate("CLASSROOM_LIST.GRADE")}
                  {...createClassroomForm.inputPropsOf('grade')}
                />
                <AutocompleteInput
                  required={true}
                  withAsterisk={true}
                  data={Array.from(Array(5)).map((item, index) =>
                    (index + dayjs().get('year')).toString()
                  )}
                  placeholder={translate("CLASSROOM_LIST.CREATE.YEAR")}
                  {...createClassroomForm.inputPropsOf('year')}
                />
              </HorizontalStack>
              <HorizontalStack grow={true}>
                <SelectInput
                  placeholder={translate("CLASSROOM_LIST.CREATE.SEARCH_TEACHER").toString()}
                  data={searchSelectTeacherOption}
                />
                <SelectInput
                  required={true}
                  withAsterisk={true}
                  size={'md'}
                  radius={'md'}
                  placeholder={translate("CLASSROOM_LIST.CREATE.SELECT_TEACHER").toString()}
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
                  type={'reset'}
                >
                  {translate("CLASSROOM_LIST.CREATE.CLEAR")}
                </Button>
                <Button
                  type={'submit'}
                  color={'green'}
                  leftIcon={<IconFilePlus />}
                >
                  {translate("CLASSROOM_LIST.CREATE.CONFIRM")}
                </Button>
              </HorizontalStack>
            </VerticalStack>
          </form>
        </VerticalStack>
      </Modal>
    </VerticalStack>
  )
}
