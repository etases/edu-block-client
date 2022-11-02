import { SpotlightAction } from '@mantine/spotlight'
import { atom, useAtom } from 'jotai'

const spotlightActionsAtom = atom([] as SpotlightAction[])

export function useSpotlightActionsStore() {
  const [spotlightActions, setSpotlightActions] = useAtom(spotlightActionsAtom)

  return { spotlightActions, setSpotlightActions }
}
