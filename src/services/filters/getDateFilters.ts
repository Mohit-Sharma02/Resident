import moment from 'moment'

export const sameDay = (d1, d2) => {
  if (!d1 || !d2) {
    return false
  }

  const moment1 = moment(d1, 'MM/D/YYYY')
  const moment2 = moment(d2)

  return moment1.isSame(moment2, 'date')
}

export const isBefore = (d1, d2) => {
  if (!d1 || !d2) {
    return false
  }

  const moment1 = moment(d1, 'MM/D/YYYY')
  const moment2 = moment(d2)

  return moment1.isBefore(moment2)
}

export const isAfter = (d1, d2) => {
  if (!d1 || !d2) {
    return false
  }

  const moment1 = moment(d1, 'MM/D/YYYY')
  const moment2 = moment(d2)

  return moment1.isAfter(moment2)
}

export const getAge = (currentDate) => {
  return moment().diff(currentDate, 'years')
}
