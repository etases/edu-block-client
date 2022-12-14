import { useTitleStore } from '@hooks/use-store'
import { useTranslation } from '@hooks/use-translation'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PAGE_TITLE = 'Home'

const translations = {
  "HOME_PAGE.SLOGAN": null,
  "HOME_PAGE.SLOGAN1": null,
  "HOME_PAGE.BUTTON.GET_STARTED": null,
  "HOME_PAGE.BUTTON.STUDENT": null,
  "HOME_PAGE.BUTTON.GRADE": null,
  "HOME_PAGE.TITLE": null,
}

export function useHomePage() {
  const navigate = useNavigate()

  const { setTitle } = useTitleStore()

  const {translatedObject } = useTranslation(translations)

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

  return { navigate, translatedObject }
}
