import { atom, useAtom } from 'jotai'

const titleAtom = atom('EduBlock')

export function useTitleStore() {
  const [title, setTitle] = useAtom(titleAtom)

  return { title, setTitle }
}
