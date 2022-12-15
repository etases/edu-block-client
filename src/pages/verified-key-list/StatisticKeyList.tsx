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
import { useTitleStore } from '@hooks/use-store'
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
import { forwardRef, useEffect, useRef, useTransition } from 'react'
import { useTranslation } from '@hooks/use-translation'

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

const PAGE_TITLE = 'Statistic key list'

export function StatisticKeyList() {
  const { setTitle } = useTitleStore()

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

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

  const translation = {
    'STATISTIC_KEY_LIST.TITLE.VERIFIED_STATISTIC_ACCESS_TOKEN': null,
    'STATISTIC_KEY_LIST.PLACEHOLDER.GRADE': null,
    'STATISTIC_KEY_LIST.BUTTON.CREATE_NEW_STATISTIC_KEY': null,
    'STATISTIC_KEY_LIST.LABEL.SAVE': null,
    'STATISTIC_KEY_LIST.LABEL.COPY': null,
    'STATISTIC_KEY_LIST.LABEL.REMOVE_KEY': null,
    'STATISTIC_KEY_LIST.LABEL.KEY': null,
    'STATISTIC_KEY_LIST.LABEL.YEAR': null,
    'ACCOUNT_LIST_PAGE.TABLE.HEADER.ACTIONS': null,
  }
  // Verified Statistic Access Token
  const { translate } = useTranslation(translation)

  return (
    <VerticalStack>
      <HorizontalStack position={'apart'}> 
        <Title>{translate("STATISTIC_KEY_LIST.TITLE.VERIFIED_STATISTIC_ACCESS_TOKEN")}</Title>
      </HorizontalStack>
      <Divider />
      <HorizontalStack grow={true}>
        <SelectInput
          placeholder={translate("STATISTIC_KEY_LIST.PLACEHOLDER.GRADE")}
          data={Array.from(Array(12), (v, k) => k + 1).map((grade) => ({
            value: grade,
            label: [translate("STATISTIC_KEY_LIST.PLACEHOLDER.GRADE"), grade].join(' '),
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
          {translate("STATISTIC_KEY_LIST.BUTTON.CREATE_NEW_STATISTIC_KEY")}
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
                        label={translate("STATISTIC_KEY_LIST.LABEL.SAVE")}
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
                      label={translate("STATISTIC_KEY_LIST.LABEL.COPY")}
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
                label={translate("STATISTIC_KEY_LIST.LABEL.REMOVE_KEY")}
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
            label: translate("STATISTIC_KEY_LIST.LABEL.KEY"),
            align: 'left',
          },
          {
            identifier: 'grade',
            label: translate("STATISTIC_KEY_LIST.PLACEHOLDER.GRADE"),
          },
          {
            identifier: 'year',
            label: translate("STATISTIC_KEY_LIST.LABEL.YEAR"),
          },
          {
            identifier: 'actions',
            label: translate("ACCOUNT_LIST_PAGE.TABLE.HEADER.ACTIONS"),
          },
        ]}
      />
    </VerticalStack>
  )
}
