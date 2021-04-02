import { isAfter, isBefore, isSameDay, parse } from 'date-fns'

import { ResidentPostFilterDateCreated } from 'src/components/ResidentPosts/types'

export function matchDate(
  filter: ResidentPostFilterDateCreated,
  date: Date,
): boolean {
  const dateFormat = 'yyyy-MM-dd'

  if (filter.filterType === 'isEqualTo') {
    const filterDate = parse(filter.date, dateFormat, new Date())

    if (!isSameDay(date, filterDate)) {
      return false
    }
  } else if (filter.filterType === 'isAfter') {
    const filterDate = parse(filter.date, dateFormat, new Date())

    if (!isAfter(date, filterDate)) {
      return false
    }
  } else if (filter.filterType === 'isBefore') {
    const filterDate = parse(filter.date, dateFormat, new Date())

    if (!isBefore(date, filterDate)) {
      return false
    }
  } else if (filter.filterType === 'isBetween') {
    const filterStartDate = parse(filter.startDate, dateFormat, new Date())
    const filterEndDate = parse(filter.endDate, dateFormat, new Date())

    if (!(isAfter(date, filterStartDate) && isBefore(date, filterEndDate))) {
      return false
    }
  }

  return true
}

export function matchObject(
  obj: { [key: string]: unknown },
  value: string | number,
): boolean {
  return !!obj[value]
}
