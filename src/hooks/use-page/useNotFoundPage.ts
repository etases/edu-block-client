import { useTitleStore } from '@hooks/use-store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PAGE_TITLE = 'Not Found'

export function useNotFoundPage() {
  const { setTitle } = useTitleStore()

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

  const navigate = useNavigate()

  return { navigate }
}
