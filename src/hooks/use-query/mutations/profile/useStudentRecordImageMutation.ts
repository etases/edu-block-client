import { API } from '@constants'
import { useSubjectQuery } from '@hooks/use-query/queries'
import { useMutation } from '@tanstack/react-query'
import { notifyError, notifyInformation } from '@utilities/functions'
// @ts-ignore
import stringSimilarity from 'string-similarity'
import { useTranslation } from '@hooks/use-translation'

const translation = {
  'MUTATION.PROFILE.USE_STUDENT_RECORD_SOMETHING_WENT_WRONG': null,
  'MUTATION.PROFILE.USE_STUDENT_RECORD_IMAGE_SCANNED': null,
}

const { translate } = useTranslation(translation)

export function useStudentRecordImageMutation() {
  const {
    query: { data: subjectsData },
  } = useSubjectQuery()

  const mutation = useMutation({
    mutationKey: [],
    mutationFn: async function (formData: FormData) {
      return await fetch(API.OCR_URL + '/images', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((dataRaw) =>
          (dataRaw as Array<string>).map((item) => item.split(','))
        )
        .then((data) => {
          const subjects = (subjectsData || []).map(
            ({ id, identifier, name, otherNames }) => ({
              id,
              identifier,
              name: [name, ...otherNames],
            })
          )

          const possibleMatch = subjects.map(({ name }) => name)

          return data.map(([key, ...values]) => {
            const matchedSubject = matcherWithDiceAlgo(
              key,
              possibleMatch,
              subjects
            )
            return [
              matchedSubject.id,
              key,
              ...values,
              // matchedSubject.identifier,
              // matchedSubject.name.join(),
            ]
          })
        })
    },
    onError(error, variables, context) {
      notifyError({
        message: translate("MUTATION.PROFILE.USE_STUDENT_RECORD_SOMETHING_WENT_WRONG"),
      })
    },
    onSuccess(data, variables, context) {
      notifyInformation({ message: translate("MUTATION.PROFILE.USE_STUDENT_RECORD_IMAGE_SCANNED") })
    },
  })

  return { mutation }
}

function matcherWithDiceAlgo(
  value: string,
  possibleMatch: string[][],
  subjects: any[],
  callback?: (value: any) => void
) {
  const testValue = value

  const bestMatch = (possibleMatch as Array<any>).reduce(
    (result, currentSuit) => {
      const matchResult = stringSimilarity.findBestMatch(
        (testValue as string).toLowerCase(),
        (currentSuit as Array<string>).map((item) => item.toLowerCase())
      )

      return result?.rating < matchResult.bestMatch.rating
        ? matchResult.bestMatch
        : result
    },
    { rating: 0 }
  )

  const foundedSubject = subjects.find((item) =>
    (item.name as Array<string>).some((i) =>
      i.toLowerCase().includes(bestMatch.target)
    )
  )

  if (typeof callback === 'function') callback(foundedSubject)
  return foundedSubject
}
