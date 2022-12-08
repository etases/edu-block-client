// @ts-nocheck
import { Button, HorizontalStack, Table, VerticalStack } from '@components'
import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query'
import { SegmentedControl, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import * as xlsx from 'xlsx'

const semesterList = ['firstHalf', 'secondHalf', 'final']

export function VerifiedList() {
  const { key: verifiedKey = '' } = useParams()
  const [tableData, setTableData] = useState<any>({})
  const [selectedSemester, setSelectedSemester] = useState(semesterList.at(0))

  const endpoint = ENDPOINT.READ.VERIFIED_RECORD_LIST.replace(
    '{key}',
    verifiedKey
  )
  const verifiedRecordQuery = useQuery({
    queryKey: [endpoint],
    queryFn: async function () {
      return await request({
        endpoint,
      })
    },
    select({ data }) {
      return data.map(
        ({
          classroom: { homeroomTeacher, ...classroom },
          classification: {
            firstHalfClassify: { identifier: firstHalf },
            secondHalfClassify: { identifier: secondHalf },
            finalClassify: { identifier: final },
          },
          student: { profile },
          entries,
        }) => ({
          classroom,
          classification: {
            firstHalf: firstHalf,
            secondHalf: secondHalf,
            final: final,
          },
          student: profile,
          ...entries
            .map(
              ({
                subjectId,
                subject: { identifier: subjectName },
                firstHalfScore,
                secondHalfScore,
                finalScore,
                approvalDate,
              }) => ({
                subjectId,
                subjectName,
                firstHalf: firstHalfScore,
                secondHalf: secondHalfScore,
                final: finalScore,
                approvalDate,
              })
            )
            .sort((a, b) => Number(b.approvalDate) - Number(a.approvalDate))
            .sort((a, b) => a.subjectId - b.subjectId)
            // .filter(
            //   (item, index, all) =>
            //     all.at(index - 1).subjectId !== item.subjectId
            // )
            .reduce(
              (result, { subjectName, subjectId, ...record }) => ({
                ...result,
                [subjectName]: {
                  ...result[subjectName],
                  ...record,
                },
              }),
              {}
            ),
        })
      )
    },
    onError(err) {
      notifyError({ message: endpoint })
    },
    onSuccess(data) {
      notifyInformation({ message: 'Verified records synced' })
    },
    onSettled(data, error) {
      if (error) return

      setTableData(() =>
        semesterList.reduce(
          (semester, currentSemester) => ({
            ...semester,
            [currentSemester]: data.map(
              ({
                student: { firstName = '', lastName = '' },
                classroom: { name: classroomName, grade, year },
                classification,
                ...subjects
              }) => ({
                studentName: [firstName, lastName].join(' '),
                classroomName,
                grade,
                year,
                ...Object.keys(subjects).reduce(
                  (result, current) => ({
                    ...result,
                    [current]: Number(
                      subjects[current]?.[currentSemester]
                    ).toFixed(2),
                  }),
                  {}
                ),
              })
            ),
          }),
          {}
        )
      )
    },
  })

  const subjectQuery = useQuery({
    queryKey: [ENDPOINT.READ.SUBJECT_LIST],
    queryFn: async function () {
      return await request({
        endpoint: ENDPOINT.READ.SUBJECT_LIST,
      })
    },
    select({ data }) {
      return data.map((item) => item.identifier)
    },
    onError(err) {
      notifyError({ message: ENDPOINT.READ.SUBJECT_LIST })
    },
    onSuccess(data) {
      notifyInformation({ message: 'Subject list synced' })
    },
  })

  return (
    <VerticalStack>
      <HorizontalStack grow={true}>
        <Title>Veridfied Records</Title>
        <SegmentedControl
          data={[
            {
              label: 'First semester',
              value: 'firstHalf',
            },
            {
              label: 'Second semester',
              value: 'secondHalf',
            },
            {
              label: 'Final result',
              value: 'final',
            },
          ]}
          value={selectedSemester}
          onChange={setSelectedSemester}
        />
        <HorizontalStack position={'right'}>
          <Button
            onClick={() => downloadData({ data: tableData, key: verifiedKey })}
          >
            Download
          </Button>
        </HorizontalStack>
      </HorizontalStack>
      <Table
        separator={{ v: true }}
        border={true}
        tableHeader={[
          {
            identifier: 'studentName',
            label: 'Student name',
          },
          {
            identifier: 'classroomName',
            label: 'Classroom name',
          },
          {
            identifier: 'grade',
            label: 'Grade',
          },
          {
            identifier: 'year',
            label: 'Year',
          },
          ...(subjectQuery.data
            ? subjectQuery.data?.map((subject) => ({
                identifier: subject,
                label: subject,
              }))
            : []),
        ]}
        tableData={tableData?.[selectedSemester]}
      />
    </VerticalStack>
  )
}

function downloadData({ data, key }) {
  const dataWorkbook = xlsx.utils.book_new()

  Object.entries(data || {}).forEach(([sheetName, sheetData]) => {
    xlsx.utils.book_append_sheet(
      dataWorkbook,
      xlsx.utils.json_to_sheet(sheetData),
      sheetName
    )
  })

  xlsx.writeFileXLSX(dataWorkbook, ['verifiedRecord', key].join('_') + '.xlsx')
}
