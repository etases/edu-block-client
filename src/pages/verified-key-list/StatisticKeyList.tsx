import {
  Button,
  HorizontalStack,
  IconButton,
  SelectInput,
  Table,
  VerticalStack,
} from '@components'
import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query'
import {
  CopyButton,
  Divider,
  HoverCard,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import {
  IconClipboard,
  IconClipboardCheck,
  IconFileDownload,
  IconQrcode,
  IconTrash,
} from '@tabler/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { dayjs, notifyError, notifyInformation } from '@utilities/functions'
import { QRCodeCanvas } from 'qrcode.react'
import { forwardRef, useRef } from 'react'

const QRButtonComponent = forwardRef<HTMLDivElement>((props, ref) => (
  // <IconButton
  //   label={'QR Code'}
  //   forwardedRef={ref}
  //   {...props}
  // >
  <ThemeIcon
    ref={ref}
    variant={'default'}
    {...props}
  >
    <IconQrcode />
  </ThemeIcon>
  // </IconButton>
))

export function StatisticKeyList() {
  const queryClient = useQueryClient()
  const qrCodeRef = useRef<HTMLDivElement>(null)

  const statisticKeyListQuery = useQuery({
    queryKey: [ENDPOINT.READ.STATISTIC_KEY_LIST],
    queryFn: async function () {
      return await request({
        endpoint: ENDPOINT.READ.STATISTIC_KEY_LIST,
      })
    },
    select({ data }) {
      return data.map(({ id, grade, year }: any) => ({ key: id, grade, year }))
    },
    onSuccess(data) {
      notifyInformation({ message: 'Statistic key list synced' })
    },
    onError(err) {
      notifyError({ message: ENDPOINT.READ.STATISTIC_KEY_LIST })
    },
  })

  const createStatisticKeyMutation = useMutation({
    mutationKey: [],
    mutationFn: async function (variables: { grade: number; year: number }) {
      return await request({
        endpoint: ENDPOINT.CREATE.STATISTIC_KEY,
        method: 'POST',
        body: { ...variables },
      })
    },
    onError(error, variables, context) {
      notifyError({ message: ENDPOINT.CREATE.STATISTIC_KEY })
    },
    onSuccess(data, variables, context) {
      notifyInformation({ message: data.message })
      queryClient.invalidateQueries({
        predicate(query) {
          return (query.queryKey.at(0) as string).includes('statistic')
        },
      })
    },
  })

  const createStatisticKeyForm = useForm<{ year: number; grade: number }>({
    initialValues: {
      grade: 0,
      year: dayjs().year(),
    },
  })

  const removeStatisticKeyMutation = useMutation({
    mutationKey: [],
    mutationFn: async function (key: string) {
      const endpoint = ENDPOINT.DELETE.STATISTIC_KEY.replace('{key}', key)
      return await request({
        endpoint,
        method: 'DELETE',
      })
    },
    onError(error, variables, context) {
      notifyError({ message: ENDPOINT.DELETE.STATISTIC_KEY })
    },
    onSuccess(data, variables, context) {
      notifyInformation({ message: data.message })
      queryClient.invalidateQueries({
        predicate(query) {
          return (query.queryKey.at(0) as string).includes('statistic')
        },
      })
    },
  })

  return (
    <VerticalStack>
      <HorizontalStack position={'apart'}>
        <Title>Verified Statistic Access Token</Title>
      </HorizontalStack>
      <Divider />
      <HorizontalStack grow={true}>
        <SelectInput
          placeholder={'Grade'}
          data={Array.from(Array(12), (v, k) => k + 1).map((grade) => ({
            value: grade,
            label: ['Grade', grade].join(' '),
          }))}
          {...createStatisticKeyForm.getInputProps('grade')}
        />
        <SelectInput
          placeholder={'Year'}
          data={Array.from(Array(10), (v, k) => k).map((i) => {
            const year = dayjs()
              .subtract(9 - i, 'year')
              .year()
            return {
              value: year,
              label: year.toString(),
            }
          })}
          {...createStatisticKeyForm.getInputProps('year')}
        />
        <Button
          onClick={() =>
            createStatisticKeyMutation.mutate(createStatisticKeyForm.values)
          }
        >
          Create new Statistic key
        </Button>
      </HorizontalStack>
      <Divider />
      <Table
        tableData={statisticKeyListQuery.data?.map((item: any) => ({
          ...item,
          key: (
            <HorizontalStack>
              <HoverCard position={'bottom-start'}>
                <HoverCard.Target>
                  <QRButtonComponent />
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <VerticalStack align={'center'}>
                    <div ref={qrCodeRef}>
                      <QRCodeCanvas
                        // @ts-ignore
                        value={item.key}
                        includeMargin={true}
                        size={175}
                      />
                    </div>
                    <Divider />
                    <HorizontalStack>
                      <IconButton
                        label={'Save'}
                        onClick={() => {
                          const refNode = qrCodeRef.current
                          if (!refNode) return

                          const dataUrl = (
                            refNode.firstElementChild as HTMLCanvasElement
                          )?.toDataURL()

                          const downloadElement = document.createElement('a')
                          downloadElement.download = item.key + '.png'
                          downloadElement.href = dataUrl
                          downloadElement.click()
                          downloadElement.remove()
                        }}
                      >
                        <IconFileDownload />
                      </IconButton>
                    </HorizontalStack>
                  </VerticalStack>
                </HoverCard.Dropdown>
              </HoverCard>
              <HorizontalStack>
                <CopyButton value={item.key}>
                  {({ copied, copy }) => (
                    <IconButton
                      label={'Copy'}
                      onClick={copy}
                    >
                      {copied ? <IconClipboardCheck /> : <IconClipboard />}
                    </IconButton>
                  )}
                </CopyButton>
                <Text>{item.key}</Text>
              </HorizontalStack>
            </HorizontalStack>
          ),
          actions: (
            <HorizontalStack>
              <IconButton
                label={'Remove key'}
                onClick={() => removeStatisticKeyMutation.mutate(item.key)}
                color={'red'}
              >
                <IconTrash />
              </IconButton>
            </HorizontalStack>
          ),
        }))}
        tableHeader={[
          {
            identifier: 'key',
            label: 'Key',
            align: 'left',
          },
          {
            identifier: 'grade',
            label: 'Grade',
          },
          {
            identifier: 'year',
            label: 'Year',
          },
          {
            identifier: 'actions',
            label: 'Actions',
          },
        ]}
      />
    </VerticalStack>
  )
}
