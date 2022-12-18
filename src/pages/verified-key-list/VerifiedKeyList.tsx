import {
  Button,
  HorizontalStack,
  IconButton,
  Table,
  VerticalStack,
} from '@components'
import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query'
import { useTitleStore } from '@hooks/use-store'
import { useTranslation } from '@hooks/use-translation'
import { CopyButton, Divider, Text, ThemeIcon, Title } from '@mantine/core'
import {
  IconClipboard,
  IconClipboardCheck,
  IconQrcode,
  IconTrash,
} from '@tabler/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { forwardRef, useEffect, useRef } from 'react'

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

const PAGE_TITLE = 'Verified key list'

export function VerifiedKeyList() {
  const { setTitle } = useTitleStore()

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

  const qrCodeRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()
  const { data: keyList = [] } = useQuery({
    queryKey: [ENDPOINT.READ.VERIFIED_KEY_LIST],
    queryFn: async function () {
      return await request({
        endpoint: ENDPOINT.READ.VERIFIED_KEY_LIST,
      })
    },
    select({ data = [] }: { data: string[] }) {
      return data.map((item: string, index) => ({
        key: item,
        short: item.split('-').at(-1),
      }))
    },
  })

  const { mutate: createKey } = useMutation({
    mutationKey: [],
    mutationFn: async function () {
      return await request({
        endpoint: ENDPOINT.CREATE.VERIFIED_KEY,
        method: 'POST',
      })
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        predicate(query) {
          return (query.queryKey.at(0) as string).includes('updater')
        },
      })
    },
  })
  const { mutate: deleteKey } = useMutation({
    mutationKey: [],
    mutationFn: async function (variables: { key: string }) {
      return await request({
        endpoint: ENDPOINT.DELETE.VERIFIED_KEY.replace('{key}', variables.key),
        method: 'DELETE',
      })
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        predicate(query) {
          return (query.queryKey.at(0) as string).includes('updater')
        },
      })
    },
  })

  const translation = {
    'VERIFIED_KEY_LIST.TITLE.VERIFIED_ACCESS_TOKEN': null,
    'VERIFIED_KEY_LIST.BUTTON.CREATE_NEW_KEY': null,
    'STATISTIC_KEY_LIST.LABEL.SAVE': null,
    'STATISTIC_KEY_LIST.LABEL.COPY': null,
    'STATISTIC_KEY_LIST.LABEL.REMOVE_KEY': null,
    'STATISTIC_KEY_LIST.LABEL.KEY': null,
    'STATISTIC_KEY_LIST.TABLE.HEADER.ACTIONS': null,
  }
  // Verified Statistic Access Token
  const { translate } = useTranslation(translation)

  return (
    <VerticalStack>
      {/* <HorizontalStack>List</HorizontalStack> */}
      <HorizontalStack position={'apart'}>
        <Title>
          {translate('VERIFIED_KEY_LIST.TITLE.VERIFIED_ACCESS_TOKEN')}
        </Title>
        <HorizontalStack>
          <Button onClick={() => createKey()}>
            {translate('VERIFIED_KEY_LIST.BUTTON.CREATE_NEW_KEY')}
          </Button>
        </HorizontalStack>
      </HorizontalStack>
      <Divider />
      <Table
        tableData={keyList.map((item) => ({
          ...item,
          key: (
            <HorizontalStack>
              {/* <QRCodeCanvas value={item.key} /> */}
              {/* <HoverCard position={'bottom-start'}>
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
              </HoverCard> */}
              <HorizontalStack>
                <CopyButton value={item.key}>
                  {({ copied, copy }) => (
                    <IconButton
                      label={translate('STATISTIC_KEY_LIST.LABEL.COPY')}
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
                label={translate('STATISTIC_KEY_LIST.LABEL.REMOVE_KEY')}
                color={'red'}
                onClick={() => deleteKey({ key: item.key })}
              >
                <IconTrash />
              </IconButton>
            </HorizontalStack>
          ),
        }))}
        tableHeader={[
          {
            identifier: 'key',
            label: translate('STATISTIC_KEY_LIST.LABEL.KEY'),
            align: 'left',
          },
          {
            identifier: 'actions',
            label: translate('ACCOUNT_LIST_PAGE.TABLE.HEADER.ACTIONS'),
          },
        ]}
      />
    </VerticalStack>
  )
}
