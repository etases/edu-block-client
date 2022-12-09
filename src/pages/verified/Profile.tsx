import {
  Badge,
  Card,
  Grid,
  GridCol,
  HorizontalStack,
  RadioInput,
  RadioInputGroup,
  TextareaInput,
  TextInput,
  VerticalStack,
} from '@components'
import { request } from '@hooks/use-query'
import { Divider, Image, Title } from '@mantine/core'
import { IconUserCircle } from '@tabler/icons'
import { useQuery } from '@tanstack/react-query'
import { dayjs, notifyError, notifyInformation } from '@utilities/functions'
import { useParams } from 'react-router-dom'

export function Profile() {
  const { accountId } = useParams()

  const endpoint = `/updater/${accountId}/personal`

  const { data: accountProfile } = useQuery({
    enabled: !!accountId,
    queryKey: [endpoint],
    queryFn: async function () {
      return await request({
        endpoint,
      })
    },
    select({ data }) {
      return { ...data.account, ...data.profile }
    },
    onError(err) {
      notifyError({ message: endpoint })
    },
    onSuccess(data) {
      notifyInformation({ message: 'Account profile synced' })
    },
  })

  return (
    <VerticalStack>
      <HorizontalStack>
        <Title>Profile</Title>
      </HorizontalStack>
      <Divider />
      <VerticalStack>
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
                {/* <Badge
                  color={'orange'}
                  sx={{ alignSelf: 'stretch' }}
                >
                  Username: {accountProfile?.username}
                </Badge>
                <Badge
                  color={'grape'}
                  sx={{ alignSelf: 'stretch' }}
                >
                  Role: {accountProfile?.role}
                </Badge> */}
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
                <TextInput
                  label={'Date of Birth'}
                  readOnly={true}
                  value={dayjs(accountProfile?.birthDate).format('LL')}
                  // clearable={false}
                  // inputFormat={'YYYY-MM-DD'}
                />
              </GridCol>
              <GridCol span={4}>
                <RadioInputGroup
                  value={accountProfile?.male ? 'M' : 'F'}
                  label={'Gender'}
                >
                  {[true, false].map((item, index) => (
                    <RadioInput
                      key={`profileGender__${index}`}
                      label={accountProfile?.male === item ? 'Male' : 'Female'}
                      value={accountProfile?.male === item ? 'M' : 'F'}
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
    </VerticalStack>
  )
}
