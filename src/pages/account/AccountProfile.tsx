import {
  Avatar,
  Badge,
  Button,
  Card,
  DateInput,
  Grid,
  GridCol,
  HorizontalStack,
  Modal,
  PasswordInput,
  RadioInput,
  RadioInputGroup,
  TextareaInput,
  TextInput,
  VerticalStack,
} from '@components'
import { useAccountProfilePage } from '@hooks/use-page'
import { Divider, Image, Text, Title } from '@mantine/core'
import { IconUserCircle } from '@tabler/icons'
import dayjs from 'dayjs'
import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

export function AccountProfile() {
  const {
    accountProfile,
    others: { account },
    modals: { profile: profileModal, password: passwordModal },
    forms: { profileForm, passwordForm },
  } = useAccountProfilePage()

  return (
    <VerticalStack>
      <HorizontalStack position={'apart'}>
        <Title>Account Profile</Title>
        <HorizontalStack>
          {account.id === accountProfile?.id && (
            <Button onClick={passwordModal.openPasswordUpdateModal}>
              Change password
            </Button>
          )}
          {(account.role === 'STAFF' || account.role === 'ADMIN') &&
            account.id === accountProfile?.id && (
              <Button
                onClick={() => {
                  profileModal.openProfileUpdateModal()
                  profileForm.loadFormValues(accountProfile.id, {
                    address: accountProfile.address,
                    avatar: accountProfile.avatar,
                    birthDate: dayjs(accountProfile?.dateOfBirth).toDate(),
                    email: accountProfile.email,
                    firstName: accountProfile.firstName,
                    lastName: accountProfile.lastName,
                    male: accountProfile.isMale ? '1' : '0',
                    phone: accountProfile.phone,
                  })
                }}
              >
                Update Profile
              </Button>
            )}
        </HorizontalStack>
      </HorizontalStack>
      <Divider />
      <HorizontalStack position={'center'}>
        <VerticalStack
          sx={{
            width: 1280,
            maxWidth: 1280,
          }}
        >
          <Grid grow={true}>
            <GridCol span={'content'}>
              <Card
                p={'md'}
                sx={{ width: '100%' }}
              >
                <VerticalStack align={'center'}>
                  <Image
                    radius={'md'}
                    src={accountProfile?.avatar}
                    width={200}
                    height={200}
                    withPlaceholder={true}
                    placeholder={<IconUserCircle size={'auto'} />}
                  />
                  <Badge sx={{ alignSelf: 'stretch' }}>
                    ID: {accountProfile?.id.toString().padStart(6, '0')}
                  </Badge>
                  <Badge
                    color={'orange'}
                    sx={{ alignSelf: 'stretch' }}
                  >
                    Username: {accountProfile?.userName}
                  </Badge>
                  <Badge
                    color={'grape'}
                    sx={{ alignSelf: 'stretch' }}
                  >
                    Role: {accountProfile?.role}
                  </Badge>
                </VerticalStack>
              </Card>
            </GridCol>
            <GridCol span={8}>
              <Grid>
                <GridCol span={4}>
                  <TextInput
                    defaultValue={accountProfile?.firstName}
                    label={'First name'}
                    readOnly={true}
                  />
                </GridCol>
                <GridCol span={4}>
                  <TextInput
                    defaultValue={accountProfile?.lastName}
                    label={'Last name'}
                    readOnly={true}
                  />
                </GridCol>
                <GridCol span={4}>
                  <DateInput
                    label={'Date of Birth'}
                    readOnly={true}
                    value={dayjs(accountProfile?.dateOfBirth).toDate()}
                    clearable={false}
                    // inputFormat={'YYYY-MM-DD'}
                  />
                </GridCol>
                <GridCol span={4}>
                  <RadioInputGroup
                    value={accountProfile?.isMale ? 'M' : 'F'}
                    label={'Gender'}
                  >
                    {[true, false].map((item, index) => (
                      <RadioInput
                        key={`profileGender__${index}`}
                        label={
                          accountProfile?.isMale === item ? 'Male' : 'Female'
                        }
                        value={accountProfile?.isMale === item ? 'M' : 'F'}
                      />
                    ))}
                  </RadioInputGroup>
                </GridCol>
                <GridCol span={4}>
                  <TextInput
                    readOnly={true}
                    defaultValue={accountProfile?.phone}
                    label={'Phone'}
                  />
                </GridCol>
                <GridCol span={4}>
                  <TextInput
                    readOnly={true}
                    defaultValue={accountProfile?.email}
                    label={'Email'}
                  />
                </GridCol>
                <GridCol span={'auto'}>
                  <TextareaInput
                    readOnly={true}
                    defaultValue={accountProfile?.address}
                    label={'Address'}
                  />
                </GridCol>
              </Grid>
            </GridCol>
          </Grid>
        </VerticalStack>
      </HorizontalStack>
      {/* <Divider /> */}
      {accountProfile?.role.toUpperCase() === 'STUDENT' && (
        <Fragment>
          <Divider />
          <Outlet />
        </Fragment>
      )}
      <Modal
        opened={passwordModal.passwordUpdateModalState}
        onClose={passwordModal.closePasswordUpdateModal}
        title={
          <Text
            size={'lg'}
            weight={'bold'}
          >
            Change password
          </Text>
        }
      >
        <VerticalStack>
          <form onSubmit={passwordForm.submitForm}>
            <VerticalStack>
              <PasswordInput
                label={'Old password'}
                {...passwordForm.inputPropsOf('oldPassword')}
              />
              <PasswordInput
                defaultVisible={true}
                label={'New password'}
                {...passwordForm.inputPropsOf('newPassword')}
              />
              <PasswordInput
                defaultVisible={true}
                label={'Confirm new password'}
                {...passwordForm.inputPropsOf('confirmNewPassword')}
              />
              <HorizontalStack position={'right'}>
                <Button type={'submit'}>Submit</Button>
              </HorizontalStack>
            </VerticalStack>
          </form>
        </VerticalStack>
      </Modal>
      <Modal
        opened={profileModal.profileUpdateModalState}
        onClose={profileModal.closeProfileUpdateModal}
        title={
          <Text
            size={'lg'}
            weight={'bold'}
          >
            Update profile
          </Text>
        }
      >
        <VerticalStack>
          <form onSubmit={profileForm.submitForm}>
            <VerticalStack>
              <Grid align={'end'}>
                <GridCol span={2}>
                  <Avatar
                    src={profileForm.form.values.avatar}
                    size={'md'}
                  />
                </GridCol>
                <GridCol span={10}>
                  <TextInput
                    label={'Avatar'}
                    {...profileForm.inputPropsOf('avatar')}
                  />
                </GridCol>
              </Grid>
              <HorizontalStack>
                <TextInput
                  withAsterisk={true}
                  label={'First Name'}
                  {...profileForm.inputPropsOf('firstName')}
                />
                <TextInput
                  withAsterisk={true}
                  label={'Last Name'}
                  {...profileForm.inputPropsOf('lastName')}
                />
              </HorizontalStack>
              <RadioInputGroup
                label={'Gender'}
                size={'md'}
                {...profileForm.inputPropsOf('male')}
              >
                <RadioInput
                  size={'md'}
                  value={'1'}
                  label={'Male'}
                />
                <RadioInput
                  size={'md'}
                  value={'0'}
                  label={'Female'}
                />
              </RadioInputGroup>
              <DateInput
                label={'Date of Birth'}
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
                label={'Phone'}
                withAsterisk={true}
                icon={'+84'}
                {...profileForm.inputPropsOf('phone')}
              />
              <TextInput
                label={'Email'}
                icon={'@'}
                {...profileForm.inputPropsOf('email')}
              />
              <TextareaInput
                label={'Address'}
                withAsterisk={true}
                size={'md'}
                {...profileForm.inputPropsOf('address')}
              />
              <Button type={'submit'}>Submit</Button>
            </VerticalStack>
          </form>
        </VerticalStack>
      </Modal>
    </VerticalStack>
  )
}
