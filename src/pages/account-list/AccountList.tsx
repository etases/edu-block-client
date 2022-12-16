import {
  Avatar,
  Badge,
  Button,
  DateInput,
  Grid,
  GridCol,
  HorizontalStack,
  IconButton,
  IconWrapper,
  Modal,
  Pagination,
  PasswordInput,
  RadioInput,
  RadioInputGroup,
  SelectInput,
  Table,
  TextareaInput,
  TextInput,
  VerticalStack,
} from '@components'
import { useAccountListPage } from '@hooks/use-page'
import { Collapse, Divider, Text } from '@mantine/core'
import {
  IconCategory,
  IconClearAll,
  IconFileInfo,
  IconGenderFemale,
  IconGenderMale,
  IconPassword,
  IconSearch,
  IconTrashX,
  IconUser,
  IconUserCheck,
  IconUserPlus,
  IconUserSearch,
} from '@tabler/icons'
import dayjs from 'dayjs'

export function AccountList() {
  const {
    table: { accountList, tableHeaders },
    state: {
      profileUpdateModal: {
        profileUpdateModalState,
        closeProfileUpdateModal,
        openProfileUpdateModal,
      },
      searchPopover: { closeSearchView, openSearchView, searchViewState },
      searchCategory: { selectedCategory, setSelectedCategory },
      search: { setSearchText },
      page: { setCurrentPage, currentPage },
      total: { totalPages },
      createModal: { openCreateModal, closeCreateModal, createModalState },
      passwordModal: {
        closePasswordUpdateModal,
        openPasswordUpdateModal,
        passwordUpdateModalState,
      },
    },
    form: { profileForm, createForm, passwordForm },
    account: { role: accountRole, id: accountId },
    others: { searchSelectOption, roleColor, navigate, translatedObjectAccountListButtons, translatedObjectPlaceHolder, translatedText, translationsButtons },
  } = useAccountListPage()

  // const { translatedObjectAccountListButtons } = useAccountListPage()
 
  return (
    <VerticalStack>
      <VerticalStack>
        <HorizontalStack position={'apart'}>
          <HorizontalStack>
            <Button
              leftIcon={<IconSearch />}
              onClick={searchViewState ? closeSearchView : openSearchView}
            >
              {translatedObjectAccountListButtons?.["ACCOUNT.BUTTON.SEARCH"]}
            </Button>
            {accountRole === 'ADMIN' && (
              <Button
                leftIcon={<IconUserPlus />}
                onClick={createModalState ? closeCreateModal : openCreateModal}
              >
                {translatedObjectAccountListButtons?.["ACCOUNT.BUTTON.CREATE"]}
              </Button>
            )}
          </HorizontalStack>
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={setCurrentPage}
          />
        </HorizontalStack>
        <Collapse in={searchViewState}>
          <Divider pb={'md'} />
          <Grid>
            <GridCol span={4}>
              <SelectInput
                // withAsterisk={true}
                data={searchSelectOption}
                icon={<IconCategory />}
                placeholder={translatedObjectPlaceHolder?.["ACCOUNT.BUTTON.SEARCH_IN"]?.toString()}
                value={selectedCategory}
                onChange={(value) => {
                  setSelectedCategory(value || '')
                }}
                nothingFound={'Nothing found!'}
              />
            </GridCol>
            <GridCol span={8}>
              <TextInput
                placeholder={translatedObjectPlaceHolder?.["ACCOUNT.BUTTON.SEARCH_TEXT"]?.toString()}
                // withAsterisk={true}
                icon={<IconUserSearch />}
                // value={searchText}
                onChange={({ currentTarget: { value } }) => {
                  setSearchText(value)
                  setCurrentPage(1)
                }}
              />
            </GridCol>
          </Grid>
        </Collapse>
        <Divider />
        <Table
          tableData={accountList.map((item) => {
            const currentRole = item.role.toUpperCase()
            return {
              ...item,
              id: item.id.toString().padStart(6, '0'),
              isMale: item.isMale ? (
                <IconWrapper color={'blue'}>
                  <IconGenderMale />
                </IconWrapper>
              ) : (
                <IconWrapper color={'red'}>
                  <IconGenderFemale />
                </IconWrapper>
              ),
              role: (
                <Badge color={roleColor[item.role as keyof typeof roleColor]}>
                  {item.role}
                </Badge>
              ),
              avatar: <Avatar src={item.avatar} />,
              actions: (
                <HorizontalStack position={'center'}>
                  {accountRole === 'STAFF' &&
                    (currentRole === 'TEACHER' ||
                      currentRole === 'STUDENT') && (
                      <IconButton
                        label={translatedText?.["ACCOUNT.TEXT.UPDATE_ACCOUNT_PROFILE"]}
                        onClick={() => {
                          profileForm.loadFormValues(item.id, {
                            firstName: item.firstName,
                            lastName: item.lastName,
                            avatar: item.avatar,
                            birthDate: dayjs(item.dob, 'YYYY-MM-DD').toDate(),
                            male: item.isMale ? '1' : '0',
                            email: item.email,
                            phone: item.phone,
                            address: item.address,
                          })
                          openProfileUpdateModal()
                        }}
                      >
                        <IconFileInfo />
                      </IconButton>
                    )}
                  <IconButton
                    label={'Details'}
                    onClick={() =>
                      navigate(
                        `/app/account/${item.id}${
                          item.role.toUpperCase() === 'STUDENT' ? '/record' : ''
                        }`
                      )
                    }
                  >
                    <IconUser />
                  </IconButton>
                  {accountRole === 'ADMIN' &&
                    (accountId === item.id || item.role !== 'ADMIN') && (
                      <IconButton
                        label={translatedText?.["ACCOUNT.TEXT.UPDATE_PASSWORD"]}
                        onClick={() => {
                          openPasswordUpdateModal()
                          passwordForm.loadFormValues({
                            username: item.username,
                          })
                        }}
                      >
                        <IconPassword />
                      </IconButton>
                    )}
                </HorizontalStack>
              ),
            }
          })}
          tableHeader={tableHeaders}
        />
      </VerticalStack>
      <Modal
        opened={createModalState}
        onClose={closeCreateModal}
        title={
          <Text
            weight={'bold'}
            size={'lg'}
          >
            {translatedText?.["ACCOUNT.TEXT.CREATE_ACCOUNT"]}
          </Text>
        }
      >
        <VerticalStack>
          <form onSubmit={createForm.submitForm}>
            <VerticalStack>
              {createForm.form.values.accounts.map((item, index) => (
                <Grid
                  key={`grid_createAccount__${index}`}
                  grow={true}
                >
                  <GridCol span={4}>
                    <TextInput
                      required={true}
                      placeholder={translatedObjectPlaceHolder?.["ACCOUNT_PROFILE.TEXT_INPUT.FIRST_NAME"]?.toString()}
                      {...createForm.inputPropsOf(
                        `accounts.${index}.firstName`
                      )}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <TextInput
                      required={true}
                      placeholder={translatedObjectPlaceHolder?.["ACCOUNT_PROFILE.TEXT_INPUT.LAST_NAME"]?.toString()}
                      {...createForm.inputPropsOf(`accounts.${index}.lastName`)}
                    />
                  </GridCol>
                  <GridCol span={3}>
                    <SelectInput
                      required={true}
                      placeholder={translatedObjectPlaceHolder?.["PROFILE.ROLE"]?.toString()}
                      data={['ADMIN', 'STAFF', 'TEACHER', 'STUDENT']}
                      {...createForm.inputPropsOf(`accounts.${index}.role`)}
                    />
                  </GridCol>
                  <GridCol span={1}>
                    <IconButton
                      label={translatedText?.["ACCOUNT_LIST.LABEL.REMOVE"]}
                      color={'red'}
                      size={'xl'}
                      onClick={() => createForm.removeAccountFromList(index)}
                    >
                      <IconTrashX />
                    </IconButton>
                  </GridCol>
                </Grid>
              ))}
              <HorizontalStack position={'apart'}>
                <Button
                  color={'red'}
                  onClick={createForm.form.reset}
                  leftIcon={<IconClearAll />}
                >
                  {translatedText?.["ACCOUNT_LIST.LABEL.CLEAR_ALL"]}
                </Button>
                <HorizontalStack>
                  <Button
                    leftIcon={<IconUserPlus />}
                    onClick={() => createForm.insertAccountToList()}
                  >
                    {translatedText?.["ACCOUNT_LIST.LABEL.ADD_ACCOUNT"]}
                  </Button>
                  <Button
                    color={'green'}
                    type={'submit'}
                    leftIcon={<IconUserCheck />}
                  >
                    {translatedText?.["ACCOUNT_LIST.LABEL.CREATE_ACCOUNTS"]}
                  </Button>
                </HorizontalStack>
              </HorizontalStack>
            </VerticalStack>
          </form>
        </VerticalStack>
      </Modal>
      <Modal
        opened={profileUpdateModalState}
        onClose={closeProfileUpdateModal}
        title={
          <Text
            weight={'bold'}
            size={'lg'}
          >
            {translatedText?.["ACCOUNT_PROFILE.BUTTON.UPDATE_PROFILE"]}
          </Text>
        }
      >
        <VerticalStack>
          <form onSubmit={profileForm.submitForm}>
            <VerticalStack>
              <TextInput
                label={'Avatar'}
                {...profileForm.inputPropsOf('avatar')}
              />
              <HorizontalStack>
                <TextInput
                  withAsterisk={true}
                  label={translatedText?.["ACCOUNT_PROFILE.TEXT_INPUT.FIRST_NAME"]}
                  {...profileForm.inputPropsOf('firstName')}
                />
                <TextInput
                  withAsterisk={true}
                  label={translatedText?.["ACCOUNT_PROFILE.TEXT_INPUT.LAST_NAME"]}
                  {...profileForm.inputPropsOf('lastName')}
                />
              </HorizontalStack>
              <RadioInputGroup
                label={translatedText?.["ACCOUNT_PROFILE.TEXT_INPUT.GENDER"]}
                size={'md'}
                {...profileForm.inputPropsOf('male')}
              >
                <RadioInput
                  size={'md'}
                  value={'1'}
                  label={translatedText?.["ACCOUNT_PROFILE.TEXT_INPUT.GENDER_MALE"]}
                />
                <RadioInput
                  size={'md'}
                  value={'0'}
                  label={translatedText?.["ACCOUNT_PROFILE.TEXT_INPUT.GENDER_FEMALE"]}
                />
              </RadioInputGroup>
              <DateInput
                label={translatedText?.["ACCOUNT_PROFILE.TEXT_INPUT.DOB"]}
                variant={'default'}
                radius={'md'}
                size={'md'}
                minDate={dayjs(new Date())
                  .startOf('year')
                  .subtract(60, 'year')
                  .toDate()}
                maxDate={dayjs(new Date())
                  .endOf('year')
                  .subtract(6, 'year')
                  .toDate()}
                allowFreeInput={true}
                inputFormat={'DD/MM/YYYY'}
                dateParser={(dateString) => {
                  return dayjs(
                    dateString,
                    ['DD', 'MM', 'YYYY'].join(
                      dateString.includes('/')
                        ? '/'
                        : dateString.includes('-')
                        ? '-'
                        : dateString.includes(' ')
                        ? ' '
                        : ''
                    )
                  ).toDate()
                }}
                withAsterisk={true}
                {...profileForm.inputPropsOf('birthDate')}
              />
              <TextInput
                label={translatedText?.["ACCOUNT_PROFILE.TEXT_INPUT.PHONE"]}
                withAsterisk={true}
                icon={'+84'}
                {...profileForm.inputPropsOf('phone')}
              />
              <TextInput
                label={translatedText?.["ACCOUNT_PROFILE.TEXT_INPUT.EMAIL"]}
                icon={'@'}
                {...profileForm.inputPropsOf('email')}
              />
              <TextareaInput
                label={translatedText?.["ACCOUNT_PROFILE.TEXT_INPUT.ADDRESS"]}
                withAsterisk={true}
                size={'md'}
                {...profileForm.inputPropsOf('address')}
              />
              <Button type={'submit'}>{translationsButtons?.["STUDENT_PROFILE.BUTTON.SUBMIT"]}</Button>
            </VerticalStack>
          </form>
        </VerticalStack>
      </Modal>
      <Modal
        opened={passwordUpdateModalState}
        onClose={closePasswordUpdateModal}
        title={
          <Text
            size={'lg'}
            weight={'bold'}
          >
            {translatedText?.["ACCOUNT.TEXT.UPDATE_PASSWORD"]}
          </Text>
        }
      >
        <VerticalStack>
          <form onSubmit={passwordForm.submitForm}>
            <VerticalStack>
              <TextInput
                readOnly={true}
                {...passwordForm.inputPropsOf('accounts.0.username')}
              />
              <PasswordInput
                defaultVisible={true}
                {...passwordForm.inputPropsOf('accounts.0.password')}
              />
              <HorizontalStack position={'right'}>
                <Button type={'submit'}>
                {translatedObjectAccountListButtons?.["ACCOUNT_PROFILE.BUTTON.UPDATE"]}
                  </Button>
              </HorizontalStack>
            </VerticalStack>
          </form>
        </VerticalStack>
      </Modal>
    </VerticalStack>
  )
}
