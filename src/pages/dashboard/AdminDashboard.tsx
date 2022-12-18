/// <reference types="vite-plugin-svgr/client" />
import { ReactComponent as PersonSvg } from '@assets/person-head-scarf-beard.svg'
import { ReactComponent as BoardSvg } from '@assets/scrum-board.svg'
import {
  Button,
  HorizontalStack,
  SelectInput,
  VerticalStack,
} from '@components'
import { ENDPOINT } from '@constants'
import { request, semesterNameList, useReportQuery } from '@hooks/use-query'
import { useTranslation } from '@hooks/use-translation'
import { Card, Divider, Flex, Text, Title } from '@mantine/core'
import { IconDownload, IconDownloadOff } from '@tabler/icons'
import { useQueries, useQuery } from '@tanstack/react-query'
import { dayjs } from '@utilities/functions'
import Plot from 'react-plotly.js'

const translation = {
  'ADMIN_PAGE.SIDEBAR.DASHBOARD': null,
  'ADMIN_PAGE.SIDEBAR.ACCOUNT': null,
  'ADMIN_PAGE.SIDEBAR.CLASSROOM': null,
  'ADMIN_PAGE.DASHBOARD.TITLE': null,
  'ADMIN_PAGE.DASHBOARD.TEACHER': null,
  'ADMIN_PAGE.DASHBOARD.STUDENT': null,
  'ADMIN_PAGE.DASHBOARD.CLASSROOM': null,
  'ADMIN_PAGE.DASHBOARD.GET_GRADE': null,
  'ADMIN_PAGE.DASHBOARD.GET_CLASSIFICATION': null,
  'ADMIN_PAGE.DASHBOARD.YEAR': null,
  'ADMIN_PAGE.DASHBOARD.GRADE': null,
  firstHalf: null,
  secondHalf: null,
  final: null,
}

export function AdminDashboard() {
  const { translatedObject } = useTranslation(translation)

  const {
    query: { gradeRecordQuery, classificationQuery },
    state,
    utils,
  } = useReportQuery()
  const accountsCountQueries = useQueries({
    queries: [
      {
        queryKey: [
          ENDPOINT.READ.ACCOUNT_LIST_BY_ROLE.replace('{role}', 'admin'),
        ],
        queryFn: async function () {
          return await request({
            endpoint: ENDPOINT.READ.ACCOUNT_LIST_BY_ROLE.replace(
              '{role}',
              'admin'
            ),
          })
        },
        select({ pageInfo: { totalEntries } }: any) {
          return totalEntries
        },
      },
      {
        queryKey: [
          ENDPOINT.READ.ACCOUNT_LIST_BY_ROLE.replace('{role}', 'staff'),
        ],
        queryFn: async function () {
          return await request({
            endpoint: ENDPOINT.READ.ACCOUNT_LIST_BY_ROLE.replace(
              '{role}',
              'staff'
            ),
          })
        },
        select({ pageInfo: { totalEntries } }: any) {
          return totalEntries
        },
      },
      {
        queryKey: [
          ENDPOINT.READ.ACCOUNT_LIST_BY_ROLE.replace('{role}', 'teacher'),
        ],
        queryFn: async function () {
          return await request({
            endpoint: ENDPOINT.READ.ACCOUNT_LIST_BY_ROLE.replace(
              '{role}',
              'teacher'
            ),
          })
        },
        select({ pageInfo: { totalEntries } }: any) {
          return totalEntries
        },
      },
      {
        queryKey: [
          ENDPOINT.READ.ACCOUNT_LIST_BY_ROLE.replace('{role}', 'student'),
        ],
        queryFn: async function () {
          return await request({
            endpoint: ENDPOINT.READ.ACCOUNT_LIST_BY_ROLE.replace(
              '{role}',
              'student'
            ),
          })
        },
        select({ pageInfo: { totalEntries } }: any) {
          return totalEntries
        },
      },
    ],
  })

  const classroomsCountQuery = useQuery({
    queryKey: [ENDPOINT.READ.CLASSROOM_LIST],
    queryFn: async function () {
      return await request({
        endpoint: ENDPOINT.READ.CLASSROOM_LIST,
      })
    },
    select({ pageInfo }) {
      return pageInfo.totalEntries
    },
  })

  const chartData = utils.generateClassificationReport('table')

  return (
    <VerticalStack>
      <HorizontalStack>
        <Title>{translatedObject?.['ADMIN_PAGE.DASHBOARD.TITLE']}</Title>
      </HorizontalStack>
      <Divider />
      <HorizontalStack grow={true}>
        <SelectInput
          data={Array.from(Array(10), (v, k) => k).map((item, index) => {
            const year = dayjs()
              .subtract(9 - index, 'year')
              .year()
              .toString()
            return {
              value: year,
              label: year,
            }
          })}
          placeholder={translatedObject?.[
            'ADMIN_PAGE.DASHBOARD.YEAR'
          ]?.toString()}
          value={state.year.year.toString()}
          onChange={(value) => state.year.setYear(Number(value))}
        />
        <SelectInput
          data={Array.from(Array(12), (v, k) => k + 1).map((grade) => ({
            value: grade.toString(),
            label: ['Grade', grade].join(' '),
          }))}
          placeholder={translatedObject?.[
            'ADMIN_PAGE.DASHBOARD.GRADE'
          ]?.toString()}
          value={state.grade.grade.toString()}
          onChange={(value) => state.grade.setGrade(Number(value))}
        />
        <Button
          onClick={() => utils.generateGradeReport('file')}
          leftIcon={
            gradeRecordQuery.data?.length > 0 ? (
              <IconDownload />
            ) : (
              <IconDownloadOff />
            )
          }
          disabled={gradeRecordQuery.data?.length === 0}
        >
          {translatedObject?.['ADMIN_PAGE.DASHBOARD.GET_GRADE']}
        </Button>
        <Button
          disabled={gradeRecordQuery.data?.length === 0}
          onClick={() => utils.generateClassificationReport('file')}
          leftIcon={
            gradeRecordQuery.data?.length > 0 ? (
              <IconDownload />
            ) : (
              <IconDownloadOff />
            )
          }
        >
          {translatedObject?.['ADMIN_PAGE.DASHBOARD.GET_CLASSIFICATION']}
        </Button>
      </HorizontalStack>
      <Divider />
      <HorizontalStack grow={true}>
        <Card radius={'md'}>
          <Card.Section>
            <HorizontalStack
              position={'center'}
              w={'100%'}
            >
              <PersonSvg height={250} />
            </HorizontalStack>
          </Card.Section>
          <Flex
            gap={'md'}
            align={'center'}
            justify={'center'}
            wrap={'wrap'}
          >
            {[
              { color: 'red', label: 'Admin|' },
              { color: 'orange', label: 'Staff|' },
              {
                color: 'blue',
                label: `${translatedObject?.['ADMIN_PAGE.DASHBOARD.TEACHER']}|`,
              },
              {
                color: 'grape',
                label: `${translatedObject?.['ADMIN_PAGE.DASHBOARD.STUDENT']}|`,
              },
            ].map(({ color, label }, index) => (
              <Button
                key={index}
                color={color}
              >
                <Text>{label}</Text>
                <Text>{accountsCountQueries[index].data}</Text>
              </Button>
            ))}
          </Flex>
        </Card>
        <Card radius={'md'}>
          <Card.Section>
            <HorizontalStack
              w={'100%'}
              position={'center'}
            >
              <BoardSvg height={250} />
            </HorizontalStack>
          </Card.Section>
          <HorizontalStack position={'center'}>
            <Button>
              <Text>
                {translatedObject?.['ADMIN_PAGE.DASHBOARD.CLASSROOM']}|
              </Text>
              <Text>{classroomsCountQuery.data}</Text>
            </Button>
          </HorizontalStack>
        </Card>
      </HorizontalStack>

      <VerticalStack>
        {classificationQuery?.data && (
          <>
            <Plot
              data={semesterNameList.map((semesterName) => ({
                r: (chartData as any[])?.map(
                  (classification: any) =>
                    classification[translatedObject?.[semesterName] as string]
                ),
                theta: [
                  ...(classificationQuery?.data as any),
                  (classificationQuery?.data as any)?.at(0),
                ],
                name: translatedObject?.[semesterName]?.toString(),
                type: 'scatterpolar',
              }))}
              layout={{}}
            />
            <Plot
              data={semesterNameList.map((semesterName) => ({
                x: (chartData as any[])?.map(
                  ({ classification }: any) => classification
                ),
                y: (chartData as any[])?.map(
                  (classification: any) =>
                    classification[translatedObject?.[semesterName] as string]
                ),
                name: translatedObject?.[semesterName]?.toString(),
                type: 'bar',
              }))}
              layout={{}}
            />
          </>
        )}
      </VerticalStack>
    </VerticalStack>
  )
}
