import { Button, VerticalStack } from '@components'
import { useNotFoundPage } from '@hooks/use-page'
import { Center, Title } from '@mantine/core'

const PAGE_TITLE = 'Not Found'

export function NotFound() {
  const { navigate } = useNotFoundPage()

  return (
    <Center
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <VerticalStack>
        <Title>{PAGE_TITLE}</Title>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </VerticalStack>
    </Center>
  )
}
