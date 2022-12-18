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
import { useTranslation } from '@hooks/use-translation'
import { Divider, Image, Text, Title } from '@mantine/core'
import { IconUserCircle } from '@tabler/icons'
import dayjs from 'dayjs'
import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

const translate = {
  "PROFILE.TITLE": null,
  "PROFILE.PASSWORD_CHANGE": null,
  "PROFILE.PASSWORD_CHANGE.OLD": null,
  "PROFILE.PASSWORD_CHANGE.NEW": null,
  "PROFILE.PASSWORD_CHANGE.CONFIRM": null,
  "PROFILE.PASSWORD_CHANGE.SUBMIT": null,
  "PROFILE.UPDATE": null,
  "PROFILE.ROLE": null,
  "PROFILE.FIRST_NAME": null,
  "PROFILE.LAST_NAME": null,
  "PROFILE.DOB": null,
  "PROFILE.GENDER": null,
  "PROFILE.GENDER.MALE": null,
  "PROFILE.GENDER.FEMALE": null,
  "PROFILE.PHONE": null,
  "PROFILE.ADDRESS": null,
  "LOGIN.FIELD.USERNAME": null
}

export function AccountProfile() {
  const {translatedObject} = useTranslation(translate)
  const {
    accountProfile,
    others: { account },
    modals: { profile: profileModal, password: passwordModal },
    forms: { profileForm, passwordForm },
  } = useAccountProfilePage()

  return (
    <VerticalStack>
      <HorizontalStack position={'apart'}>
        <Title>{translatedObject?.['PROFILE.TITLE']}</Title>
        <HorizontalStack>
          {account.id === accountProfile?.id && (
            <Button onClick={passwordModal.openPasswordUpdateModal}>
              {translatedObject?.['PROFILE.PASSWORD_CHANGE']}
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
                {translatedObject?.['PROFILE.UPDATE']}
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
                    {translatedObject?.['LOGIN.FIELD.USERNAME']}:{' '}
                    {accountProfile?.userName}
                  </Badge>
                  <Badge
                    color={'grape'}
                    sx={{ alignSelf: 'stretch' }}
                  >
                    {translatedObject?.['PROFILE.ROLE']}: {accountProfile?.role}
                  </Badge>
                </VerticalStack>
              </Card>
            </GridCol>
            <GridCol span={8}>
              <Grid>
                <GridCol span={4}>
                  <TextInput
                    defaultValue={accountProfile?.firstName}
                    label={translatedObject?.['PROFILE.FIRST_NAME']}
                    readOnly={true}
                  />
                </GridCol>
                <GridCol span={4}>
                  <TextInput
                    defaultValue={accountProfile?.lastName}
                    label={translatedObject?.['PROFILE.LAST_NAME']}
                    readOnly={true}
                  />
                </GridCol>
                <GridCol span={4}>
                  <DateInput
                    label={translatedObject?.['PROFILE.DOB']}
                    readOnly={true}
                    value={dayjs(accountProfile?.dateOfBirth).toDate()}
                    clearable={false}
                    // inputFormat={'YYYY-MM-DD'}
                  />
                </GridCol>
                <GridCol span={4}>
                  <RadioInputGroup
                    value={accountProfile?.isMale ? 'M' : 'F'}
                    label={translatedObject?.['PROFILE.GENDER']}
                  >
                    {[true, false].map((item, index) => (
                      <RadioInput
                        key={`profileGender__${index}`}
                        label={
                          accountProfile?.isMale === item
                            ? translatedObject?.['PROFILE.GENDER.MALE']
                            : translatedObject?.['PROFILE.GENDER.FEMALE']
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
                    label={translatedObject?.['PROFILE.PHONE']}
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
                    label={translatedObject?.['PROFILE.ADDRESS']}
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
            {translatedObject?.['PROFILE.PASSWORD_CHANGE']}
          </Text>
        }
      >
        <VerticalStack>
          <form onSubmit={passwordForm.submitForm}>
            <VerticalStack>
              <PasswordInput
                label={translatedObject?.['PROFILE.PASSWORD_CHANGE.OLD']}
                {...passwordForm.inputPropsOf('oldPassword')}
              />
              <PasswordInput
                defaultVisible={true}
                label={translatedObject?.['PROFILE.PASSWORD_CHANGE.NEW']}
                {...passwordForm.inputPropsOf('newPassword')}
              />
              <PasswordInput
                defaultVisible={true}
                label={translatedObject?.['PROFILE.PASSWORD_CHANGE.CONFIRM']}
                {...passwordForm.inputPropsOf('confirmNewPassword')}
              />
              <HorizontalStack position={'right'}>
                <Button type={'submit'}>
                  {translatedObject?.['PROFILE.PASSWORD_CHANGE.SUBMIT']}
                </Button>
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
            {translatedObject?.['PROFILE.UPDATE']}
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
                  label={translatedObject?.['PROFILE.FIRST_NAME']}
                  {...profileForm.inputPropsOf('firstName')}
                />
                <TextInput
                  withAsterisk={true}
                  label={translatedObject?.['PROFILE.LAST_NAME']}
                  {...profileForm.inputPropsOf('lastName')}
                />
              </HorizontalStack>
              <RadioInputGroup
                label={translatedObject?.['PROFILE.GENDER']}
                size={'md'}
                {...profileForm.inputPropsOf('male')}
              >
                <RadioInput
                  size={'md'}
                  value={'1'}
                  label={translatedObject?.['PROFILE.GENDER.MALE']}
                />
                <RadioInput
                  size={'md'}
                  value={'0'}
                  label={translatedObject?.['PROFILE.GENDER.FEMALE']}
                />
              </RadioInputGroup>
              <DateInput
                label={translatedObject?.['PROFILE.DOB']}
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
                label={translatedObject?.['PROFILE.PHONE']}
                withAsterisk={true}
                {...profileForm.inputPropsOf('phone')}
              />
              <TextInput
                label={'Email'}
                icon={'@'}
                {...profileForm.inputPropsOf('email')}
              />
              <TextareaInput
                label={translatedObject?.['PROFILE.ADDRESS']}
                withAsterisk={true}
                size={'md'}
                {...profileForm.inputPropsOf('address')}
              />
              <Button type={'submit'}>
                {translatedObject?.['PROFILE.PASSWORD_CHANGE.SUBMIT']}
              </Button>
            </VerticalStack>
          </form>
        </VerticalStack>
      </Modal>
    </VerticalStack>
  )
}
