import { HorizontalStack, VerticalStack } from '@components'
import { Box, Table as MTable, Text } from '@mantine/core'
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
}

export function Table<TIdentifier extends string | number>(
  props: TableProps<TIdentifier>
) {
  const { tableHeader, tableData, heat } = props

  return (
    <MTable
      fontSize={'sm'}
      // verticalSpacing={'md'}
      // horizontalSpacing={'md'}
      striped={true}
      highlightOnHover={true}
      // withBorder={true}
      // withColumnBorders={true}
      sx={{
        minWidth: 720,
      }}
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
  )
}
