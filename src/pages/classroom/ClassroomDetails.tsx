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
import { Text } from '@mantine/core'
import { IconCheck, IconRefresh } from '@tabler/icons'
import { forwardRef } from 'react'

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
    others: { searchSelectOption, account, generateClassroomReport },
  } = useClassroomDetailsPage()

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
        {/* <Card p={'md'}>
          <HorizontalStack position={'center'}>
            <Image
              withPlaceholder={true}
              src={classroomDetails?.teacherAvatar}
              width={150}
              height={150}
              radius={'md'}
              placeholder={<IconUserCircle size={'auto'} />}
            />
          </HorizontalStack>
        </Card> */}
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
      <HorizontalStack position={'right'}>
        {account.role !== 'STUDENT' && (
          <Button
            onClick={() =>
              generateClassroomReport(classroomDetails?.classroomName)
            }
          >
            Get classroom report
          </Button>
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
