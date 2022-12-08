import { HorizontalStack, VerticalStack } from '@components'
import {
  Box,
  ScrollArea,
  Table as MTable,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { generateGradientValue } from '@utilities/functions'
import { ReactNode } from 'react'

const ALIGN = {
  left: 'left',
  right: 'right',
  center: 'center',
}

export interface TableHeaderProps<TIdentifier> {
  identifier: TIdentifier
  label: string
  icon?: ReactNode
  align?: keyof typeof ALIGN
  width?: string | number
}

interface TableProps<TIdentifier extends string | number> {
  tableHeader: TableHeaderProps<TIdentifier>[]
  tableData: {
    [key in TIdentifier]: ReactNode | string | number | boolean | null
  }[]
  heat?: boolean
  separator?: {
    v?: boolean
    h?: boolean
  }
  border?: boolean
}

export function Table<TIdentifier extends string | number>(
  props: TableProps<TIdentifier>
) {
  const { tableHeader, tableData, heat, separator, border } = props

  const { spacing } = useMantineTheme()

  return (
    <ScrollArea
      sx={{ maxWidth: `calc(100vw - ${spacing.md * 2}px)`, minHeight: '50vh' }}
    >
      <MTable
        fontSize={'sm'}
        // verticalSpacing={'md'}
        // horizontalSpacing={'md'}
        striped={true}
        highlightOnHover={true}
        // withBorder={true}
        sx={{
          minWidth: 720,
        }}
        withColumnBorders={separator?.v}
        withBorder={border}
      >
        <thead>
          <tr>
            {tableHeader.map(({ label, identifier, ...rest }, index) => (
              <td
                key={`thead__${identifier.toString()}__${index}`}
                width={rest.width || 'auto'}
              >
                <VerticalStack
                  align={(rest.align && ALIGN[rest.align]) || 'center'}
                  px={'xs'}
                  pb={'md'}
                >
                  <HorizontalStack>
                    <Box>
                      <Text
                        transform={'capitalize'}
                        weight={'bold'}
                      >
                        {label}
                      </Text>
                    </Box>
                    {rest.icon && <Box>{rest.icon}</Box>}
                  </HorizontalStack>
                  {/* <Box>({index})</Box> */}
                </VerticalStack>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, index, all) => (
            <tr
              key={`tbody__${index}`}
              style={{
                backgroundColor: heat
                  ? `rgb(${generateGradientValue(
                      {
                        red: 0,
                        green: 255,
                        blue: 127,
                      },
                      {
                        red: 255,
                        green: 99,
                        blue: 71,
                      },
                      all.length,
                      index
                    ).join(',')})`
                  : '',
              }}
            >
              {tableHeader.map(({ identifier, ...rest }) => (
                <td
                  key={`trow__${identifier.toString()}__${index}`}
                  width={rest.width || 'auto'}
                >
                  <HorizontalStack position={rest.align || 'center'}>
                    {typeof row[identifier] === 'object' ? (
                      row[identifier] || null
                    ) : (
                      <Text align={rest.align || 'center'}>
                        {row[identifier]}
                      </Text>
                    )}
                  </HorizontalStack>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </MTable>
    </ScrollArea>
  )
}
