import { Avatar, Button, HorizontalStack, VerticalStack } from '@components'
import { useAccountStore } from '@hooks/use-store'
import { Divider, Navbar as MNavbar, NavLink, Text } from '@mantine/core'
import { IconClock, IconDashboard, IconSection, IconUsers } from '@tabler/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const { Section } = MNavbar

interface NavBarProps {
  logoutFn: () => void
  gray: Array<string>
}

const navItems = [
  {
    to: '/app/dashboard',
    label: 'Dashboard',
    icon: <IconDashboard />,
  },
  {
    to: '/app/account-list',
    label: 'Account',
    icon: <IconUsers />,
  },
  {
    to: '/app/classroom-list',
    label: 'Classroom',
    icon: <IconSection />,
  },
  {
    to: '/app/record-list',
    label: 'Pending verification',
    icon: <IconClock />,
  },
]

export function Navbar(props: NavBarProps) {
  const { logoutFn: logout, gray } = props

  const {
    account: { avatar, firstName, lastName, role, email, id },
  } = useAccountStore()

  const location = useLocation()

  const navigate = useNavigate()

  return (
    <MNavbar
      width={{ base: 200 }}
      sx={{
        backgroundColor: gray[0],
      }}
    >
      <Section grow={true}>
        <VerticalStack
          // py={'md'}
          spacing={0}
        >
          {navItems.map(({ label, to, icon }, index) => (
            <NavLink
              // styles={(theme) => ({
              //   root: {
              //     ':hover': {
              //       filter: 'brightness(0.95)',
              //     },
              //   },
              // })}
              key={`navItem__${index}`}
              component={Link}
              to={to}
              label={label}
              // sx={{
              //   cursor: 'pointer',
              // }}
              icon={icon}
              active={location.pathname.startsWith(to)}
            />
          ))}
        </VerticalStack>
      </Section>
      <Divider />
      {/* header */}
      <Section
        sx={{
          cursor: 'pointer',
        }}
        onClick={() =>
          navigate(
            `/app/account/${id}${
              role.toUpperCase() === 'STUDENT' ? '/record' : ''
            }`
          )
        }
      >
        <VerticalStack p={'md'}>
          <HorizontalStack>
            <VerticalStack>
              <Avatar src={avatar} />
            </VerticalStack>
            <VerticalStack spacing={0}>
              <Text weight={'bold'}>{`${firstName} ${lastName}`}</Text>
              <Text size={'sm'}>{email}</Text>
            </VerticalStack>
          </HorizontalStack>
        </VerticalStack>
      </Section>
      <Divider />
      <Section>
        <VerticalStack p={'md'}>
          <Button onClick={logout}>Logout</Button>
        </VerticalStack>
      </Section>
    </MNavbar>
  )
}
