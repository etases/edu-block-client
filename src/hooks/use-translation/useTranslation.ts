import { useTranslation as useI18nTranslation } from 'react-i18next'

interface ITranslationObject {
  [key: string]: null | { [key: string]: string | number | boolean }
}

export function useTranslation(objectToTranslate?: ITranslationObject) {
  const { i18n, t: translate } = useI18nTranslation()

  if (!objectToTranslate) return { i18n, translate }

  const translatedObject: { [key: string]: string | number | null } = {}
  
  const translatedObjectAccountListButtons: { [key: string]: string | number } = {}
  
  const translatedObjectPlaceholder: { [key: string]: string | null } = {}

  Object.entries(objectToTranslate).forEach(
    ([key, keyParams]) =>
      (translatedObject[key] = translate(key, keyParams || undefined))
  )

  return {
    i18n,
    translate,
    translatedObject,
    translatedObjectPlaceholder,
    translatedObjectAccountListButtons,
  }
}

// USAGE navigate to /test
