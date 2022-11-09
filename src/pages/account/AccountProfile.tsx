import {
  Badge,
  Card,
  DateInput,
  Grid,
  GridCol,
  HorizontalStack,
  RadioInput,
  RadioInputGroup,
  TextareaInput,
  TextInput,
  VerticalStack,
} from '@components'
import { useAccountProfilePage } from '@hooks/use-page'
import { Divider, Image, Title } from '@mantine/core'
import { IconUserCircle } from '@tabler/icons'
import dayjs from 'dayjs'
import { Outlet } from 'react-router-dom'

export function AccountProfile() {
  const { accountProfile } = useAccountProfilePage()

  return (
    <VerticalStack>
      <HorizontalStack>
        <Title>Account Profile</Title>
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
      <Divider />
      {accountProfile?.role.toUpperCase() === 'STUDENT' && <Outlet />}
    </VerticalStack>
  )
}
