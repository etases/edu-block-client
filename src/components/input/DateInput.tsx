import { DatePicker, DatePickerProps } from '@mantine/dates'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export function DateInput(props: DatePickerProps) {
  return (
    <DatePicker
      size={'md'}
      radius={'md'}
      {...props}
    />
  )
}
