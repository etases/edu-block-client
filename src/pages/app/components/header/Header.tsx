import { HorizontalStack } from '@components'
import { Header as HeaderContainer, Title } from '@mantine/core'

interface HeaderProps {
  gray: Array<string>
}

export function Header(props: HeaderProps) {
  const { gray } = props

  return (
    <HeaderContainer
      height={50}
      sx={{
        backgroundColor: gray[0],
      }}
    >
      <HorizontalStack
        sx={{
          height: '100%',
        }}
        px={'md'}
        position={'right'}
      >
        <Title
          order={2}
          variant={'gradient'}
          gradient={{ from: 'indigo', to: 'cyan' }}
        >
          EduBlock
        </Title>
      </HorizontalStack>
    </HeaderContainer>
  )
}
