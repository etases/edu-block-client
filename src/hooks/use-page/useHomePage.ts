import { useTitleStore } from '@hooks/use-store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PAGE_TITLE = 'Home'

export function useHomePage() {
  const navigate = useNavigate()

  const { setTitle } = useTitleStore()

  useEffect(() => {
    setTitle(PAGE_TITLE)
  }, [])

  return { navigate }
}
