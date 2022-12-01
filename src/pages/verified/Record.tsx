import { HorizontalStack, VerticalStack } from '@components'
import { Title } from '@mantine/core'

export function Record() {
  return (
    <VerticalStack>
      <HorizontalStack>
        <Title>Record</Title>
      </HorizontalStack>
      <VerticalStack></VerticalStack>
    </VerticalStack>
  )
}
