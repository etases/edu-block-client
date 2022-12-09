import { Button, Grid, GridCol, TextInput, VerticalStack } from '@components'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function VerifiedRoot() {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  return (
    <VerticalStack p={'md'}>
      {/* <HorizontalStack>Verified</HorizontalStack> */}
      {/* <HorizontalStack position={'apart'}> */}
      <Grid>
        <GridCol span={8}>
          <TextInput
            placeholder={'Account Id'}
            value={id}
            onChange={({ target: { value } }) => setId(value)}
          />
        </GridCol>
        <GridCol span={2}>
          <Button variant="gradient" size="md" radius="md"
            onClick={() =>
              navigate(id, {
                replace: false,
              })
            }
            fullWidth={true}
          >
            Check
          </Button>
        </GridCol>
      </Grid>
      {/* </HorizontalStack> */}
      <Outlet />
    </VerticalStack>
  )
}
