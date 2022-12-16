import { Button, Grid, GridCol, TextInput, VerticalStack } from '@components'
import { useTranslation } from '@hooks/use-translation'
import { Divider } from '@mantine/core'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function VerifiedRoot() {
  const { translate } = useTranslation()
  const navigate = useNavigate()
  const [id, setId] = useState('')
  return (
    <VerticalStack p={'md'}>
      {/* <HorizontalStack>Verified</HorizontalStack> */}
      {/* <HorizontalStack position={'apart'}> */}
      <Grid>
        <GridCol span={8}>
          <TextInput
            placeholder={translate("VERIFIED.KEY.INPUT").toString()}
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
            {translate("VERIFIED.KEY.CHECK")}
          </Button>
        </GridCol>
      </Grid>
      <Divider />
      {/* </HorizontalStack> */}
      <Outlet />
    </VerticalStack>
  )
}
