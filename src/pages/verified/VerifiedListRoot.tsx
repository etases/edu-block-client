import { Button, Grid, GridCol, TextInput, VerticalStack } from '@components'
import { Divider } from '@mantine/core'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function VerifiedListRoot() {
  const navigate = useNavigate()
  const [key, setKey] = useState('')
  return (
    <VerticalStack p={'md'}>
      <Grid>
        <GridCol span={8}>
          <TextInput
            placeholder={'Verified key'}
            value={key}
            onChange={({ target: { value } }) => setKey(value)}
          />
        </GridCol>
        <GridCol span={2}>
          <Button variant="gradient" size="md" radius="md"
            fullWidth={true}
            onClick={() => navigate(key)}
          >
            Get Record list
          </Button>
        </GridCol>
      </Grid>
      <Divider />
      <Outlet />
    </VerticalStack>
  )
}
