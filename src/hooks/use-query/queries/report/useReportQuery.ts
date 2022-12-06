// @ts-nocheck
import { ENDPOINT } from '@constants'
import { request, toQueryString } from '@hooks/use-query/core'
import { useQuery } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import * as xlsx from 'xlsx'
import { useClassroomListQuery } from '../classroom-list'

export function useReportQuery() {
  const { classroomId } = useParams()
  const [grade, setGrade] = useState(0)
  const [year, setYear] = useState(0)
  const [subject, setSubject] = useState('')
  const [classification, setClassification] = useState('')

  const queryEndpoint = {
    classification: ENDPOINT.READ.CLASSIFICATION_LIST,
    classroom: ENDPOINT.READ.CLASSROOM_RECORD_LIST.replace(
      '{classroomId}',
      classroomId
    ),
    grade: ENDPOINT.READ.GRADE_RECORD_LIST.replace('{grade}', grade).replace(
      '{year}',
      year
    ),
  }

  const classificationQuery = useQuery({
    queryKey: [queryEndpoint.classification],
    queryFn: async function () {
      return await request({
        endpoint: queryEndpoint.classification,
      })
    },
    select({ data }) {
      return (data as any[])
        .map((classification) => classification.identifier)
        .sort()
    },
    onError(err) {
      notifyError({ message: queryEndpoint.classification })
    },
    onSuccess(data) {
      notifyInformation({
        message: 'Classification list synced',
      })
      // console.log(data)
    },
  })
  const classroomRecordQuery = useQuery({
    enabled: !!classroomId,
    queryKey: [queryEndpoint.classroom],
    queryFn: async function () {
      return await request({
        endpoint:
          queryEndpoint.classroom +
          toQueryString({
            generateClassification: true,
            fillAllSubjects: true,
          }),
      })
    },
    select({ data }) {
      return data.map(
        ({
          classification,
          entries,
          classroom: { homeroomTeacher, ...classroom },
          student: { account: student, profile },
        }) => ({
          student: { ...profile, ...student },
          classroom,
          classification: {
            firstHalf: classification.firstHalfClassify.identifier,
            secondHalf: classification.secondHalfClassify.identifier,
            final: classification.finalClassify.identifier,
          },
          entries: entries
            .sort((a, b) => Number(b.approvalDate) - Number(a.approvalDate))
            .sort((a, b) => Number(a.subjectId) - Number(b.subjectId))
            .filter(
              (item, index, all) =>
                all.at(index - 1)?.subjectId !== item.subjectId
            ),
        })
      )
    },
    onError(err) {
      notifyError({
        message: queryEndpoint.classroom,
      })
    },
    onSuccess(data) {
      notifyInformation({ message: 'Classroom records synced' })
      // console.log(data)
    },
  })
  const gradeRecordQuery = useQuery({
    enabled: !!grade && !!year,
    queryKey: [queryEndpoint.grade],
    queryFn: async function () {
      return await request({
        endpoint:
          queryEndpoint.grade +
          toQueryString({
            generateClassification: true,
            fillAllSubjects: true,
          }),
      })
    },
    select({ data }) {
      return data.map(
        ({
          classification,
          entries,
          classroom: { homeroomTeacher, ...classroom },
          student: { account: student, profile },
        }) => ({
          student: { ...profile, ...student },
          classroom,
          classification: {
            firstHalf: classification.firstHalfClassify.identifier,
            secondHalf: classification.secondHalfClassify.identifier,
            final: classification.finalClassify.identifier,
          },
          entries: entries
            .sort((a, b) => Number(b.approvalDate) - Number(a.approvalDate))
            .sort((a, b) => Number(a.subjectId) - Number(b.subjectId))
            .filter(
              (item, index, all) =>
                all.at(index - 1)?.subjectId !== item.subjectId
            ),
        })
      )
    },
    onError(err) {
      notifyError({ message: queryEndpoint.grade })
    },
    onSuccess(data) {
      notifyInformation({ message: 'Grade records synced' })
      // console.log(data)
    },
  })
  const {
    query: classroomListQuery,
    state: { search },
  } = useClassroomListQuery()

  return {
    query: {
      classificationQuery,
      classroomRecordQuery,
      gradeRecordQuery,
      classroomListQuery,
    },
    state: {
      grade: {
        grade,
        setGrade,
      },
      year: {
        year,
        setYear,
      },
      classification: {
        classification,
        setClassification,
      },
      search,
    },
    utils: {
      generateGradeReport: () =>
        gradeReport({
          year,
          grade,
          data: gradeRecordQuery.data,
        }),
      generateClassificationReport: () =>
        classificationReport({
          classifications: classificationQuery.data,
          data: gradeRecordQuery.data,
          grade,
          year,
        }),
      generateClassroomReport: (classroomName) =>
        classroomReport({
          classroomName,
          data: classroomRecordQuery.data,
        }),
      generateSubjectReport: (subjectName) =>
        subjectReport({
          subjectName,
        }),
    },
  }
}

function subjectReport({ data, subjectName, classroomName }) {
  if (!data) return

  const subjectWb = xlsx.utils.book_new()

  const jsonData = {}

  const subjectWs = xlsx.utils.json_to_sheet(jsonData)

  xlsx.utils.book_append_sheet(subjectWb, subjectWs)

  xlsx.writeFileXLSX(
    subjectWb,
    ['subjectReport', subjectName].join('_') + '.xlsx'
  )
}
function classroomReport({ data, classroomName }) {
  if (!data) return

  const classroomWb = xlsx.utils.book_new()

  const jsonData = (data as any[]).map(({ student, entries }) => {
    return {
      Student: [student.firstName, student.lastName].join(' '),
      ...(entries as any[]).reduce(
        (result, current) => ({
          ...result,
          [current.subject.identifier]: [
            current.firstHalfScore,
            current.secondHalfScore,
            current.finalScore,
          ]
            .map((score) => Number(score).toFixed(2))
            .join('|'),
        }),
        {}
      ),
    }
  })

  console.table(jsonData)

  const classroomWs = xlsx.utils.json_to_sheet(jsonData)

  xlsx.utils.book_append_sheet(classroomWb, classroomWs)

  xlsx.writeFileXLSX(
    classroomWb,
    ['classroomReport', classroomName].join('_') + '.xlsx'
  )
}

function classificationReport({ classifications, grade, year, data }) {
  if (!data || !classifications) return

  const classificationWb = xlsx.utils.book_new()

  const jsonData = (classifications as string[]).map((classification) => {
    const firstHalfCount = data.filter(
      ({ classification: c }) => c.firstHalf === classification
    ).length
    const secondHalfCount = data.filter(
      ({ classification: c }) => c.secondHalf === classification
    ).length
    const finalCount = data.filter(
      ({ classification: c }) => c.final === classification
    ).length
    return {
      Type: classification,
      'First half': firstHalfCount,
      'Second half': secondHalfCount,
      Final: finalCount,
    }
  })

  const classificationWs = xlsx.utils.json_to_sheet(jsonData)

  xlsx.utils.book_append_sheet(classificationWb, classificationWs)

  xlsx.writeFileXLSX(
    classificationWb,
    ['classificationReport', grade, year].join('_') + '.xlsx'
  )
}

function gradeReport({ year, grade, data }) {
  if (!data) return

  const jsonData = data.map(({ student, classroom, classification }) => ({
    Student: [student.firstName, student.lastName].join(' '),
    Classroom: classroom.name,
    'First half': classification.firstHalf,
    'Second half': classification.secondHalf,
    Final: classification.final,
  }))

  const gradeReportWb = xlsx.utils.book_new()

  const gradeReportWs = xlsx.utils.json_to_sheet(jsonData)

  xlsx.utils.book_append_sheet(gradeReportWb, gradeReportWs)

  xlsx.writeFileXLSX(
    gradeReportWb,
    ['gradeReport', grade, year].join('_') + '.xlsx'
  )
}
