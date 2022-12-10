// @ts-nocheck
import { ENDPOINT } from '@constants'
import { request, toQueryString } from '@hooks/use-query/core'
import { useAccountStore } from '@hooks/use-store'
import { useQuery } from '@tanstack/react-query'
import { dayjs, notifyError, notifyInformation } from '@utilities/functions'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import * as xlsx from 'xlsx'
import { useClassroomListQuery } from '../classroom-list'

export const semesterNameList = ['firstHalf', 'secondHalf', 'final']

export function useReportQuery() {
  const { account } = useAccountStore()
  const { classroomId } = useParams()
  const [grade, setGrade] = useState(0)
  const [year, setYear] = useState(0)
  const [subject, setSubject] = useState('')
  const [classification, setClassification] = useState('')

  const queryEndpoint = {
    classification: ENDPOINT.READ.CLASSIFICATION_LIST,
    subject: ENDPOINT.READ.SUBJECT_LIST,
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

  const subjectQuery = useQuery({
    queryKey: [queryEndpoint.subject],
    queryFn: async function () {
      return await request({
        endpoint: queryEndpoint.subject,
      })
    },
    select({ data }) {
      return data.map((item) => item.identifier).sort()
    },
    onSuccess(data) {
      // console.log(data)
    },
  })

  const classroomRecordQuery = useQuery({
    enabled: !!classroomId && account.role !== 'STUDENT',
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
      return transformApiModel(data)
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
    enabled: !!grade && !!year && account.role !== 'STUDENT',
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
      return transformApiModel(data)
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
      generateGradeReport: (returnType) =>
        gradeReport({
          year,
          grade,
          semesterNameList: semesterNameList,
          data: gradeRecordQuery.data,
          returnType,
        }),
      generateClassificationReport: (returnType) =>
        classificationReport({
          classificationNameList: classificationQuery.data,
          semesterNameList: semesterNameList,
          data: gradeRecordQuery.data,
          grade,
          year,
          returnType,
        }),
      generateSubjectReport: (classroomName, returnType) =>
        subjectReport({
          classroomName,
          data: classroomRecordQuery.data,
          subjectNameList: subjectQuery.data,
          returnType,
        }),
      generateSemesterReport: (classroomName, returnType) =>
        semesterReport({
          data: classroomRecordQuery.data,
          semesterNameList: semesterNameList,
          classroomName,
          returnType,
        }),
    },
  }
}

function transformApiModel(data) {
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
        .filter(
          (item, index, all) => all.at(index - 1).subjectId !== item.subjectId
        )
        .reduce(
          (result, { subjectName, subjectId, approvalDate, ...record }) => ({
            ...result,
            [subjectName]: Object.entries(record).reduce(
              (result, [name, value]) => ({
                ...result,
                [name]: Number(value).toFixed(2),
              }),
              {}
            ),
          }),
          {}
        ),
    })
  )
}

function subjectReport({ data, subjectNameList, classroomName, returnType }) {
  if (!data || !subjectNameList) return

  const formattedData = subjectNameList.reduce(
    (result, subjectName) => ({
      ...result,
      [subjectName]: data.map(
        ({ classroom, classification, student, ...subject }) => ({
          studentName: [student.firstName, student.lastName].join(' '),
          ...subject[subjectName],
        })
      ),
    }),
    {}
  )

  if (typeof returnType === 'undefined' || returnType !== 'file') {
    return formattedData
  }

  const subjectWb = xlsx.utils.book_new()

  Object.entries(formattedData).forEach(([subjectName, subjectData]) => {
    xlsx.utils.book_append_sheet(
      subjectWb,
      xlsx.utils.json_to_sheet(subjectData),
      subjectName
    )
  })

  xlsx.writeFileXLSX(
    subjectWb,
    ['subjectReport', classroomName, dayjs().toISOString()].join('_') + '.xlsx'
  )
}

function semesterReport({ data, semesterNameList, classroomName, returnType }) {
  if (!data) return

  const formattedData = semesterNameList.reduce(
    (result, semesterName) => ({
      ...result,
      [semesterName]: data.map(
        ({ classroom, classification, student, ...subjects }) => ({
          studentName: [student.firstName, student.lastName].join(' '),
          ...Object.entries(subjects).reduce(
            (result, [subjectName, subjectData]) => ({
              ...result,
              [subjectName]: subjectData[semesterName],
            }),
            {}
          ),
        })
      ),
    }),
    {}
  )

  if (typeof returnType === 'undefined' || returnType !== 'file')
    return formattedData

  const semesterWb = xlsx.utils.book_new()

  Object.entries(formattedData).forEach(([semesterName, semesterData]) => {
    xlsx.utils.book_append_sheet(
      semesterWb,
      xlsx.utils.json_to_sheet(semesterData),
      semesterName
    )
  })

  xlsx.writeFileXLSX(
    semesterWb,
    ['semesterReport', classroomName, dayjs().toISOString()].join('_') + '.xlsx'
  )
}

function classificationReport({
  classificationNameList,
  semesterNameList,
  grade,
  year,
  data,
  returnType,
}) {
  if (!data || !classificationNameList || !grade || !year) return

  const formattedData = classificationNameList.map((classification) => ({
    classification,
    ...semesterNameList.reduce(
      (result, semesterName) => ({
        ...result,
        [semesterName]: data.filter(
          ({ classification: c }) => c[semesterName] === classification
        ).length,
      }),
      {}
    ),
  }))

  if (typeof returnType === 'undefined' || returnType !== 'file')
    return formattedData

  const classificationWb = xlsx.utils.book_new()

  const classificationWs = xlsx.utils.json_to_sheet(formattedData)

  xlsx.utils.book_append_sheet(classificationWb, classificationWs)

  xlsx.writeFileXLSX(
    classificationWb,
    ['classificationReport', grade, year].join('_') + '.xlsx'
  )
}

function gradeReport({ year, grade, semesterNameList, data, returnType }) {
  if (!data || !year || !grade) return

  const formattedData = data.map(({ student, classroom, classification }) => ({
    studentName: [student.firstName, student.lastName].join(' '),
    classroomName: classroom.name,
    ...semesterNameList.reduce(
      (result, semesterName) => ({
        ...result,
        [semesterName]: classification[semesterName],
      }),
      {}
    ),
  }))

  if (typeof returnType === 'undefined' || returnType !== 'file')
    return formattedData

  const gradeReportWb = xlsx.utils.book_new()

  const gradeReportWs = xlsx.utils.json_to_sheet(formattedData)

  xlsx.utils.book_append_sheet(gradeReportWb, gradeReportWs)

  xlsx.writeFileXLSX(
    gradeReportWb,
    ['gradeReport', grade, year].join('_') + '.xlsx'
  )
}
