import { format } from 'date-fns'
import moment from 'moment'

export function formatDate(date?: Date): string {
  if (!date) {
    return ''
  }

  return format(date, 'MMM d, y')
}

export const getDaysAgo = (date) => {
  const daysAgo = moment().diff(moment(date), 'days')
  const hoursAgo = moment().diff(moment(date), 'hours')
  const minutesAgo = moment().diff(moment(date), 'minutes')
  if (daysAgo > 0) {
    return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`
  } else if (hoursAgo > 0) {
    return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`
  } else {
    return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`
  }
}

export const getDaysAgoString = (date) => {
  const daysAgo = moment().diff(moment(date), 'days')
  if (daysAgo > 1) {
    return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`
  } else if (daysAgo === 1) {
    return 'Yesterday'
  } else if (daysAgo === 0) {
    return 'Today'
  }
}

export const groupByDate = (data) => {
  const list = {}

  if (data && data.length > 0) {
    data.forEach((item) => {
      const createdDate = moment(item.created_date.toDate()).format(
        'DD/MM/YYYY',
      )

      const key = `${createdDate}`
      if (!list[key]) {
        list[key] = []
      }

      list[key].push(item)
    })
  }

  const orderedDates = {}
  Object.keys(list)
    .sort((a, b) => {
      return moment(b, 'DD/MM/YYYY').toDate() - moment(a, 'DD/MM/YYYY').toDate()
    })
    .forEach((key) => {
      orderedDates[key] = list[key]
    })

  const currentList = Object.keys(orderedDates).map((item, key) => ({
    label: item,
    value: list[item],
  }))

  return currentList
}
