import { VerticalStack } from '@components'
import { Divider } from '@mantine/core'
import { History } from './History'
import { Profile } from './Profile'

export function VerifiedPage() {
  return (
    <VerticalStack>
      <Profile />
      <Divider />
      {/* <Record /> */}
      <History />
    </VerticalStack>
  )
}
