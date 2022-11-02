import { HorizontalStack, VerticalStack } from '@components'
import { useHomePage } from '@hooks/use-page'
import { Button, Center, Title } from '@mantine/core'

const PAGE_TITLE = 'Home'

export function Home() {
  const { navigate } = useHomePage()

  return (
    <Center
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <VerticalStack>
        <Title>{PAGE_TITLE}</Title>
        <HorizontalStack position={'center'}>
          <Button onClick={() => navigate('/login')}>Login</Button>
        </HorizontalStack>
      </VerticalStack>
    </Center>
  )
}
