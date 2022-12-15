// import { HorizontalStack, VerticalStack } from '@components'
// import { useHomePage } from '@hooks/use-page'
// import { Button, Center, Title } from '@mantine/core'
// import { createStyles, Container, Text } from '@mantine/core';

// const PAGE_TITLE = 'Home'

// export function Home() {
//   const { navigate } = useHomePage()

//   return (
//     <Center
//       sx={{
//         width: '100%',
//         height: '100%',
//       }}
//     >
//       <VerticalStack>
//         <Title>{PAGE_TITLE}</Title>
//         <HorizontalStack position={'center'}>
//           <Button onClick={() => navigate('/login')}>Login</Button>
//         </HorizontalStack>
//       </VerticalStack>
// //     </Center>
// const { navigate } = useHomePage()
// <Button onClick={() => navigate('/login')}>Login</Button>
//   )
// }
import { useHomePage } from '@hooks/use-page'
import {
  Button,
  Container,
  createStyles,
  Overlay,
  Text,
  Title,
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
  hero: {
    position: 'relative',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
  },

  container: {
    height: 700,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: theme.spacing.xl * 6,
    zIndex: 1,
    position: 'relative',

    [theme.fn.smallerThan('sm')]: {
      height: 500,
      paddingBottom: theme.spacing.xl * 3,
    },
  },
  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({
      variant: 'filled',
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },
  title: {
    color: theme.white,
    fontSize: 80,
    fontWeight: 900,
    lineHeight: 1.3,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 40,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: theme.spacing.xl * 1.5,
    marginRight: theme.spacing.xl,

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  btn: {
    margin: '4px 12px',
  },
}))

export function Home() {
  const { classes } = useStyles()
  const { navigate, translatedObject } = useHomePage()

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Title className={classes.title}>
          {translatedObject?.['HOME_PAGE.TITLE']} <br></br>
          {'  '}
          <span className={classes.highlight}>EDUBLOCK</span>
        </Title>
        <Text
          className={classes.description}
          size="xl"
          mt="xl"
        >
          {translatedObject?.['HOME_PAGE.SLOGAN']} <br />{' '}
          {translatedObject?.['HOME_PAGE.SLOGAN1']}
          {/* A Blockchain-Based System for Electronic Academic Records <br></br>
          Access and Permissions Management */}
        </Text>
        <div>
          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'teal' }}
            size="xl"
            radius="xl"
            className={classes.control}
            onClick={() => navigate('/login')}
          >
            {translatedObject?.['HOME_PAGE.BUTTON.GET_STARTED']}
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: 'cyan', to: 'lime' }}
            size="md"
            radius="xl"
            className={classes.control}
            onClick={() => {
              window.location.href = '/verified'
            }}
          >
            {translatedObject?.['HOME_PAGE.BUTTON.STUDENT']}
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: 'cyan', to: 'lime' }}
            size="md"
            radius="xl"
            className={classes.control}
            onClick={() => {
              window.location.href = '/verified-list'
            }}
          >
            {translatedObject?.['HOME_PAGE.BUTTON.GRADE']}
          </Button>
        </div>
      </Container>
    </div>
  )
}
