import { useTitleStore } from '@hooks/use-store'
import { useMantineTheme } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import { useIsFetching } from '@tanstack/react-query'
import { redirect, useNavigate } from 'react-router-dom'

export function useRootPage() {
  const navigate = useNavigate()

  const { title } = useTitleStore()

  useDocumentTitle(title)

  const { spacing } = useMantineTheme()

  const isFetching = useIsFetching()

  return { spacing, navigate, isFetching }
}
