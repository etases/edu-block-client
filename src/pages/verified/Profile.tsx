import { HorizontalStack, VerticalStack } from '@components'
import { Title } from '@mantine/core'

export function Profile() {
  return (
    <VerticalStack>
      <HorizontalStack>
        <Title>Profile</Title>
      </HorizontalStack>
      <VerticalStack></VerticalStack>
    </VerticalStack>
  )
}
