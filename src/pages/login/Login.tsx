import {
  HorizontalStack,
  PasswordInput,
  TextInput,
  VerticalStack,
} from '@components'
import { useLoginPage } from '@hooks/use-page'
import { Button, Container, createStyles, Overlay, Title } from '@mantine/core'
const PAGE_TITLE = 'Login'

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
  wrapper: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[2],
    borderRadius: theme.radius.lg,
  },
}))

export function Login() {
  const {
    form: { submitForm, inputPropsOf },
    translatedObject,
  } = useLoginPage()
  const { classes } = useStyles()
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <VerticalStack
          className={classes.wrapper}
          sx={{
            height: 'auto',
            width: '80%',
          }}
          m="10%"
          p="30px"
        >
          <Title>{translatedObject?.['LOGIN.TITLE']}</Title>
          <form onSubmit={submitForm}>
            <VerticalStack>
              <TextInput
                label={translatedObject?.['LOGIN.FIELD.USERNAME']}
                description={
                  translatedObject?.['LOGIN.FIELD.USERNAME.DESCRIPTION']
                }
                required={true}
                {...inputPropsOf('accountId')}
              />
              <PasswordInput
                label={translatedObject?.['LOGIN.FIELD.PASSWORD']}
                description={
                  translatedObject?.['LOGIN.FIELD.PASSWORD.DESCRIPTION']
                }
                required={true}
                {...inputPropsOf('password')}
              />
              <HorizontalStack grow={true}>
                <Button
                  variant="gradient"
                  size="md"
                  radius="md"
                  type={'submit'}
                >
                  {translatedObject?.['LOGIN.BUTTON']}
                </Button>
              </HorizontalStack>
            </VerticalStack>
          </form>
        </VerticalStack>
      </Container>
    </div>
  )
}
