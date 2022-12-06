import {
  Badge,
  HorizontalStack,
  SelectInput,
  Table,
  VerticalStack,
} from '@components'
import { request } from '@hooks/use-query'
import { Divider, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { dayjs, notifyError, notifyInformation } from '@utilities/functions'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export function History() {
  const { accountId } = useParams()
  const [selectedTime, setSelectedTime] = useState<string | null>()
  const [classroomList, setClassroomList] = useState<string[]>([])
  const [selectedClassroom, setSelectedClassroom] = useState<string | null>('')

  const endpoint = `/updater/${accountId}/history`

  const { data } = useQuery({
    queryKey: [endpoint],
    queryFn: async function () {
      return await request({
        endpoint,
      })
    },
    select({ data }: { data: any[] }) {
      const result = {
        timestamps: data.map((item, index) => ({
          value: index.toString(),
          label: dayjs(item.timestamp).format('LL'),
        })),
        updatedBy: data.map((item) => item.updatedBy),
        records: data.map(({ record, timestamp }, index) =>
          record.reduce(
            (prev: any, { classroom, ...rest }: any) => ({
              ...prev,
              [classroom.name]: rest,
            }),
            {} as any
          )
        ),
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
        <HorizontalStack align={'baseline'}>
          <Title>History</Title>
          <Badge>Updated by: {data?.updatedBy.at(Number(selectedTime))}</Badge>
        </HorizontalStack>
        <HorizontalStack>
          <SelectInput
            data={classroomList || []}
            value={selectedClassroom}
            onChange={(value) => setSelectedClassroom(value)}
            placeholder={'Classroom'}
          />
          <SelectInput
            data={data?.timestamps.reverse() || []}
            value={selectedTime}
            onChange={(value) => {
              setSelectedTime(value)
              setClassroomList(Object.keys(data?.records.at(Number(value))))
            }}
            placeholder={'Time'}
          />
        </HorizontalStack>
      </HorizontalStack>
      <Divider />
      <VerticalStack>
        <HorizontalStack position={'right'}>
          <Title order={2}>Records</Title>
        </HorizontalStack>
        <Divider />
        <Table
          tableHeader={[
            {
              identifier: 'subjectName',
              label: 'Subject Name',
            },
            {
              identifier: 'firstHalfScore',
              label: 'First Half',
            },
            {
              identifier: 'secondHalfScore',
              label: 'Second Half',
            },
            {
              identifier: 'finalScore',
              label: 'Final',
            },
            {
              identifier: 'approvalDate',
              label: 'Approval Date',
            },
          ]}
          tableData={
            (
              data?.records[Number(selectedTime)]?.[selectedClassroom || '']
                ?.entries as any[]
            )?.map((item, index) => ({
              ...item,
              subjectName: item.subject.identifier,
              approvalDate: dayjs(item.approvalDate).format('LL'),
            })) as any[]
          }
        />
        <Divider />
        <HorizontalStack position={'right'}>
          <Title order={2}>Classification</Title>
        </HorizontalStack>
        <Divider />
        <Table
          tableHeader={[
            {
              identifier: 'firstHalfClassify',
              label: 'First Half',
            },
            {
              identifier: 'secondHalfClassify',
              label: 'Second Half',
            },
            {
              identifier: 'finalClassify',
              label: 'Final',
            },
          ]}
          tableData={[
            Object.entries(
              (data?.records[Number(selectedTime)]?.[selectedClassroom || '']
                ?.classification as any) || {}
            ).reduce(
              (result, [key, value]) => ({
                ...result,
                [key]: (value as any).identifier,
              }),
              {} as any
            ),
          ]}
        />
      </VerticalStack>
    </VerticalStack>
  )
}
