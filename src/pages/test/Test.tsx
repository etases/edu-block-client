import { Grid, GridCol, TextInput, VerticalStack } from '@components'
import { useTranslation } from '@hooks/use-translation'
import { Center, Divider, Text, Title } from '@mantine/core'
import { Fragment } from 'react'

const translation = {
  hi: null,
  'hel.lo': { emoji: '🙂' },
}

export function Test() {
  const { translatedObject = {}, translate } = useTranslation(translation)
  return (
    <Center>
      <VerticalStack>
        <Title>CHECK SINGLE VALUE</Title>
        <Text>{translate("hel.lo")}</Text>
        <Divider />
        <Title>CHECK ALL VALUES</Title>
        <Grid>
          {Object.entries(translatedObject).map(
            ([translationKey, translatedValue]) => (
              <Fragment key={translationKey}>
                <GridCol span={5}>
                  <Text>{translationKey}</Text>
                </GridCol>
                <GridCol span={7}>
                  <TextInput
                    readOnly={true}
                    value={translatedValue || ''}
                    onChange={() => {}}
                  />
                </GridCol>
              </Fragment>
            )
          )}
        </Grid>
      </VerticalStack>
    </Center>
  )
}
