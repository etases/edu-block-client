import { sessionStorage } from '@storages/session'
import { useAtom } from 'jotai'

export function useSessionStorage(props: { key: keyof typeof sessionStorage }) {
  const { key } = props
  const [state, setState] = useAtom(sessionStorage[key])

  return { state, setState }
}
