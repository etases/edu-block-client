import { useLoginForm } from '@hooks/use-form'
import {
  useAccessTokenStore,
  useAccountStore,
  useTitleStore,
} from '@hooks/use-store'
import { useTranslation } from '@hooks/use-translation'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PAGE_TITLE = 'Login'

const translations = {
  "LOGIN.TITLE": null,
  "LOGIN.FIELD.USERNAME": null,
  "LOGIN.FIELD.USERNAME.DESCRIPTION": null,
  "LOGIN.FIELD.PASSWORD": null,
  "LOGIN.FIELD.PASSWORD.DESCRIPTION": null, 
  "LOGIN.BUTTON": null
}

export function useLoginPage() {
  const navigate = useNavigate()
  const {translatedObject} = useTranslation(translations);
  const { accessToken } = useAccessTokenStore()
  const {
    account: { role: accountRole },
  } = useAccountStore()
  const { setTitle } = useTitleStore()

  if (accessToken.length !== 0) navigate(`/app`)

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

  const form = useLoginForm()

  return { form, translatedObject }
}
