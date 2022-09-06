import { persistentStorage } from '@storages/persistent'
import { useAtom } from 'jotai'

export function usePersistentStorage(props: {
  key: keyof typeof persistentStorage
}) {
  const { key } = props
  const [state, setState] = useAtom(persistentStorage[key])

  return { state, setState }
}
