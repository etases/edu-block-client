import { useTitleStore } from '@hooks/use-store'
import { useTranslation } from '@hooks/use-translation'
import { useMantineTheme } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export function useRootPage() {
  const navigate = useNavigate()

  const { title } = useTitleStore()

  useDocumentTitle(title)

  const { spacing } = useMantineTheme()

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  const { i18n } = useTranslation()

  return { spacing, navigate, loading: isFetching || isMutating, i18n }
}
