import { Avatar, Button, HorizontalStack, VerticalStack } from '@components'
import { useAccountStore } from '@hooks/use-store'
import { useTranslation } from '@hooks/use-translation'
import { Divider, Navbar as MNavbar, NavLink, Text } from '@mantine/core'
import {
  IconClock,
  IconDashboard,
  IconKey,
  IconSection,
  IconUsers,
} from '@tabler/icons'
import { result } from 'lodash'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const { Section } = MNavbar

const translate = {
  "NAVBAR.DASHBOARD": null,
  "NAVBAR.ACCOUNT": null,
  "NAVBAR.CLASSROOM": null,
  "NAVBAR.PENDING": null,
  "NAVBAR.STAT": null,
  "NAVBAR.STUDENT_KEY": null
}


interface NavBarProps {
  logoutFn: () => void
  gray: Array<string>
}

const navItems = [
  {
    to: '/app/account-list',
    label: "NAVBAR.ACCOUNT",
    icon: <IconUsers />,
    role: ['ADMIN', 'STAFF'],
  },
  {
    to: '/app/classroom-list',
    label: "NAVBAR.CLASSROOM",
    icon: <IconSection />,
    role: ['STAFF', 'ADMIN'],
  },
  {
    to: '/app/record-list',
    label: "NAVBAR.PENDING",
    icon: <IconClock />,
    role: ['TEACHER'],
  },
  {
    to: '/app/verified-statistic-key-list',
    label: "NAVBAR.STAT",
    icon: <IconKey />,
    role: ['ADMIN', 'STAFF'],
  },
  {
    to: '/app/verified-key-list',
    label: "NAVBAR.STUDENT_KEY",
    icon: <IconKey />,
    role: ['STUDENT'],
  },
]

export function Navbar(props: NavBarProps) {
  const { logoutFn: logout, gray } = props
  const {translatedObject} = useTranslation(navItems.reduce((result, {label}) => ({
    ...result,
    [label]: null
  }), {} as any))
  const translateData = useTranslation(translate);
  const {
    account: { avatar, firstName, lastName, role: accountRole, email, id },
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
          <NavLink
            // styles={(theme) => ({
            //   root: {
            //     ':hover': {
            //       filter: 'brightness(0.95)',
            //     },
            //   },
            // })}
            component={Link}
            to={'/app/dashboard/' + accountRole?.toLowerCase()}
            label={translateData.translatedObject?.["NAVBAR.DASHBOARD"]}
            // sx={{
            //   cursor: 'pointer',
            // }}
            icon={<IconDashboard />}
            active={location.pathname.startsWith('/app/dashboard')}
          />
          {navItems
            .filter(
              ({ role = [] }) => role.includes(accountRole) || role.length === 0
            )
            .map(({ label, to, icon }, index) => (
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
                label={translatedObject?.[label]}
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
              accountRole?.toUpperCase() === 'STUDENT' ? '/record' : ''
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
