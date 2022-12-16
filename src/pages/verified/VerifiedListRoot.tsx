import { Button, Grid, GridCol, TextInput, VerticalStack } from '@components'
import { useTranslation } from '@hooks/use-translation'
import { Divider } from '@mantine/core'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function VerifiedListRoot() {
  const {translate} = useTranslation()
  const navigate = useNavigate()
  const [key, setKey] = useState('')
  return (
    <VerticalStack p={'md'}>
      <Grid>
        <GridCol span={8}>
          <TextInput
            placeholder={translate("RECORD.VERIFIED.KEY.PLACEHOLDER").toString()}
            value={key}
            onChange={({ target: { value } }) => setKey(value)}
          />
        </GridCol>
        <GridCol span={2}>
          <Button variant="gradient" size="md" radius="md"
            fullWidth={true}
            onClick={() => navigate(key)}
          >
            {translate("RECORD.VERIFIED.KEY.CHECK")}
          </Button>
        </GridCol>
      </Grid>
      <Divider />
      <Outlet />
    </VerticalStack>
  )
}
