import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import localizeFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(advancedFormat)
dayjs.extend(localizeFormat)

export { dayjs }
