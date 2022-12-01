import { Badge, HorizontalStack, SelectInput, VerticalStack } from '@components'
import { request } from '@hooks/use-query'
import { Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { dayjs, notifyError, notifyInformation } from '@utilities/functions'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export function History() {
  const { accountId } = useParams()
  const [selectedTime, setSelectedTime] = useState<string | null>()
  const endpoint = `/updater/${accountId}/history`

  const { data } = useQuery({
    queryKey: [endpoint],
    queryFn: async function () {
      return await request({
        endpoint,
      })
    },
    select(data) {
      const { data: unFormattedData } = data
      const dataArray = unFormattedData as Array<any>

      const result = {
        timestamps: dataArray.map((item, index) => ({
          value: index.toString(),
          label: dayjs(item.timestamp).format('LLLL'),
        })),
        updatedBy: dataArray.map((item) => item.updatedBy),
      }

      return result
    },
    onError(err) {
      notifyError({ message: endpoint })
    },
    onSuccess(data) {
      notifyInformation({ message: 'History synced' })
    },
  })

  return (
    <VerticalStack>
      <HorizontalStack position={'apart'}>
        <Title>History</Title>
        <Badge>Updated by: {data?.updatedBy.at(Number(selectedTime))}</Badge>
        <SelectInput
          data={data?.timestamps || []}
          value={selectedTime}
          onChange={(value) => setSelectedTime(value)}
        />
      </HorizontalStack>
      <VerticalStack>
        <HorizontalStack></HorizontalStack>
      </VerticalStack>
    </VerticalStack>
  )
}
